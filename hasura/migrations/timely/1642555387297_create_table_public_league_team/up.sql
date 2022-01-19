CREATE TABLE "public"."league_team" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "league_id" uuid NOT NULL, "team_id" uuid NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
