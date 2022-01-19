alter table "public"."league_team"
  add constraint "league_team_league_id_fkey"
  foreign key ("league_id")
  references "public"."league"
  ("id") on update restrict on delete restrict;
