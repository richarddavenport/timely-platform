CREATE TABLE "public"."lane" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "number" numeric NOT NULL, "heat_id" uuid NOT NULL, "athlete_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("athlete_id") REFERENCES "public"."athlete"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("heat_id") REFERENCES "public"."heat"("id") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_public_lane_updated_at"
BEFORE UPDATE ON "public"."lane"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_lane_updated_at" ON "public"."lane" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
