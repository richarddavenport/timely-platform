alter table "public"."event"
  add constraint "event_meet_id_fkey"
  foreign key ("meet_id")
  references "public"."meet"
  ("id") on update restrict on delete restrict;
