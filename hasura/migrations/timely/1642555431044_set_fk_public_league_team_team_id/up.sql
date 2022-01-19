alter table "public"."league_team"
  add constraint "league_team_team_id_fkey"
  foreign key ("team_id")
  references "public"."team"
  ("id") on update restrict on delete restrict;
