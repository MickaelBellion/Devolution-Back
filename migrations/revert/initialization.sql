-- Revert nom:initialization from pg

BEGIN;
DROP TYPE status CASCADE; 
DROP TABLE "user" , "project" , "role" , "skill" ,"user_has_skills","user_participate_projects" CASCADE;

COMMIT;
