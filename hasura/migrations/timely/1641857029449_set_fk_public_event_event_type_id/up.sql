alter table "public"."event"
  add constraint "event_event_type_id_fkey"
  foreign key ("event_type_id")
  references "public"."event_type"
  ("id") on update restrict on delete no action;
