-- Revert nom:jwt_token from pg

BEGIN;

DROP TABLE "jwt_refresh_token" CASCADE;

COMMIT;
