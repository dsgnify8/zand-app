-- Instagram videos on Hand in Hand profiles.
--
-- Each one is a link and a cover image, nothing more. The video itself
-- stays on Instagram: a play inside ZAND counts for nothing on their
-- account, while a tap that opens the reel lands a reader where they can
-- follow, comment and pass it on, which is the help this section exists
-- to give. It also keeps their footage in their hands and off our
-- bandwidth bill.
--
-- Shape: [{ "url": "https://www.instagram.com/reel/…/", "cover": "slug/123.jpg" }]
-- Covers live in the same hamdeli bucket as profile photos.

alter table public.hamdeli
  add column if not exists reels jsonb not null default '[]'::jsonb;

select column_name, data_type, column_default
  from information_schema.columns
 where table_schema = 'public' and table_name = 'hamdeli' and column_name = 'reels';
