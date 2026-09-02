import { supabase } from "../../utils/supabase.js";

export async function getAllEthicalUsers() {
  const { data, error } = await supabase.from("Ethical_user").select("*");

  if (error) {
    console.error("Error fetching Ethical_user rows:", error);
    throw error;
  }

  return data;
}
