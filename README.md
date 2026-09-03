# 🎓 MY PERSONAL STUDY APP

**A complete offline study app for the Nigerian Senior Secondary Certificate (SS1–SS3).**
13 subjects · 3,900 questions with full explanations · one single HTML file — no install, no internet, no dependencies.

Copyright © merebari web · All rights reserved.

---

## What's inside

| Feature | Details |
|---|---|
| 📚 Question bank | 3,900 verified questions — 13 subjects × 100 questions × SS1/SS2/SS3, progressive difficulty |
| 🧾 Exam interface | Timed examination mode + study mode with instant marking and explanations |
| 🔍 Question library | Search all 3,900 questions by keyword / subject / topic, reveal answers, star bookmarks, practise your results |
| 🧠 Spaced revision | Mistakes return after 1 → 3 → 7 → 14 days; 4 correct reviews = mastered |
| ⚡ Daily challenge | A deterministic 10-question mixed paper, new every day |
| 🎯 Study goals | Questions-per-day target, 7-day calendar, streaks |
| 🏆 Progression | Study points, scholar levels, 🎖 merits, badges, mastery rings per subject |
| 📜 Revision wheel | A prize wheel on every paper result (merits & study points) |
| 🖼 Certificate | Gilded certificate PNG export with serial number & signature |
| 🔒 Integrity | SHA-256 hash check of the question bank at load time |
| ♿ Accessibility | Text-size control, reduced motion, read-aloud (browser speech), keyboard shortcuts (`?` for help) |

Everything runs in one file — perfect for school computers, tablets and phones with no internet.

---

## Run it locally

Just open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). That's it.

---

## Host it on GitHub Pages

This repo is ready for GitHub Pages. Either way works:

**Option A — GitHub Actions (recommended)**
1. Push this repository to GitHub (any repo name, e.g. `my-personal-study-app`).
2. Go to **Settings → Pages → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes the site automatically. Done.

**Option B — Deploy from branch**
1. Push to GitHub.
2. Go to **Settings → Pages → Source: Deploy from a branch** → `main` / `/ (root)`.
3. Save. Your site appears at `https://<username>.github.io/<repo>/` within a minute or two.

**Very quick manual path:** create a repo, click *Add file → Upload files*, drop `index.html` in, commit — then follow Option B.

> **Note on sign-in:** the app works fully as a guest. If you want Google sign-in to work on the Pages origin, add `https://<username>.github.io` to your Google OAuth client's authorised JavaScript origins. Guests work out of the box.

---

## Desktop app

The same build is packaged as a Windows desktop app (`MyPersonalStudyApp.exe` via Neutralino) — see the release area of this repo once you add it, or ask the maintainer.

---

**© merebari web** · Made for learners of the Senior Secondary Curriculum.
