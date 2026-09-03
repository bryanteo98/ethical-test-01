import { supabase } from "../../utils/supabase.js";

const HASH_ITERATIONS = 310000;

function toBase64(bytes) {
	return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

function fromBase64(value) {
	return Uint8Array.from(atob(value), character => character.charCodeAt(0));
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
	const [, algorithm, iterations, encodedSalt, encodedKey] = storedHash.split("$");
	if (algorithm !== "pbkdf2-sha256" || !iterations || !encodedSalt || !encodedKey) {
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
	const derivedKey = new Uint8Array(await crypto.subtle.deriveBits(
		{
			name: "PBKDF2",
			salt: fromBase64(encodedSalt),
			iterations: Number(iterations),
			hash: "SHA-256",
		},
		keyMaterial,
		256,
	));
	const expectedKey = fromBase64(encodedKey);
	if (derivedKey.length !== expectedKey.length) return false;

	return derivedKey.every((byte, index) => byte === expectedKey[index]);
}

export async function signInUser({ email, password }) {
	if (!email?.trim() || !password) {
		throw new Error("Email and password are required");
	}

	const { data: user, error } = await supabase
		.from("Ethical_user")
		.select("*")
		.eq("email", email.trim().toLowerCase())
		.maybeSingle();

	if (error) {
		console.error("Error looking up Ethical_user:", error);
		throw error;
	}

	if (!user || !user.password_hash || !(await verifyPassword(password, user.password_hash))) {
		const authenticationError = new Error("Invalid email or password");
		authenticationError.code = "INVALID_CREDENTIALS";
		throw authenticationError;
	}

	const { password_hash: _passwordHash, ...safeUser } = user;
	return safeUser;
}

export async function registerUser({ fullName, email, phoneNo, password, type }) {
	if (!fullName?.trim() || !email?.trim() || !phoneNo?.trim() || !password) {
		throw new Error("Full name, email, phone number, and password are required");
	}

	const normalizedEmail = email.trim().toLowerCase();
	const { data: existingUser, error: lookupError } = await supabase
		.from("Ethical_user")
		.select("email")
		.eq("email", normalizedEmail)
		.maybeSingle();

	if (lookupError) {
		console.error("Error checking Ethical_user email:", lookupError);
		throw lookupError;
	}

	if (existingUser) {
		const error = new Error("Email already registered");
		error.code = "EMAIL_EXISTS";
		throw error;
	}

	const passwordHash = await hashPassword(password);
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

	return data;
}
