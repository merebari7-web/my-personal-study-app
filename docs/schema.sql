-- ============================================================================
-- NERDC curriculum platform — PostgreSQL schema (Supabase-ready)
-- Mirrors quiz/notes_data.js (PRIM + NOTES) one-to-one so the static app's
-- data layer can be swapped for this database without UI changes.
-- Run: psql "$DATABASE_URL" -f docs/schema.sql
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Reference data
-- ---------------------------------------------------------------------------

create table levels (
  id          smallint primary key,          -- 1 = Primary, 2 = Secondary
  code        text unique not null,          -- 'P', 'S'
  name        text not null,                 -- 'Primary', 'Secondary'
  description text
);

create table classes (
  id         text primary key,               -- 'B1'..'B6','J1'..'J3','S1'..'S3'
  level_id   smallint not null references levels(id),
  name       text not null,                  -- 'Basic 1', 'JSS 1', 'SSS 1'
  sort_order smallint not null default 0
);

create table subjects (
  id         text primary key,               -- 'Mathematics', 'English Studies'…
  level_id   smallint not null references levels(id),
  name       text not null,
  icon       text,                           -- emoji
  sort_order smallint not null default 0,
  unique (level_id, name)
);

create table terms (
  id    smallint primary key,                -- 1,2,3
  name  text not null,                       -- 'First Term'…
  label text not null
);

create table weeks (
  id     smallint primary key,               -- 1..10 (10 = revision/term test)
  name   text not null,
  is_revision boolean not null default false
);

-- ---------------------------------------------------------------------------
-- The curriculum map: one row per (class, subject, term) with the ordered
-- weekly topic list. Order is preserved positionally (week_topic index 1..10).
-- ---------------------------------------------------------------------------

create table curriculum_schemes (
  id         bigint generated always as identity primary key,
  class_id   text not null references classes(id),
  subject_id text not null references subjects(id),
  term_id    smallint not null references terms(id),
  week_topics jsonb not null,                -- ["Whole numbers 1-5", …]  (10 items)
  source     text not null default 'nerdc',
  updated_at timestamptz not null default now(),
  unique (class_id, subject_id, term_id),
  constraint week_topics_len check (jsonb_array_length(week_topics) between 1 and 12)
);

create index on curriculum_schemes (class_id, subject_id);

-- ---------------------------------------------------------------------------
-- Lesson notes — the reusable content unit (8 structured parts).
-- ---------------------------------------------------------------------------

create table lesson_notes (
  id             uuid primary key default gen_random_uuid(),
  class_id       text not null references classes(id),
  subject_id     text not null references subjects(id),
  term_id        smallint not null references terms(id),
  week_id        smallint not null references weeks(id),
  topic          text not null,
  objectives     jsonb not null,             -- ["Learning objectives" as bullets]
  previous_knowledge text not null default '',
  materials      text not null default '',
  content        jsonb not null,             -- ["paragraph 1", "paragraph 2", …]
  examples       jsonb not null default '[]',-- ["worked examples"]
  activities     jsonb not null default '[]',
  evaluation     jsonb not null default '[]',
  assignment     text not null default '',
  status         text not null default 'draft'
                 check (status in ('draft','pending','approved','archived')),
  author_id      uuid,                       -- see users
  approved_by    uuid,
  approved_at    timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- the stable device-independent key used by the app: B1|Mathematics|1|3
create unique index lesson_notes_key on lesson_notes
  (class_id, subject_id, term_id, week_id);

create index on lesson_notes (class_id, subject_id, term_id, status);

-- audit trail for the CMS (add/edit/approve without touching code)
create table note_versions (
  id         bigint generated always as identity primary key,
  note_id    uuid not null references lesson_notes(id) on delete cascade,
  snapshot   jsonb not null,                 -- full note as edited
  editor_id  uuid,
  action     text not null check (action in ('create','update','approve','reject')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Users & roles (student / teacher / parent / admin)
-- ---------------------------------------------------------------------------

create type user_role as enum ('student','teacher','parent','admin');

create table users (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  name       text not null,
  role       user_role not null default 'student',
  -- Replaces the on-device profile; kept nullable while local-first accounts
  -- are the default deployment.
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Learner state
-- ---------------------------------------------------------------------------

create table bookmarks (
  user_id    uuid not null references users(id) on delete cascade,
  note_id    uuid not null references lesson_notes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, note_id)
);

create table note_progress (
  user_id    uuid not null references users(id) on delete cascade,
  note_id    uuid not null references lesson_notes(id) on delete cascade,
  done_at    timestamptz not null default now(),
  primary key (user_id, note_id)
);

-- CBT attempts per topic (optional quizzes; 3,900-question bank already exists)
create table attempts (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references users(id) on delete cascade,
  subject_id text,
  topic      text,
  score      smallint not null check (score between 0 and 100),
  total      smallint not null,
  detail     jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row-Level-Security (apply per deployment; Supabase note below)
-- ---------------------------------------------------------------------------

alter table lesson_notes enable row level security;
alter table note_versions enable row level security;
alter table bookmarks enable row level security;
alter table note_progress enable row level security;
alter table attempts enable row level security;

-- Approved notes are public to every signed-in class of user.
create policy notes_public_read on lesson_notes for select
  using (status = 'approved');
-- Teachers and admins may create drafts; admins approve.
create policy notes_teacher_insert on lesson_notes for insert
  with check (auth.role() = 'authenticated' and (
    exists (select 1 from users u where u.id = auth.uid() and u.role in ('teacher','admin'))
    and status = 'draft'));
create policy notes_admin_update on lesson_notes for update
  using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));
create policy bookmarks_own on bookmarks for all
  using (user_id = auth.uid());
create policy progress_own on note_progress for all
  using (user_id = auth.uid());
create policy attempts_own on attempts for all
  using (user_id = auth.uid());
