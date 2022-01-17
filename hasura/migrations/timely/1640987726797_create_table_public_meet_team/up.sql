CREATE TABLE "public"."meet_team" ("created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "meet_id" uuid NOT NULL, "team_id" uuid NOT NULL, PRIMARY KEY ("meet_id","team_id") , FOREIGN KEY ("meet_id") REFERENCES "public"."meet"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_public_meet_team_updated_at"
BEFORE UPDATE ON "public"."meet_team"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_meet_team_updated_at" ON "public"."meet_team" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
