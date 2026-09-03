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
| 📖 Study Hall | **Flashcard decks** (whole bank or your mistakes) with flip-recall · **Rapid Fire** sprints (30–90 s) with streaks · **Spelling Lab** (type the answer, typo-tolerant) · **Progress Report Card** — printable PDF/print for parents & teachers |
| 🧠 Adaptive engine | Per-topic performance tracking · **Mastery Map** (every subject × topic heat-map, tap to drill) · **Exam-readiness score** (topics + mastery + consistency) · **Today's plan** with tailored actions · **Smart paper mode** that prioritises your weakest subjects |
| 🧮 3D Shape Lab | Dependency-free interactive **3D solids** (cube, cuboid, sphere, cylinder, cone, pyramid, prism) — drag to rotate, live dimension sliders, real-time volume & surface area with formulas, links straight into the Mensuration paper · 3D-tilt cards on the home screen |
| 🌌 3D scene depth | **Parallax hero** — floating scholar orbs, orbit rings and layered copy respond to the pointer · **3D certificate** — the PNG gains an embossed bevel frame, folded ribbon, gradient crest and engraved title, and tilts in perspective in the lightbox |
| 🎓 Mock Hall | Full timed **mock examinations** — 25/50/100 questions, exam pace or 30/60/90 min, auto-submit at zero, **integrity monitoring** (tab-switches recorded on the report), review screen with jump-to-any-question grid before submitting |
| 💾 Backup & Restore | One-tap **JSON export** of every paper, mistake, topic stat, badge, point and lab result — merge or replace when restoring on any device |
| 🏆 Scholar League | Local **leaderboard** of every study account on the device, ranked by study points with medals, papers, best % and YOU marker |
| 🏛 Maison d'Étude skin | Editorial hotélie look inspired by Nouvelle Parfumerie Gandour (DD.NYC): warm ivory `#faf3e8` canvas, espresso ink, champagne-gold accents, fine serif with italic flourishes, hairline gold page frame, film grain, amber-noir hero salon, couture pill buttons, bronze medallions · full dark 'amber noir' theme |
| ✨ Graphics pass | **Scholarly owl mascot** (SVG avatar + reaction badge) · **knowledge-constellation hero** with twinkling nodes and a gold light sweep · gilded medallions on class & study tiles · spinning honour rays on level-up · sheened grade seal · shimmering step-bar & progress glow |
| 📜 Revision wheel | A prize wheel on every paper result (merits & study points) |
| 🔒 Access gate | Everything is locked behind a study account — **no anonymous access**. Sign in with Google (hosted version) or create a free study account (name + optional email; works fully offline). Profiles & scores stay on the device |
| 🖼 Certificate | Gilded certificate PNG export with serial number & signature |
| 🔒 Integrity | SHA-256 hash check of the question bank at load time |
| ♿ Accessibility | Text-size control, reduced motion, read-aloud (browser speech), keyboard shortcuts (`?` for help) |

Everything runs in one file — perfect for school computers, tablets and phones with no internet.

---

## Run it locally

Just open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). That's it.

---

## Host it on GitHub Pages

This repo deploys to GitHub Pages straight from its `main` branch — the site is a single self-contained file, so no build step is needed.

1. Push this repository to GitHub.
2. Go to **Settings → Pages → Source: Deploy from a branch** → `main` / `/ (root)`.
3. Save. Your site appears at `https://<username>.github.io/<repo>/` within a minute or two.

> **Access policy:** the app is gated — you must sign in (Google, on the hosted version) or create a free study account (name + optional email; fully offline) before anything is reachable. Google OAuth is configured for the `https://<username>.github.io` origin; if you move the site to another domain, add that origin to the OAuth client's *Authorised JavaScript origins* in Google Cloud Console.

**Updating the live site:** edit `index.html` locally, then `git add index.html && git commit -m "update" && git push` — GitHub Pages re-deploys automatically within a minute.

---

## Desktop app

The same build is packaged as a Windows desktop app (`MyPersonalStudyApp.exe` via Neutralino) — see the release area of this repo once you add it, or ask the maintainer.

---

**© merebari web** · Made for learners of the Senior Secondary Curriculum.
