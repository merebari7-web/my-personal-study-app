# 🎓 MY PERSONAL STUDY APP

**A complete offline study app for the Nigerian Senior Secondary Certificate (SS1–SS3).**
**19 subjects of SS1–SS3 lesson notes** · 3,900 verified questions with full explanations · JAMB/UTME simulation with on-screen calculator · essay/theory practice · study analytics · games + a video studio · tiny files (index.html + bank.js + on-demand labs.js / edu.js / arcade.js) — no install, no internet, no dependencies.

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
| 🧮 3D Shape Lab | Dependency-free interactive **3D solids** — cube, cuboid, sphere, cylinder, cone, pyramid, prism, **frustum & hemisphere** (9 shapes) — drag to rotate (double-click to reset), live dimension sliders, real-time volume & surface area with formulas, **anatomy facts** (faces · edges · vertices with the Euler check), auto-spin pause, **wireframe / orthographic / zoom views** (preferences persist per device), and **Solve a shape** — a shape-quiz mode with worked solutions that earns XP for correct answers and banks wrong ones into your mistake bank · links straight into the Mensuration paper · 3D-tilt cards on the home screen |
| 🏠 Home + ✨ AI Coach | A floating **home dock** (🏠 Home · ✨ AI Coach · 📚 Practice · 🔬 Study Hall · 📊 HQ) that appears as you scroll, highlights where you are, and jumps you around the app · an **AI Coach** card at the top of the home screen suggests up to five things to do next — spaced-revision due deck, daily challenge, weakest subject & topic drills, mock exam, exam-countdown plan, daily goal, printable worksheet, parent report, first paper — each with a *why* ("because …") and a one-tap action; **↻ New ideas** rotates the deck while keeping the most urgent suggestion pinned. All suggestions are computed on-device from your own results and refresh after every paper and sign-in |
| 👩‍🏫 The Professors' Standard | Built so teachers and professors recommend it worldwide: **🧠 metacognitive calibration** — after every study-mode answer students rate how sure they were (😕 🙂 😎) and Progress HQ compares confidence with actual accuracy per subject (well-calibrated / overconfident / underconfident verdicts); **🖨 printable exam papers** — subject + class + 10/20/30 questions, exam-style paper with the mark scheme on its own page, for class tests and homework; **👩‍🏫 For Educators hub** — research-based pedagogy (retrieval practice · spaced repetition · interleaving · feedback · mastery · calibration, with citations), classroom lesson plans, accessibility statement, privacy-on-device promise, printable educator guide and a one-tap recommend/share; **🔤 accessibility panel** — dyslexia-friendly readable text, high-contrast mode, text size, read-aloud, reduced motion in one place (persisted); richer CSV export (grade, time, mode, source) for your own analysis |
| 🛡 Robustness | **v9.1** — Records Hall and every analytics view now sanitise on-device history before aggregating (junk or legacy entries can no longer produce NaN scores or break a lab screen); the build pipeline reproduces the committed bank byte-for-byte |

| ⚡ Size & speed pass | The whole app is post-processed with a build-time minifier (JS + CSS, question bank left byte-identical): on-disk **≈595 KB** (≈414 KB app shell + ≈181 KB bank asset) and **≈255 KiB gzipped boot wire (app + bank)** — under the 260 KiB wire budget — so the page loads fast even on school and mobile networks in low-bandwidth regions. The v8.0 Exam-Room Labs ship in a **lazy sibling module** (`labs.js`, ≈16 KiB gzipped) and the **v10.0 Teaching Suite** ships in a sibling `edu.js` module, and the **v11.0 Curriculum Arcade** (games + video studio + hub) in an `arcade.js` module — all lazy, fetched on first use and cached by the service worker, so none blocks first paint and none competes with the boot gate. All feature-marker tags and the bank's SHA-256 integrity fingerprint are preserved |
| 📶 Install-free & offline (PWA) | A small service worker (HTTPS only, on-device only) caches the app after the first visit: it re-opens instantly and **keeps working with zero network** — flip on airplane mode after one visit and every feature, bank and progress store still runs. While online the network is tried first so every release reaches you on the next visit. No install, no account, no app store |
| ✨ Exam-Room Labs | **v8.0** — four new labs + a mid-paper tool, shipped as a lazy, service-worker-cached module so the boot file stays lean: **🏆 Records Hall** (highest score, fastest perfect paper, longest streak, biggest day, best 7-day stretch — with medals and a copyable progress snapshot) · **🗓 Exam Planner** (a day-by-day revision plan to any exam date: pick class + subjects, every syllabus topic is spaced over the days left with drill links and tick-off progress) · **🔁 Recall Blitz** (retrieval practice — the question appears before the options; honest self-marking; misses are banked straight into your spaced-revision mistakes) · **🤝 Quiz Me** (roadmap #97 — two players pass the device, alternating questions, streaks, winner's trophy) · **📘 Formula drawer** (the paper's subject formula & fact card, opened mid-paper without pausing the timer) |
| 🎓 Teaching Suite (SS1–SS3) | **v10.0** — a teacher-focused module behind the floating **🎓 Teaching Suite** button: **📚 Lesson Notes** for all **19 subjects** (the 13 core subjects + Further Mathematics, Christian Religious Studies, Islamic Religious Studies, Data Processing, Food & Nutrition, French) and every topic (objectives, curriculum context, key facts, worked examples, class evaluation with answers & explanations, printable lesson note, one-tap drill); **💻 CBT** — a genuine computer-based test (candidate registration, instructions, timer, answer-sheet grid, flagging, submit, full review with explanations, printable WAEC/NECO-style result slip and grade); **🗓 Scheme of Work** — 1st/2nd/3rd term weekly topic outlines; **🧭 Syllabus Map** and **🏅 Marking Guide** (WAEC/NECO 9-point scale). It re-uses the app's own verified 3,900-question bank and runs entirely on the device |
| 📘 Revision notes (formula & fact cards) | For **all 78 topics across the 13 subjects** — exam-style formulas and facts teachers will recognise (quadratic formula, SOH-CAH-TOA, OIL RIG, Ohm's law, monohybrid 3:1…). Opened from the Report Card lab or **straight from your results screen** (one tap on a missed paper), and printable as a single card or a whole-subject pack for the class. Topic names match the app's own topic tracker, so notes always appear where a student just failed |
| 🌌 3D scene depth | **Parallax hero** — floating scholar orbs, orbit rings and layered copy respond to the pointer · **3D certificate** — the PNG gains an embossed bevel frame, folded ribbon, gradient crest and engraved title, and tilts in perspective in the lightbox |
| 🎓 Mock Hall | Full timed **mock examinations** — 25/50/100 questions, exam pace or 30/60/90 min, auto-submit at zero, **integrity monitoring** (tab-switches recorded on the report), review screen with jump-to-any-question grid before submitting |
| 💾 Backup & Restore | One-tap **JSON export** of every paper, mistake, topic stat, badge, point and lab result — merge or replace when restoring on any device |
| 🏆 Scholar League | Local **leaderboard** of every study account on the device, ranked by study points with medals, papers, best % and YOU marker |
| 🏛 Maison d'Étude skin | Editorial hôtelier look inspired by Nouvelle Parfumerie Gandour (DD.NYC): warm ivory `#faf3e8` canvas, espresso ink, champagne-gold accents, fine serif with italic flourishes, hairline gold page frame, film grain, amber-noir hero salon, couture pill buttons, bronze medallions · full dark 'amber noir' theme |
| 🧠 Mistake Master | 11th study tile: a live "due today" counter over your spaced-repetition mistake bank (1/3/7/14-day gaps); one tap opens the due deck to clear it — mastered mistakes graduate out of the bank |
| 📝 Topic worksheets | From the Mastery Map: a printable 10-question worksheet for any topic (your past wrong-answers are pulled in first) with a full answer key — perfect for pen-and-paper practice |
| 🗓 Parent weekly report | One tap downloads a gilded PNG report (papers, average, best, streak, time, strongest & focus subjects, verdict) from HQ or the results screen |
| 🏅 Live hero stat | The hero now shows your real "papers sat" count, updated on sign-in and every dashboard refresh |
| 🎓 By-class readiness | Progress HQ now breaks your record down per class (papers, best, average, verdict) so you can see when you are ready to move up |
| 🎯 The Finishing School | **Focus Mode** — hide everything but the paper (nav 🎯 toggle or Esc, floating exit pill); **exam-exit guard** — if a timed or mock paper is running the browser warns before you leave; **Progress HQ upgrades** — average-time tile + Week in Review (papers, average, best, time studied over the last 7 days), and the results screen now opens HQ directly; **performance** — `content-visibility:auto` on cards/tiles so the big page renders faster, and all ambient motion (aurora, sunburst, orbs, cube) auto-pauses when the tab is hidden |
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
| 🎮 Curriculum Arcade | **v11.0 → v14.0** — eight study modes behind the **🎮 Arcade** launcher, powered by the verified bank + 19-subject study pairs: **🏷 Term Match** (match a term to its definition — 10 rounds, streaks, time bonus), **⚡ Rapid Fire** (60-second one-tap sprint), **🃏 Memory Pairs** (flip-and-match pairs) and **🪜 Ladder Challenge** (10 climbing rounds) — every round earns **XP + coins** on your study account · **📺 Video Studio** (curated Nigerian SS3 exam lessons + lesson channels, embed player with offline fallback, and add-your-own YouTube lesson links saved on the device) · **🗺 Curriculum Hub** (all 19 subjects, one tap into the Teaching Suite lesson notes) |
| 📱 Responsive hardening | **v10.2** — automated 8-viewport layout audit (320px phone → 1440px desktop, incl. every labs + Teaching Suite screen, run in headless Chrome): the app bar now wraps instead of clipping into a hidden horizontal scroll, all utility buttons are 40px touch targets, class tabs fit three-across to 320px, the quiz taskbar flows into wrapped rows instead of clipping buttons, and the Teaching Suite launcher button (which shipped unstyled, a 15×25px blob) gets its real styling + a 40px-tall tap area. Audit: 0 issues across 8 viewports; now covers 12 sizes incl. 360/393/412/430 phones · **cache-bust fix**: the service-worker cache key was still `-v10` (v10.0), so returning/offline users were served the pre-v10.2 shell with the clipped nav — bumped to `-v10.2` (new key installs fresh, activate purges old caches) · **SW end-to-end test** (`quiz/_sw_e2e.js`): installs the worker over HTTP, verifies the cached index is the responsive build, and boots the app from cache on an offline reload |

| 📊 Study Analytics | **v14.0** — the Arcade now records **every answer per subject**: a **Study Stats** dashboard (Accuracy, questions answered, arcade XP, coins, games played, 7-day XP strip) ranks your subjects with bars and puts one-tap **Rapid-drill buttons** on your three weakest subjects, so revision is targeted; **UTME quick subject packs** (🔬 Science · 🧬 Biological · 💼 Commercial · 🏛 Arts) fill the three elective subjects in one tap with checkmarked picks. Verified: v14 suite 47/47, responsive audit 0 issues across 12 viewports incl. the stats screens, bank untouched, wire gate holds, SW cache key `-v14` |
| 🎓 Exam Hall Complete | **v13.0** — **🧮 on-screen calculator** in the UTME simulation (JAMB CBT provides one — full keypad, keyboard input, divide-by-zero guard, never pauses the timer) · **📝 Theory Hall** (38 WAEC/NECO-style essay questions across all 19 subjects with model answers, marking points and examiner tips; write first, reveal, self-mark 8–10 / 5–7 / 1–4 for XP; progress saved per subject with ✓ badges) · **🪜 Ladder Challenge now covers all 19 subjects** (subject chips, authored + definition questions for the extended subjects). Verified: v13 suite 40/40, responsive audit 0 issues / 12 viewports incl. the new screens, bank untouched, wire gate holds, SW cache key bumped to `-v13` |
| 🎓 Advanced Study | **v12.0** — **🎓 UTME Simulation Hall** (JAMB-style: English Language + 3 subjects, 60 + 40×3 = 180 timed questions, answer grid, tab-switch integrity, auto-submit, per-subject /100 scaling → /400, per-subject review with explanations, best score saved) · **🃏 Flash Cards** (term–definition decks for all 19 subjects; "knew it / still learning" progress that re-queues tricky cards first) · **⚡ Rapid Fire now playable on all 19 subjects** (the 6 extended subjects get authored questions + definition questions) · **🔊 lesson read-aloud** in the Teaching Suite (speech synthesis, toggle + print view) · live score pill in Rapid Fire · header corrected to 19 subjects. Verified: v12 suite 33/33, responsive audit 0 issues / 12 viewports incl. the new arcade screens, bank untouched, wire gate holds, SW cache key bumped to `-v12` |
| 🎓 Curriculum Complete | **v11.0** — the Teaching Suite now covers **all 19 SS1–SS3 WAEC/NECO subjects** with full lesson notes (objectives, curriculum context, key facts, worked examples, class evaluation with answers, printable note, one-tap drill) and the app gains the **Curriculum Arcade** in a lazy, offline-cached `arcade.js`: Term Match · Rapid Fire 60s · Memory Pairs · Ladder Challenge (XP/coins rewards), the **Video Studio** (curated lesson videos & channels + your own YouTube links) and the **Curriculum Hub** (19 subjects → lesson notes). Verified: v11 end-to-end suite green, responsive audit 0 issues across 12 viewports, bank untouched and hash-verified · **SW cache key bumped to `-v11`** — edu.js changed, and without the bump returning users keep the 13-subject cache (same stale-cache failure as v10.2) |
| 🧘 Focus Lab | **v9.0** — a Pomodoro-style study timer in the lazy labs module: pick a subject + 15/25/45-minute focus block, run focus/break cycles, keep a small floating timer if you close the drawer, and turn any session into a real drill paper. The day's sessions and focus minutes are tracked on-device |
| 📱 Responsive-first pass | **v9.0** — fluid base type, tablet breakpoint, a scrollable app bar, a full-width bottom home dock, single/two-column grids for labs, dashboards and analytics, safe-area-aware modals and bottom sheets, compact landscape handling and bigger touch targets |
| ♿ Accessibility | Text-size control, reduced motion, read-aloud (browser speech), keyboard shortcuts (`?` for help) |

Two tiny boot files (the app shell + its question bank) are cached by the service worker after the first visit, and the v8.0 Exam-Room Labs module joins the cache on first use — perfect for school computers, tablets and phones with no internet.

---

## Run it locally

Just open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). That's it.

---

## Host it on GitHub Pages

This repo deploys to GitHub Pages straight from its `main` branch — the built `index.html` + `bank.js` + `sw.js` are committed, so no build step is needed on the server.

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

---

## 🌊 v5.0 — The Century Wave

**Five upgrades in one wave**, built on a new question-bank transport (delimiter-packed wire form with an in-page decoder — no JSON-to-browser re-compression, decode is ~40 ms):

| New | Details |
|---|---|
| 🏃 **Century run** | One tap on the length card starts a **100-question marathon across the whole syllabus** — three classes, 13 subjects, no timer, instant explanations, full confidence calibration. Finish it to earn the **Century runner** badge (and watch it appear in the dashboard). |
| 🌙 **Night mode** | Easy-on-the-eyes dark theme — the whole palette (ink, canvas, gold, cards, hero) re-tunes at once. Toggle it from the **accessibility panel**, it persists with your other accessibility settings, and paper printing stays on light. |
| 📄 **Exam paper → CSV** | The exam-paper printer now also exports the **paper as a CSV** (question, A–D, answer, explanation) for Excel or Google Sheets — set class tests and mark them in a spreadsheet. |
| 📤 **Share a result** | The results screen now has **Share result** — a ready-to-paste summary (subject, class, score, grade, date) for teachers, parents and WhatsApp study groups. |
| ✅ **Revision tracker** | Every revision card now has a **Mark as revised** toggle, with a live progress line (e.g. “🏅 12 of 78 topic cards revised”) in the Report Card lab — so the 78-card library becomes an actual revision checklist. |

**How it stays small:** the bank is now delimiter-packed **before** deflate (no JSON quotes/braces in the stream), which keeps the app at **594.8 KB on disk / 257.2 KiB gzipped** — under the 260 KiB wire budget — and the test suite grew to **133 checks, all green**.

---

## 🗺 Upgrade roadmap — 100 upgrades

The 100-upgrade plan. Items are **real**: everything marked ✅ is already shipped and tested in the app; ⬜ items are the honest backlog. The plan runs in waves — each wave ships a batch, and the tests keep guarding the 260 KiB wire budget. From v8.0 on, wave features that cannot fit inside the boot-critical budget ship as a **lazy, cached sibling module** (`labs.js`) — first paint and the boot gate stay exactly where they were.

### A. The quiz core
1. ✅ Timed examination mode (36 s per question, auto-submit)
2. ✅ Study mode with instant marking and explanations
3. ✅ Smart paper mode — prioritises your weakest subjects
4. ✅ Question library — search all 3,900 questions, reveal answers, star bookmarks
5. ✅ Mock examination hall — 25/50/100 questions, exam pace or 30/60/90 min
6. ✅ Exam integrity monitoring — tab-switch events recorded on the report
7. ✅ Review screen — jump-to-any-question grid before submitting
8. ✅ Smart selection — **1–4 / A–D** keys answer, **N / Enter / →** next, **←** back
9. ✅ Full keyboard shortcuts — `?` help, `/` focus library, `Esc` close, `F` flag, `P` print, `R` restart
10. ✅ Century run — 100-question mixed-syllabus marathon (v5.0)
11. ✅ Per-question elapsed-time recording and average-time review
12. ✅ Adaptive difficulty — the smart paper tunes itself to you: if you scrape through the ★★★ questions, the next smart paper leans hard (v6.2)

### B. Memory science
13. ✅ Spaced repetition — mistakes return after 1 → 3 → 7 → 14 days
14. ✅ Four correct reviews = mastered (graduates out of the mistake bank)
15. ✅ Mistake Master tile with live “due today” counter
16. ✅ Daily challenge — deterministic 10-question paper, new every day
17. ✅ Review session mode — the due-deck gets its own report line
18. ✅ Metacognitive calibration — confidence ratings compared with accuracy
19. ✅ Per-topic performance tracking behind every paper
20. ✅ Mastery Map — subject × topic heat-map, tap to drill
21. ✅ Topic worksheets — printable, your past wrong-answers pulled in first
22. ✅ Interleaved papers — topics mixed throughout a paper (v6.0, Rohrer & Taylor 2007)

### C. Study Hall
23. ✅ Flashcard decks — whole bank or your mistakes, flip-to-recall
24. ✅ Rapid Fire — 30–90 s sprints with streaks
25. ✅ Spelling Lab — type-the-answer with typo tolerance
26. ✅ Progress Report Card — printable for parents & teachers
27. ✅ Revision notes — 78 formula & fact cards (13 subjects × 6 topics)
28. ✅ Notes from the results screen — one tap on any missed paper
29. ✅ Print a single card or a whole-subject pack
30. ✅ Revision tracker — mark cards revised, live progress (v5.0)
31. ✅ 3D Shape Lab — 9 solids, formulas, Euler anatomy, shape-quiz mode
32. ✅ Audio flashcards — **🔊 Hear it** on every flashcard reads the card aloud (v7.0)

### D. Progress HQ
33. ✅ 16-week study heatmap
34. ✅ 13-subject mastery radar
35. ✅ Score trend chart
36. ✅ Weakest-topics ranking (tap through to drill)
37. ✅ Monthly calendar of papers
38. ✅ Readiness verdict per class
39. ✅ Week in Review — papers, average, best, time over 7 days
40. ✅ Average-time tile
41. ✅ Exam-readiness score — topics + mastery + consistency
42. ✅ Per-question item analysis — **Trap alert** lines show which wrong option lures you, per question (v7.0)

### E. Teachers & parents
43. ✅ Printable exam papers — paper + separate mark scheme page
44. ✅ Exam paper **CSV export** for Excel / Sheets (v5.0)
45. ✅ For Educators hub — research-based pedagogy with citations
46. ✅ Printable educator guide
47. ✅ Parent weekly report — gilded PNG download
48. ✅ Classroom lesson plans
49. ✅ One-tap recommend/share for teachers
50. ✅ AI Coach — up to five suggestions with reasons, refreshable
51. ✅ Scholar League — on-device leaderboard with medals
52. ✅ Class-ready: print a full-term practice pack — 12-week plan + 13 papers + 39 worksheets + subject notes, zipped per class (v7.2)

### F. Accessibility & comfort
53. ✅ Accessibility panel — 5 settings: text size, readable, high contrast, read-aloud, reduced motion
54. ✅ Night mode — dark theme, persisted with a11y settings (v5.0)
55. ✅ Read-aloud with speech synthesis
56. ✅ Dyslexia-friendly readable text
57. ✅ High-contrast mode
58. ✅ Reduced-motion mode — ambient animation pauses
59. ✅ Focus mode — hide everything but the paper
60. ✅ `Esc` exits overlays everywhere
61. ✅ Font choice — Default / Serif / Rounded typeface picker in the accessibility panel (v7.0)
62. ✅ Tap-target audit — coarse-pointer devices get ≥44 px buttons, chips and tabs guaranteed (v7.0)

### G. Motivation & game
63. ✅ Study points, scholar levels, merits
64. ✅ 12+ badges (first paper, perfect score, hat-trick, Centurion, Certificate earner…)
65. ✅ Century runner badge (v5.0)
66. ✅ Streaks — 3-day scholar, week of fire
67. ✅ Daily goals — questions per day, 7-day calendar
68. ✅ Game HUD + dashboard tiles
69. ✅ Certificate — download a personalised PDF/PNG
70. ✅ Confetti-style award moments on results
71. ✅ Trophy finish screen with grade seal
72. ✅ Monthly milestone review — **🏆 Best month** recap card in Progress HQ (v7.0)

### H. Reliability & engineering
73. ✅ 3,900-question generated bank with per-question explanations
74. ✅ Build-time verification — round-trip, duplicates, shape, separator checks
75. ✅ Delimiter-packed bank transport — faster decode, smaller wire (v5.0)
76. ✅ SHA-256 integrity fingerprint — tamper-lock with visible guard state
77. ✅ Object.freeze on the bank + verifyBankIntact checks
78. ✅ Offline service worker — works with zero network after one visit
79. ✅ PWA manifest + favicon
80. ✅ 156-check automated test suite (was 127) — all green (v7.2)
81. ✅ Gzip budget — 253.1 KiB combined (app + bank), held under the 260 KiB gate through v7.2
82. ✅ Backup & restore — JSON export, merge or replace
83. ✅ Backup & restore — sign-in sync between devices (Google)
84. ✅ Desktop app build (Windows exe + zip)
85. ✅ Batch-edit the bank safely — `quiz/bank_edit.py` patches questions by stem and verifies every unedited subject stays byte-identical (v7.2)
86. ⬜ Brotli-aware check — confirm the deploy host serves the smaller encoding

### I. Publishing & reach
87. ✅ GitHub Pages deployment with branch protection
88. ✅ sitemap.xml + robots.txt + Search Console verification
89. ✅ Open Graph / Twitter social preview image
90. ✅ Study content lock — interaction locks documented with honest limits
91. ✅ This roadmap, maintained with each wave
92. ⬜ Search Console submission + index monitoring
93. ✅ Lighthouse CI — GitHub Actions audit of the live site with quality floors + report artifact (v7.2)
94. ⬜ A short “how to study with this app” video link for students

### J. The next wave (open)
95. ✅ Sound design — correct/wrong/badge/coin tones via WebAudio, off by default (verified in v7.0)
96. ✅ Exam countdown card — name + date, gold banner counts the days (verified in v7.0)
97. ✅ Two-player “quiz me” mode — pass the device, alternating questions, streaks & a winner’s trophy (v8.0, shipped in the lazy `labs.js` module so it never touches the boot gate)
98. ✅ Question difficulty tags and a “tough papers only” toggle
99. ⬜ Localised option — a second language for stems and explanations
100. ✅ Suggest-a-question — footer link opens a prefilled GitHub issue; template + label ready (v7.2)

**_How to read the roadmap:_** ✅ items are already in the shipped app (the roadmap doubles as the feature index). ⬜ items are queued exactly as labelled — nothing on this list is fictional, and every future wave keeps the suite green and the bank intact.


---


---
## ✨ v8.0 — The Exam-Room Wave

**Roadmap #97 ships, and the app grows four new labs plus a mid-paper tool — without a single byte entering the boot-critical file's budget.** Every new feature lives in `labs.js`, a deferred sibling module (the same pattern that split `bank.js` out in v7.0): the page fetches it on first use, the service worker caches it, and it then works fully offline. Boot wire (app + bank) stays ≈255 KiB gzipped — under the 260 KiB gate.

| New | What it does |
|---|---|
| 🏆 **Records Hall** | Your personal bests, computed live from your own stored papers: highest score, **fastest perfect paper**, longest daily streak, most questions in a day and best 7-day stretch — top three with 🥇🥈🥉 and dates, plus a **Copy progress snapshot** button for WhatsApp study groups and parents. The hall refreshes itself after every paper. |
| 🗓 **Exam Planner** | Give an examination a name and a date (e.g. “WAEC SSCE — Mathematics”), pick your class and subjects, and the planner spaces **every chosen syllabus topic** across the days left, interleaving subjects day by day. Each task shows the topic’s formula/fact snippet, a **▶ Drill 10** button that opens the real paper screen (answers feed your normal records, XP, mastery map and mistakes), tick-off checkboxes with a live progress bar, a final-mock shortcut, a copyable plain-text plan, and honest warnings when the exam is too close to cover everything comfortably. |
| 🔁 **Recall Blitz** | Retrieval-practice sprint: the question appears **before** the options, you say your answer out loud, then reveal and mark yourself — **Got it / Almost / Missed**. Misses are banked into your spaced-revision mistakes automatically (same dedupe and cap rules as the app’s own mistake store, so the Mistake Master counter updates at once). Earns XP, ends with a recall score and a list of what is coming back to you. |
| 🤝 **Quiz Me** | Roadmap **#97** — two players, one device: names, class, subject and rounds; questions alternate, streaks build, and the higher score takes the 🏆 (draws share the honours). Winner earns XP and 🎖 merits on the device profile, but the game **never writes to your paper records** — progress statistics stay honest. |
| 📘 **Formula drawer** | A button in the paper’s action row opens the current subject’s formula & fact card (SOH-CAH-TOA, OIL RIG, V = IR, the quadratic formula…) **without pausing the timer or leaving the question** — with links to the full card and a printable subject pack. |

**Engineering:** the module reads the app’s own globals (`CLASSES`, `RNOTES`, the `nssc_*` store) and mirrors the app’s existing patterns (mistake dedupe, `state`-driven paper launch, XP/coins awards, `esc()` hygiene, namespaced `LX.*` handlers so nothing collides with the app). It injects one scoped stylesheet that inherits the maison palette and both themes. `sw.js` bumps to `nssc-v20250906`; `labs.js` is deliberately **not** in the service worker’s install list (an offline first visit must never fail to install) — the network-first fetch handler caches it on the first online use, after which the labs work offline like everything else.

**Verified, not claimed:** the whole app (real `index.html` + real `bank.js` + `labs.js`) boots in a DOM test harness and every lab is driven end-to-end — sign-in, seeded papers, planner build/tick/drill/mock, blitz reveal/grade/banking, the two-player duel, the formula card — **41 checks, all green** (`jsdom`, no real browser needed).

---
## 🧰 v7.2 — The Classroom Wave

**Four roadmap items shipped in one release — every one of them zero-cost to the app's wire budget (the audit suite stays at 156 checks, all green).**

| Roadmap | What shipped |
|---|---|
| **#52 Practice pack** | `quiz/make_pack.py` builds a printable **full-term pack per class** — 12-week revision plan, 13 subject papers (100 questions + answer key), 39 topic worksheets, subject formula/fact notes — and zips it: [`packs/SS1-full-term-practice-pack.zip`](packs/SS1-full-term-practice-pack.zip), SS2, SS3 (each 106 files — 13 papers, 78 topic worksheets, 13 notes packs + plan — ~4.9 MB). |
| **#85 Safe bank edit** | `quiz/bank_edit.py` + a `quiz/edits.json` hook in the build: patch questions by exact stem, rebuild, and **every unedited subject is verified byte-identical** against `quiz/bank_manifest.json`. Two real content bugs fixed this wave (SS2/SS3 Maths “NOT an algebra” explanations). |
| **#93 Lighthouse CI** | `.github/workflows/lighthouse.yml` audits the live Pages URL on every relevant push and asserts floors (performance 55, accessibility 95, best-practices 90, SEO 90, PWA 85) with the report uploaded as an artifact. |
| **#100 Suggest a question** | Footer **✍️ Suggest a question** button → prefilled GitHub issue (label `question` + template) so students can propose items; verified before shipping. |

**Still open (needs you):** #92 Search Console submission (needs your Google login), #94 study video link (needs your video), #99 localisation (a content project: 3,900 stems), #86 brotli (GitHub Pages does not serve brotli). (#97 shipped in v8.0 — two-player mode lives in the lazy `labs.js` module, so it does not compete with the boot-critical 260 KiB gate.)

---
## 🔧 v7.1 — The Bug-Fix Wave

**A full adversarial audit (`quiz/_bughunt.js`: corrupted storage, junk-typed data, missing browser APIs, empty deques, injection attempts) found 21 real robustness bugs — all fixed, all regression-checked.**

| Fix | What was wrong |
|---|---|
| 🧹 Corrupt attempt records | `null`/primitive entries in stored results crashed the HQ, stats and history screens — `attempts()` now sanitises every read. |
| 🔢 `NaN%` everywhere | Non-numeric `pct`/`t`/`tp` values flowed into every `Math.max`/`Math.round` — all aggregates now coerce (`+pct||0`) and skip non-finite rows (mocked "Best score", "Average", pace rows, day counts, best-month card). |
| 📅 Countdown past dates | A date in the past read **“It is today — good luck!”** — now it says the date has passed. |
| 📄 Zero-question paper | `startQuiz` with a 0/null count crashed the question card — it falls back to a 10-question paper. |
| 🔒 Quote escaping | `esc()` never escaped `"`/`'`, so names could break out of HTML attributes — now fully escaped. |
| 💾 Corrupt session | Resume dropped malformed question rows instead of crashing; the resume banner tolerates a bad session. |
| 🎰 Wheel / 3D quiz / library | Out-of-range wheel segments, arg-less lab-quiz calls and missing elements in library toggles are all guarded. |
| 🗣 No-speech / no-audio browsers | Flashcards and sound effects degrade to a toast instead of throwing. |
| ✅ Suite integrity | The mock-exam auto-submit check's async body was silently unhandled (a masked failure) — it now truly awaits, plus 6 new regression checks (138–143). |

**Budget discipline:** same bank payload (byte-identical), combined gzip **252.8 KiB** (headroom 7.3 KiB), **156 checks all green**, `quiz/_bughunt.js` 0 failures.

---
## 🎓 v7.0 — The Split-Bank Wave

**The biggest architectural change in the project: the question bank moves out of the page — and the wave of features is funded by it. The bank's content is byte-identical (same 3,900 questions, same delimiter-packed form, same SHA-256 fingerprint over the packed text — the integrity self-check is untouched).**

| New | What it does |
|---|---|
| 🏗 **Split-file build** | The bank now ships as a sibling `bank.js` (generated from the template's marked block, re-compressed with **zopfli** — ~6 KB smaller than zlib-9 for the same deflate format every browser decodes natively). The app shell's gzip drops **266 KB → 122 KB**; the combined app+bank is **252.6 KiB**, and the test suite enforces the 260 KiB gate on the *combined* wire (check 118). |
| 🔊 **Audio flashcards** | A **Hear it** button on every flashcard reads the card aloud with the device's speech engine (question + the four options). |
| 📊 **Item analysis** | Every paper feeds a per-question option tally; on review, wrong answers get a **Trap alert** — “you're lured by C (64% of attempts on this question)”. |
| 🏆 **Best month review** | Progress HQ gains a **Best month** card: your strongest stretch (≥3 papers) with the average. |
| 🔤 **Font style choice** | Default / Serif / Rounded typeface picker in the accessibility panel, persisted. |
| 👆 **Tap-target audit** | On coarse-pointer devices every button, chip and tab is guaranteed ≥44 px tall. |
| ✅ **Verified, not duplicated** | The audit also confirmed **sound design** and the **exam countdown** were already shipped — they're now marked ✅ on the roadmap instead of being re-built; a would-be duplicate countdown was removed. |

**Budget discipline:** 252.6 KiB combined gzip (119.6 app + 132.8 bank), bank payload byte-identical, **150 checks all green** (144 + 6 new: countdown-verified, font style, audio flashcards, item analysis, best month, tap-target + sound).

---
## 🎓 v6.2 — The Adaptive Wave

**The paper now tunes itself to you — and the teacher's workshop got one more one-tap tool.**

| New | What it does |
|---|---|
| 🎚 **Adaptive difficulty** | Question hardness was already tagged (1–3 ★). Now the smart paper reads the difficulty breakdown of your *latest* paper: if you smashed at least four hard questions but scored under 50% on them, the next smart paper is drawn entirely from the ★★★ pool — automatic, honest escalation. |
| 📊 **Difficulty mix on results** | Every results screen now shows the paper's average difficulty (e.g. `🎚 ★1.7`) and how you did on the hard ones — you can see *which* weight of question you're losing marks on. |
| ⬇ **One-tap paper CSV** | The exam-paper workshop already exported CSV (v5.0); the button now sits right next to **Print paper** in the paper card — one tap, no digging. |
| 🧹 **Dead-code sweep** | Five genuinely uncalled functions (`quizStreakDays`, `topicAcc`, `initHomeNav`, `interleaveOn`, `titleCase`) removed after a full reference audit — the wave is funded, not bloated. The keyboard layer (1–4/A–D, N/Enter/→, ←, F/P/R/?, /) was verified first-class in the same pass. |

**Budget discipline:** the wave landed at **259.9 KiB gzipped** — under the 260 KiB gate — with the bank payload byte-untouched, the suite grown to **143 checks, all green** (141 + adaptive-difficulty paper + CSV button & difficulty-mix render).

---
## 🎓 v6.1 — The Hard-Questions Wave

**Questions finally tell you how hard they are — and you can ask for only the hard ones.**

| New | What it does |
|---|---|
| ⭐ **Difficulty tags** | Every question carries a deterministic difficulty rating (1–3 stars) derived from its own content — easy · medium · hard. Shown beside the subject on the question card, so you always know the weight of the question you're facing. |
| 🔥 **Tough paper toggle** | On the length card: *study mode only* — the paper is drawn purely from the hard (★★★) questions, falling back to medium-plus when a selection is too thin. Exam mode, daily challenges and review sessions are never affected. |

**Budget discipline:** the wave landed at **259.7 KiB gzipped** (from 259.9) — every byte of the new feature was funded by removing genuinely dead CSS (an orphaned `.gbtn` button skin, a leftover `.hero .gp` effect, an unused `.hero h1 em` rule and a lone `.btn-ghost.big` selector, all verified unreferenced by a full in-browser state walk), the test suite grew to **141 checks, all green** (139 + tough-paper filter + difficulty stars), and the build pipeline is verified to reproduce the shipped app byte-for-byte from `quiz/template.html`.


---
## 🎓 v6.0 — The Professors' Wave

**Six upgrades that speak the language of learning science** — so teachers and teacher-educators can see exactly *why* the app works, and recommend it with evidence:

| New | The science behind it |
|---|---|
| 🔄 **Interleaved papers** | A toggle on the length card mixes topics *throughout* a paper (study mode). Mixing, not blocking, is what builds durable learning — Rohrer & Taylor (*Instructional Science*, 2007). |
| ⏱ **Pace by topic** | Seconds-per-question, aggregated per topic on the printable report card — feedback on *fluency*, the second half of mastery (automaticity + accuracy). |
| 🧠 **Reflection journal** | Every paper now has a **SMART goal** — automatically “Beat your last score” (or “First paper”) — and results invite two short reflection lines (learned / next). Entries live in a journal on the report card, printable with the report. This is *self-regulated learning* in action: plan → do → reflect (Zimmerman, 2002). |
| 🪜 **Learning paths** | The Mastery Map now shows each subject as its **syllabus progression** — the teaching order — with every topic tappable to drill. Scaffolding and prerequisite structure, visible at a glance. |
| 🔬 **Strategy chips + sources** | Results now show *which evidence-based strategies this paper used* (retrieval ✓, spacing ✓, interleaving ✓, calibration ✓) plus a one-line citation. Students learn *about* learning. |
| 📚 **Sources & further reading** | The Educators hub now cites the actual literature: Roediger & Karpicke (2006) · Dunlosky et al. (2013) · Rohrer & Taylor (2007) · Hattie & Timperley (2007) · Flavell (1979) · Zimmerman (2002) · Bjork (1994) — and the printable educator guide carries the same sources. |

**Budget discipline:** the wave landed at **259.9 KiB gzipped** (from 257.2) — still under the 260 KiB gate, with the test suite grown to **139 checks, all green** (the bank payload is untouched; every new feature was written tight, and the manual goal picker was replaced by a smarter automatic one).


---

## 🤳 v9.0 — The Every-Screen Wave

**A full responsive/mobile-first pass across the whole app plus a new advanced study tool — shipped in the lazy labs module so the boot-critical page stays lean.**

| New | What it does |
|---|---|
| 🧘 **Focus Lab** | A **Pomodoro-style study timer** in `labs.js` (lazy-loaded, offline-cached). Pick a subject and a 15/25/45-minute focus block, choose a 5/10-minute break, then start a focus/break cycle. The timer keeps running in a small **floating pill** if you close the drawer — tap it to come back. Every completed focus block is stored on-device with the subject and length, and a **today** card shows sessions, focus minutes and your day streak. A **▶ Drill 10** button turns the active subject into a real paper (answers feed your normal records, XP, mastery map and mistake bank). |
| 📱 **Responsive-first pass** | Fluid base typography (`clamp`) so the app scales cleanly from small phones to large desktops; a **wide-screen** layout (1500px+) for big monitors; a **tablet** breakpoint that keeps the app bar readable; a **scrollable top nav** on narrow screens so 13 subjects, HUD and account stay reachable; a **full-width bottom home dock** on phones with safe-area insets; two-column mobile grids for labs, dashboard tiles, study-hall cards and analytics; compact quiz option rows, review cards and print-friendly modals; and **landscape/short-screen** handling so the hero doesn't swallow the page. Added a small-screen refinement for the labs overlay too (focus ring, chips, action buttons). |
| 🔄 **Cache refresh** | Service-worker version bumped (`nssc-v…-v9`) so existing installs pick up the new build on their next online visit; the bank payload is untouched. |

**Budget:** the responsive layer lives in the app shell, the new Focus Lab lives in the lazy `labs.js` module (≈16 KiB gzipped) and is runtime-cached by the service worker — so first paint and the boot-critical 260 KiB wire gate still hold.

---

**© merebari web** · Made for learners of the Senior Secondary Curriculum.
