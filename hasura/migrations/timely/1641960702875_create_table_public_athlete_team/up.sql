CREATE TABLE "public"."athlete_team" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamp NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "athlete_id" uuid NOT NULL, "team_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("athlete_id") REFERENCES "public"."athlete"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON UPDATE restrict ON DELETE restrict);COMMENT ON TABLE "public"."athlete_team" IS E'What teams athletes belong to';
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_athlete_team_updated_at"
BEFORE UPDATE ON "public"."athlete_team"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_athlete_team_updated_at" ON "public"."athlete_team" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
