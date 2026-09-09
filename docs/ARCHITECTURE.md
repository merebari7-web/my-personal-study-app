# Site Architecture — My Personal Study App (NERDC curriculum platform)

## 1. The deployment model (chosen deliberately)

The site runs as a **zero-server static PWA on GitHub Pages** — this is the
**recommended production architecture for the Nigerian audience**:

- **Low bandwidth / low-end phones:** every shipped byte is counted; the whole
  interactive app boots from two gzipped files (`index.html` + `bank.js`;
  ~264 KiB total, gated at 266,240 B). Everything else is lazy.
- **Offline / low-data mode:** a service worker (see `sw.js`) caches the app
  shell and every module on first use, so repeat visits and offline use are
  free of data cost — a genuine "Naira-friendly" mode.
- **No server bills, no sign-up friction:** accounts are local-first and
  privacy-friendly; nothing leaves the device unless the user exports it.
- **Choice of framework (the spec asks for a preference):** **vanilla
  JavaScript + zero build chain** is preferred on this deployment because a
  React/Next.js bundle would triple the payload for the same UI. A **Next.js
  upgrade path** is documented in §5 and the data layer is already
  serializable, so a move stays cheap.

## 2. Module map (what ships where)

```
index.html       app shell + boot CSS/JS (minified; ~436 KiB raw, 128.6 KiB gzipped)
bank.js          question bank — 3,900 items (SS1–SS3, 13 subjects; NEVER edited in app)
edu.js           module loader + libraries
arcade.js        study arcade (games, videos)
quiz/syllabus_data.js   lazy — Secondary syllabus map (19 subjects, term-by-term)
quiz/curr_data.js       lazy — curriculum library + keyword notes (SS1–SS3)
quiz/polish.js          lazy — aurum graphics/UI polish layer (v24)
quiz/notes_data.js      lazy — NERDC data: PRIM (primary curriculum map,
                        Basic 1–6 × 13 subjects × 3 terms × 10 weeks) + NOTES
                        (full 8-part lesson notes; seeded: Basic 1 Mathematics
                        × 3 terms = 30 notes)              ← NEW (v25)
quiz/notes_app.js       lazy — NERDC UI: Notes browser, Scheme-of-Work
                        generator, My Space (roles, bookmarks, progress,
                        Author mode, print/PDF export)      ← NEW (v25)
sw.js            service worker (cache key per release, e.g. -v25)
mater-notes/ …   (removed v23; do not reintroduce)
```

Every `quiz/*.js` module except the boot chain is a **lazy sibling**: the SW
caches it the first time it is requested, and the app works without it.

## 3. Content model — structured, reusable (not flat pages)

The lesson note is the unit of content, and it is **structured data**, not HTML:

```jsonc
{
  "lvl": "P",            // level: P = Primary, S = Secondary
  "cls": "B1",           // class: B1..B6, J1..J3, S1..S3
  "subj": "Mathematics", // subject key
  "term": 1,             // 1 | 2 | 3
  "week": 1,             // 1..10 (10 = revision/term test)
  "topic": "Whole Numbers 1-5 (Counting, Reading and Writing)",
  "obj":   ["…"],        // Learning objectives (array of bullets)
  "prev":  "…",          // Previous knowledge / entry behaviour
  "mat":   "…",          // Instructional materials
  "content": ["…"],      // Lesson content (paragraphs)
  "ex":    ["…"],        // Worked examples
  "act":   ["…"],        // Class activities
  "eval":  ["…"],        // Evaluation questions
  "assign": "…"          // Assignment / homework
}
```

`PRIM` carries the **curriculum map**: `subjects → class → 3 terms → 10 week
topics`. Notes and schemes are generated from the same source
(`quiz/n_*.py` → `_notes_build.py` → `quiz/notes_data.js`), so a scheme row and
its note can never drift apart.

### Content pipeline (authoring without touching the deployed app)

```
quiz/n_pri.py, n_b1m_t1..t3.py  (Python content modules, validated)
        │  python3 quiz/_notes_build.py   (validates + bundles)
        ▼
quiz/notes_data.js  →  pushed to main  →  served + SW-cached
```

**In-app Author mode (teachers):** My Space → Author mode (PIN, default
`NERDC2026`, changeable only in the build) adds/edits notes on-device with an
8-field form; notes are stored in `localStorage` (`nssc_note_custom`) and can
be exported as JSON for review/merge into `quiz/n_*.py`. This satisfies
"added/edited without touching code" for a single-device workstation while the
repository build remains the reviewable source of truth.

## 4. Accounts, roles and dashboards (local-first)

Gate sign-up stores a profile (`nssc_profiles` / `nssc_acc`); on-device data
(the only personal data the platform holds) is names, results, streaks,
mistakes, bookmarks, note progress and role (`nssc_role`):

| Role | Dashboard (My Space + existing surfaces) |
|---|---|
| 👨‍🎓 Student | lesson-note progress bar, bookmarks, daily goals, results HQ, arcade |
| 👩‍🏫 Teacher | Scheme-of-Work generator (printable PDF), Author mode, topic worksheets |
| 👨‍👩‍👧 Parent | progress overview + weekly report (sharable image/print) |

## 5. The hosted upgrade path (Supabase/Postgres) — ready, not deployed

The repository ships `docs/schema.sql` — the production schema for
**PostgreSQL (Supabase-ready)**: `levels, classes, subjects, subject_class_terms,
weeks, topics, lesson_notes (8 structured columns + JSONB), note_versions,
users (role: student|teacher|parent|admin), profiles, bookmarks, note_progress,
attempts, approval workflow` plus Row-Level-Security policy sketches.

Migration steps (documented): 1) create the Supabase project and run
`schema.sql`; 2) swap `quiz/notes_data.js` for a thin client that fetches
`/rest/v1/lesson_notes` (the UI module already consumes the identical
JSON shape); 3) move Author mode to the admin table with the `approved` flag
and an approval queue in the UI; 4) keep the SW cache as an offline fallback.

## 6. Non-functional guarantees (regression-gated)

- Boot wire `index.html` + `bank.js` gzip **≤ 266,240 B** (checked in every suite).
- `bank.js` is immutable (sha tracked); content pipelines never touch it.
- Every UI change is verified with real Chrome (375 / 1280 / 1920) plus a
  12-viewport responsive audit (`quiz/_audit_rwd.js`).
- Every release: suites → push → 45 s → live SHA-256 byte check →
  `node quiz/_live_sw.js`.

- `quiz/boost.js` (v28) — Pro Boost: Math Sprint arcade, WebAudio Soundscapes, 3D tile tilt + glare, gold aura rings; idle-loaded from `polish.js`.
