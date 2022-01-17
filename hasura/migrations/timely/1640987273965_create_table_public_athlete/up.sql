CREATE TABLE "public"."athlete" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamp NOT NULL DEFAULT now(), "updated_at" timestamp NOT NULL DEFAULT now(), "name" text NOT NULL, "birthday" timestamp NOT NULL, PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_public_athlete_updated_at"
BEFORE UPDATE ON "public"."athlete"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_athlete_updated_at" ON "public"."athlete" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
