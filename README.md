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
| 🏛 Maison d'Étude skin | Editorial hôtelier look inspired by Nouvelle Parfumerie Gandour (DD.NYC): warm ivory `#faf3e8` canvas, espresso ink, champagne-gold accents, fine serif with italic flourishes, hairline gold page frame, film grain, amber-noir hero salon, couture pill buttons, bronze medallions · full dark 'amber noir' theme |
| 📊 Progress HQ | A full analytics suite: 16-week study heatmap, 13-subject mastery radar, score trend chart, weakest-topics ranking (tap through to drill), monthly calendar of papers and a readiness verdict. 10th lab tile |
| ⏳ Exam countdown | Set any exam date (name + date) — a gold banner on the home screen counts the days down, editable/clearable, persisted per device |
| 🎁 Score card | One tap on results downloads a gilded 900×630 score card image (grade, score, class, subject, © merebari web) for WhatsApp/parents |
| ✨ Atelier II graphics | Living champagne aurora behind the ivory canvas; golden boot curtain that lifts like a salon veil (draw-on crest + travelling spark); hero statistics count up from zero; gilded rule with a travelling sparkle under the hero; logo hover tilt; gold corner ticks on stat tiles |
| 📣 Reach & Polish | Social/SEO: Open Graph + Twitter cards + canonical + `social-preview.png` (champagne crest card) so shared links look premium; PWA manifest (data-URI, installable, espresso/ivory theme); theme-color now matches the maison palette; `robots.txt` + `sitemap.xml` for Search Console; accessibility: skip link, main landmark, aria-live on toast/explanations/mascot; new **← Prev** button + ArrowLeft keyboard navigation (keys hint updated) |
| 🛡 Content protection | Public cannot edit the app's contents: SHA-256 fingerprint of the question bank verified at boot, before every quiz and on a 2-minute watchdog (any drift bricks the app with a fatal "integrity check failed" screen); bank object frozen; right-click, view-source/save/devtools shortcuts (F12, Ctrl+U, Ctrl+S, Ctrl+Shift+I/J/C), copy and image-drag disabled (typing fields stay usable); `noarchive` meta so search engines don't cache a copy; `main` branch protected on GitHub (force-push/deletion blocked, only the owner can push) |
| ✨ Atelier FX wave | Exceptional motion layer: rotating golden salon sunburst, calligraphic gold flourish that draws itself under the headline, shimmering champagne headline text, staggered hero entrance choreography, a **living owl** (blinks · bobs · halo pulse · tilts on hover), gold spark bursts on correct answers and level-ups, gold reading-progress hairline, gilded card stationery (top hairline + corner signature), gold fleuron section labels, button sheen sweep, scroll-reveal cards |
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

## Content protection

The question bank and all app content carry `© merebari web`. Three layers keep the public from editing it:

1. **In-app integrity guard** — the bank is fingerprinted with SHA-256 at boot and re-verified before every quiz and on a 2-minute watchdog; if anyone edits a question in a downloaded copy, the app bricks itself with a *content integrity check failed* screen.
2. **Interaction locks** — right-click, view-source/save/devtools shortcuts, copying and image dragging are disabled (input fields stay usable for sign-in).
3. **Repository protection** — `main` is branch-protected on GitHub: force-pushes and deletions are blocked, and only the owner (repository admins) can push.

**Honest limits:** this is a client-side deterrent. The HTML file is served to every visitor's browser, so a determined person can always save and edit their own copy — no static file can prevent that. Real enforcement (e.g., paid/watermarked delivery or server-side checks) requires a backend. The GitHub repo must stay **public** for free GitHub Pages hosting; the write lock above is what stops anyone else from publishing changes.

**Updating the live site:** edit `index.html` locally, then `git add index.html && git commit -m "update" && git push` — GitHub Pages re-deploys automatically within a minute.

**Search & sharing:** `sitemap.xml` + `robots.txt` are committed at the repo root and served by Pages (submit `https://merebari7-web.github.io/my-personal-study-app/sitemap.xml` in Search Console); `social-preview.png` (1200×630) is the Open Graph/Twitter card, referenced from the page head.

**Google Search Console:** the `google-site-verification` meta tag is embedded in the page head, so the site can be verified with the Google Search Console html-tag method.

---

## Desktop app

The same build is packaged as a Windows desktop app (`MyPersonalStudyApp.exe` via Neutralino) — see the release area of this repo once you add it, or ask the maintainer.

---

**© merebari web** · Made for learners of the Senior Secondary Curriculum.
