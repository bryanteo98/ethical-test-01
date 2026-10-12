import { supabase } from "../../utils/supabase.js";

const HASH_ITERATIONS = 310000;

function toBase64(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

function fromBase64(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: HASH_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  return `$pbkdf2-sha256$${HASH_ITERATIONS}$${toBase64(salt)}$${toBase64(derivedBits)}`;
}

async function verifyPassword(password, storedHash) {
  const [, algorithm, iterations, encodedSalt, encodedKey] =
    storedHash.split("$");
  if (
    algorithm !== "pbkdf2-sha256" ||
    !iterations ||
    !encodedSalt ||
    !encodedKey
  ) {
    return false;
  }

  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derivedKey = new Uint8Array(
    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: fromBase64(encodedSalt),
        iterations: Number(iterations),
        hash: "SHA-256",
      },
      keyMaterial,
      256,
    ),
  );
  const expectedKey = fromBase64(encodedKey);
  if (derivedKey.length !== expectedKey.length) return false;

  return derivedKey.every((byte, index) => byte === expectedKey[index]);
}

export async function signInUser({ email, password }) {
  if (!email?.trim() || !password) {
    throw new Error("Email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const [userLookup, partnerLookup] = await Promise.all([
    supabase
      .from("Ethical_user")
      .select("*")
      .eq("email", normalizedEmail)
      .limit(1)
      .maybeSingle(),
    supabase
      .from("Ethical_partner")
      .select("*")
      .eq("email", normalizedEmail)
      .limit(1)
      .maybeSingle(),
  ]);

  if (userLookup.error) {
    console.error("Error looking up Ethical_user:", userLookup.error);
    throw userLookup.error;
  }

  if (partnerLookup.error) {
    console.error("Error looking up Ethical_partner:", partnerLookup.error);
    throw partnerLookup.error;
  }

  const userAccount = userLookup.data;
  const partnerAccount = partnerLookup.data;
  const isPartner =
    Boolean(partnerAccount) ||
    userAccount?.role === "partner" ||
    userAccount?.type === "partner";
  const account = partnerAccount?.password_hash ? partnerAccount : userAccount;

  if (
    !account ||
    !account.password_hash ||
    !(await verifyPassword(password, account.password_hash))
  ) {
    const authenticationError = new Error("Invalid email or password");
    authenticationError.code = "INVALID_CREDENTIALS";
    throw authenticationError;
  }

  const safeUser = isPartner
    ? { ...userAccount, ...partnerAccount }
    : { ...userAccount };
  const onboardingRecord =
    partnerAccount && Object.hasOwn(partnerAccount, "first_login")
      ? ["Ethical_partner", partnerAccount]
      : userAccount && Object.hasOwn(userAccount, "first_login")
        ? ["Ethical_user", userAccount]
        : partnerAccount
          ? ["Ethical_partner", partnerAccount]
          : ["Ethical_user", userAccount];
  safeUser.profile_table = onboardingRecord[0];
  safeUser.profile_id = onboardingRecord[1]?.id ?? null;
  delete safeUser.password_hash;
  safeUser.role = isPartner
    ? "partner"
    : userAccount?.role || userAccount?.type || "referrer";
  return safeUser;
}

export async function registerUser({
  fullName,
  email,
  phoneNo,
  password,
  type,
  companyName,
}) {
  if (!fullName?.trim() || !email?.trim() || !phoneNo?.trim() || !password) {
    throw new Error(
      "Full name, email, phone number, and password are required",
    );
  }
  if (type === "partner" && !companyName?.trim()) {
    throw new Error("Company name is required for partner registration");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const [userLookup, partnerLookup] = await Promise.all([
    supabase
      .from("Ethical_user")
      .select("email")
      .eq("email", normalizedEmail)
      .limit(1)
      .maybeSingle(),
    supabase
      .from("Ethical_partner")
      .select("email")
      .eq("email", normalizedEmail)
      .limit(1)
      .maybeSingle(),
  ]);

  if (userLookup.error) {
    console.error("Error checking Ethical_user email:", userLookup.error);
    throw userLookup.error;
  }

  if (partnerLookup.error) {
    console.error("Error checking Ethical_partner email:", partnerLookup.error);
    throw partnerLookup.error;
  }

  if (userLookup.data || partnerLookup.data) {
    const error = new Error("Email already registered");
    error.code = "EMAIL_EXISTS";
    throw error;
  }

  const passwordHash = await hashPassword(password);
  if (type === "partner") {
    const { data, error } = await supabase
      .from("Ethical_partner")
      .insert({
        company_name: companyName.trim(),
        owner_name: fullName.trim(),
        email: normalizedEmail,
        password_hash: passwordHash,
        first_login: true,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error registering Ethical_partner:", error);
      throw error;
    }

    const safePartner = { ...data, role: "partner" };
    delete safePartner.password_hash;
    return safePartner;
  }

  const { data, error } = await supabase
    .from("Ethical_user")
    .insert({
      full_name: fullName.trim(),
      email: normalizedEmail,
      phone_no: phoneNo.trim(),
      password_hash: passwordHash,
      type,
    })
    .select()
    .single();

  if (error) {
    console.error("Error registering Ethical_user:", error);
    throw error;
  }

  const safeUser = { ...data };
  delete safeUser.password_hash;
  safeUser.role = safeUser.role || safeUser.type || "referrer";
  return safeUser;
}

export async function updateEthicalPartnerStatus(partner, status) {
  const [column, value] =
    partner?.id != null
      ? ["id", partner.id]
      : ["company_name", partner?.company_name];

  if (value == null || value === "") {
    throw new Error("Partner record is missing an identifier");
  }

  const { data, error } = await supabase
    .from("Ethical_partner")
    .update({ status })
    .eq(column, value)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating Ethical_partner status:", error);
    throw error;
  }
  if (!data) {
    throw new Error("Partner status was not updated");
  }

  return data;
}

export async function updatePartnerFirstLoginProfile(user, profile) {
  const table =
    user?.profile_table === "Ethical_user"
      ? "Ethical_user"
      : user?.profile_table === "Ethical_partner"
        ? "Ethical_partner"
        : null;

  if (!table || (!user?.profile_id && !user?.email)) {
    throw new Error("Partner profile is missing an identifier");
  }

  const { data, error } = await supabase
    .from(table)
    .update({
      ssm_no: profile.ssm_no.trim(),
      industry: profile.industry.trim(),
      website: profile.website.trim(),
      contact_no: profile.contact_no.trim(),
      first_login: false,
    })
    .eq(user.profile_id ? "id" : "email", user.profile_id || user.email)
    .select()
    .maybeSingle();

  if (error) {
    console.error(`Error updating ${table} first-login profile:`, error);
    throw error;
  }
  if (!data) {
    throw new Error("Partner profile was not updated");
  }

  return data;
}
