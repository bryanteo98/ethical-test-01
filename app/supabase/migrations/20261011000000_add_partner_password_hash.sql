-- Partner passwords use the same salted PBKDF2 hash format as referrer passwords.
-- Apply this migration to the Supabase database before partner registration.
ALTER TABLE public."Ethical_partner"
ADD COLUMN IF NOT EXISTS password_hash text;
