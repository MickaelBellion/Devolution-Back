BEGIN;


CREATE TYPE status as ENUM ('Disponible','Non disponible','Bientôt disponible');


-- //user_status doit etre un ENUM , 
--DROP TABLE IF EXISTS "role","user","project","skill","user_participate_projects","user_has_skills"; a verifier !


CREATE TABLE "role" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "user" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL UNIQUE,
    "image_url" TEXT,
    "description" TEXT,
    "user_status" status,
    "user_function" TEXT,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT,
    "linkedin" TEXT,
    "portfolio" TEXT,
    "twitter" TEXT,
    "github" TEXT,
    "facebook" TEXT,
    "experience" TEXT,
    "role_id" INTEGER NOT NULL REFERENCES "role"("id") DEFAULT 1,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "project" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "is_available" BOOLEAN NOT NULL,
    "description" TEXT,
    "need_of_the_project" TEXT,
    "beginning_date" DATE,
    "icon"TEXT,
    "owner_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "skill" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE "user_participate_projects"(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "project_id" INTEGER NOT NULL REFERENCES "project"("id")
);

CREATE TABLE "user_has_skills"(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id") ,
    "skill_id" INTEGER NOT NULL REFERENCES "skill"("id")
);



COMMIT ;
