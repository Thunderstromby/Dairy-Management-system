-- Reference-only deterministic seed. No customer/farm/user/test records.
-- Run after schema.sql using migration privileges.
BEGIN;
INSERT INTO roles (code,description) VALUES
 ('super_admin','Platform administration; no routine farm operational access'),
 ('farm_admin','Authorized management within assigned farm workspace'),
 ('farm_supervisor','Permitted daily operations within assigned farm workspace')
ON CONFLICT (code) DO UPDATE SET description=EXCLUDED.description;
-- No dummy customers, no credentials, no fabricated financial or animal records.
-- Initial Super Admin is provisioned separately by secure deployment procedure with Argon2id.
-- Farm-specific expense categories/settings and sample data are intentionally not seeded.
COMMIT;
