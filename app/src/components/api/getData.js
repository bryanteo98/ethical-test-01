import { supabase } from "../../utils/supabase.js";

export async function getAllEthicalUsers() {
  const { data, error } = await supabase.from("Ethical_user").select("*");

  if (error) {
    console.error("Error fetching Ethical_user rows:", error);
    throw error;
  }

  return data;
}

export async function getAllEthicalPartners() {
  const { data, error } = await supabase
    .from("Ethical_partner")
    .select("id, company_name, owner_name, email, industry, status, joined_at");

  if (error) {
    console.error("Error fetching Ethical_partner rows:", error);
    throw error;
  }

  return data;
}

export async function getEthicalLeadsByReferrer(referrerId) {
  if (referrerId == null || referrerId === "") {
    throw new Error("Referrer record is missing an identifier");
  }

  const { data, error } = await supabase
    .from("Ethical_lead")
    .select("*")
    .eq("referrer_id", referrerId);

  if (error) {
    console.error("Error fetching Ethical_lead rows:", error);
    throw error;
  }

  return data;
}
