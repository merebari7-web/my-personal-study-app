/* ============================================================
   v11.0 — STUDY ARCADE + VIDEO STUDIO · engine
   4 curriculum games (Term Match, Rapid Fire 60s, Memory Pairs,
   Ladder Challenge) + Video Studio + full-curriculum hub.
   All state lives on-device; XP/merits feed the main app.
   ============================================================ */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function shuffle(a) { var b = a.slice(); for (var i = b.length - 1; i > 0; i--) { var j = (Math.random() * (i + 1)) | 0; var t = b[i]; b[i] = b[j]; b[j] = t; } return b; }
  function hasLS() { try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); return true; } catch (e) { return false; } }
  function store(k, v) {
    if (!hasLS()) return;
    try {
      if (v === undefined) return JSON.parse(localStorage.getItem(k) || "null");
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  }
  function toast(m, icon) {
    try { if (window.toast) return toast(m, icon); } catch (e) {}
    try { window.toast(m, icon); } catch (e) {}
  }
  function xp(n) { try { if (window.xpAdd && n) { xpAdd(n); return true; } } catch (e) {} return false; }
  function coin(n) { try { if (window.coinsAdd && n) { coinsAdd(n); return true; } } catch (e) {} return false; }
  function bank() {
    try {
      if (typeof CLASSES !== "undefined" && CLASSES && CLASSES.length && CLASSES[0] && CLASSES[0].questions) return CLASSES;
      if (window.QUIZ_RAW && QUIZ_RAW.classes && QUIZ_RAW.classes.length) return QUIZ_RAW.classes;
    } catch (e) {}
    return null;
  }
  function subjList() {
    try { if (window.QUIZ_RAW && Array.isArray(QUIZ_RAW.subj)) return QUIZ_RAW.subj.slice(); } catch (e) {}
    return Object.keys(PAIRS);
  }
  function uid() { var k = "nssc_uid_a"; var v = store(k); if (!v) { v = Math.random().toString(36).slice(2, 10); store(k, v); } return v; }
  var ARC_KEY = "nssc_arc_a";
  function bests() { var b = store(ARC_KEY) || {}; return typeof b === "object" && !Array.isArray(b) ? b : {}; }
  function saveBest(b) { var cur = bests(); cur[b] = { best: M.best, at: Date.now() }; store(ARC_KEY, cur); }

  /* ---------- state ---------- */
  var M = { mode: null, subj: null, round: 0, score: 0, streak: 0, best: 0, lives: 3, secs: 0, moves: 0, t0: 0, deck: [], timer: null, over: false };
  var CUSTOM_VID = "nssc_videos_a";

  /* ---------- overlay + css ---------- */
  var CSS = ""
    + "#arcOv{position:fixed;inset:0;z-index:90;background:rgba(4,10,20,.62);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:flex-end;justify-content:center;padding:0}"
    + "@media(min-width:760px){#arcOv{align-items:center;padding:24px}}"
    + "#arcOv .arc-modal{background:var(--card-solid,#fffaf0);color:var(--ink,#1c1626);width:100%;max-width:860px;max-height:92dvh;border-radius:18px 18px 0 0;overflow:auto;padding:16px;border:1px solid var(--card-border,#ddd2b8)}"
    + "@media(min-width:760px){#arcOv .arc-modal{border-radius:18px;max-height:86vh;padding:22px}}"
    + ".arc-head{display:flex;align-items:center;gap:10px;justify-content:space-between;margin-bottom:10px}"
    + ".arc-head h3{margin:0;font-family:Georgia,'Times New Roman',serif;font-size:1.05rem;letter-spacing:.02em}"
    + ".arc-x{background:transparent;border:1px solid var(--card-border,#ddd2b8);border-radius:50%;width:40px;height:40px;cursor:pointer;font-size:1rem;color:var(--ink,#1c1626);flex:none}"
    + ".arc-tabs{display:flex;gap:6px;overflow-x:auto;padding:0 0 8px;border-bottom:1px solid var(--card-border,#ddd2b8);margin-bottom:12px}"
    + ".arc-tab{border:1px solid var(--card-border,#ddd2b8);background:var(--bg,#f5efe4);color:var(--ink,#1c1626);border-radius:999px;padding:8px 14px;font-size:.8rem;cursor:pointer;white-space:nowrap;font-family:inherit;min-height:38px}"
    + ".arc-tab.on{background:rgba(201,162,39,.18);border-color:#c9a227;font-weight:800}"
    + ".arc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}"
    + ".arc-tile{border:1px solid var(--card-border,#ddd2b8);background:var(--panel,#fbf7ee);border-radius:14px;padding:14px 12px;text-align:left;cursor:pointer;font-family:inherit;color:var(--ink,#1c1626);transition:.18s;min-height:112px}"
    + ".arc-tile:hover{transform:translateY(-2px);border-color:#c9a227;box-shadow:0 10px 24px -14px rgba(0,0,0,.4)}"
    + ".arc-tile b{display:block;font-size:.95rem;line-height:1.3;margin:6px 0 3px}"
    + ".arc-tile span{font-size:1.4rem}"
    + ".arc-tile small{display:block;color:var(--mut,#8a7a5e);font-size:.72rem;line-height:1.45}"
    + ".arc-best{font-size:.72rem;color:#8a6d1f;font-weight:800;margin-top:8px}"
    + ".arc-sub{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 10px}"
    + ".arc-chip{border:1px solid var(--card-border,#ddd2b8);background:var(--chip-bg,#fffdf6);color:var(--ink,#1c1626);border-radius:999px;padding:7px 13px;font-size:.76rem;cursor:pointer;font-family:inherit;min-height:36px}"
    + ".arc-chip.on{background:rgba(201,162,39,.2);border-color:#c9a227;font-weight:800}"
    + ".arc-q{border:1px solid var(--card-border,#ddd2b8);border-radius:14px;padding:14px 15px;background:var(--panel,#fbf7ee);margin-bottom:10px}"
    + ".arc-qtext{font-size:.95rem;font-weight:700;line-height:1.5;margin-bottom:12px}"
    + ".arc-opts{display:grid;gap:8px;grid-template-columns:1fr}"
    + ".arc-opt{border:1.5px solid var(--card-border,#ddd2b8);background:var(--opt-bg,#fffdf6);color:var(--ink,#1c1626);border-radius:11px;padding:11px 12px;font-size:.86rem;text-align:left;cursor:pointer;font-family:inherit;min-height:44px}"
    + ".arc-opt:hover{border-color:#c9a227}"
    + ".arc-opt.good{border-color:#2b8a3e;background:rgba(43,138,62,.12)}"
    + ".arc-opt.bad{border-color:#c92a2a;background:rgba(201,42,42,.12)}"
    + ".arc-opt.dim{opacity:.55}"
    + ".arc-hud{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}"
    + ".arc-pill{background:var(--panel,#fbf7ee);border:1px solid var(--card-border,#ddd2b8);border-radius:999px;padding:6px 12px;font-size:.76rem;font-weight:800}"
    + ".arc-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}"
    + ".arc-btn{border:1.5px solid var(--card-border,#ddd2b8);background:var(--chip-bg,#fffdf6);color:var(--ink,#1c1626);border-radius:11px;padding:10px 16px;font-family:inherit;font-size:.82rem;font-weight:800;cursor:pointer;min-height:40px}"
    + ".arc-btn.gold{background:#c9a227;color:#1d1508;border-color:#a67c1e}"
    + ".arc-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}"
    + "@media(max-width:420px){.arc-cards{grid-template-columns:repeat(3,1fr)}}"
    + ".arc-card{aspect-ratio:1;border:1.5px solid var(--card-border,#ddd2b8);border-radius:12px;background:linear-gradient(150deg,#134a7c,#0a2c50);color:#f5ead2;font-size:.74rem;font-weight:800;display:grid;place-items:center;padding:6px;text-align:center;cursor:pointer;font-family:inherit;min-height:52px}"
    + ".arc-card.up{background:var(--chip-bg,#fffdf6);color:var(--ink,#1c1626)}"
    + ".arc-card.gone{visibility:hidden;pointer-events:none}"
    + ".arc-vid{border:1px solid var(--card-border,#ddd2b8);border-radius:14px;padding:10px 12px;background:var(--panel,#fbf7ee);margin-bottom:10px}"
    + ".arc-vid iframe{width:100%;aspect-ratio:16/9;border:0;border-radius:10px;background:#000;display:block}"
    + ".arc-vid h4{margin:8px 0 2px;font-size:.9rem}"
    + ".arc-vid small{color:var(--mut,#8a7a5e);font-size:.72rem}"
    + ".arc-play{border:1.5px solid #c9a227;background:rgba(201,162,39,.15);color:var(--ink,#1c1626);border-radius:999px;padding:5px 13px;font-size:.7rem;font-weight:900;cursor:pointer;font-family:inherit;min-height:34px;margin-right:8px}"
    + ".arc-add{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0;align-items:center}"
    + ".arc-add input{flex:1 1 180px;border:1.5px solid var(--card-border,#ddd2b8);border-radius:10px;padding:9px 11px;font-size:.82rem;font-family:inherit;background:var(--opt-bg,#fffdf6);color:var(--ink,#1c1626);min-height:40px}"
    + ".arc-note{font-size:.72rem;color:var(--mut,#8a7a5e);line-height:1.5;margin:8px 0}"
    + ".arc-pairs{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:8px;margin-top:8px}"
    + ".arc-pair{border:1px solid var(--card-border,#ddd2b8);border-radius:10px;padding:9px 11px;background:var(--panel,#fbf7ee);font-size:.75rem;line-height:1.5}"
    + ".arc-pair b{color:#8a6d1f}";

  function body() { return $("arcBody"); }
  function shell(title, inner, wide) {
    var ov = $("arcOv");
    if (!ov) {
      ov = document.createElement("div"); ov.id = "arcOv";
      ov.innerHTML = '<div class="arc-modal" id="arcModal">' +
        '<div class="arc-head"><h3 id="arcTitle">🎮 Study Arcade</h3><button type="button" class="arc-x" id="arcX" aria-label="Close">✕</button></div>' +
        '<div class="arc-tabs" id="arcTabs"></div><div id="arcBody"></div></div>';
      document.body.appendChild(ov);
      $("arcX").onclick = function () { close(); };
    }
    $("arcTitle").textContent = title;
    body().innerHTML = inner;
    tabs();
    ov.classList.remove("hidden");
    document.body.classList.add("arc-open");
    try { renderGameHud && renderGameHud(); } catch (e) {}
  }
  function close() {
    var ov = $("arcOv");
    if (ov) ov.classList.add("hidden");
    document.body.classList.remove("arc-open");
    if (M.timer) { clearInterval(M.timer); M.timer = null; }
  }
  function tabs() {
    var t = $("arcTabs"); if (!t) return;
    var items = [["open", "🏠 Home"], ["term", "🧠 Term Match"], ["rapid", "⚡ Rapid Fire"], ["memo", "🃏 Memory Pairs"], ["ladder", "🪜 Ladder"], ["videos", "🎬 Video Studio"], ["hub", "🗺 Curriculum"]];
    t.innerHTML = items.map(function (x) {
      return '<button type="button" class="arc-tab' + (M.mode === x[0] ? " on" : "") + '" onclick="ARC.go(\'' + x[0] + '\')">' + x[1] + "</button>";
    }).join("");
  }

  /* ---------- home ---------- */
  function go(kind, opts) {
    if (kind === "close") return close();
    if (kind !== "open") M.mode = kind;
    else M.mode = "open";
    if (M.timer) { clearInterval(M.timer); M.timer = null; }
    if (kind === "term") return termGo(opts);
    if (kind === "rapid") return rapidGo(opts);
    if (kind === "memo") return memoGo(opts);
    if (kind === "ladder") return ladderGo(opts);
    if (kind === "videos") return vidRoute();
    if (kind === "hub") return hubRoute();
    var bs = bests();
    shell("🎮 Study Arcade — play, revise, level up", "" +
      '<p style="margin:0 0 10px;font-size:.8rem;color:var(--mut,#8a7a5e)">Four quick games built on the app\'s verified WAEC/NECO question bank — every correct answer earns XP and merits.</p>' +
      '<div class="arc-grid">' +
      tile("term", "🧠", "Term Match", "Match each term to its definition — 10 rounds, streaks count", bs.term && bs.term.best ? bs.term.best.best + " pts best" : "") +
      tile("rapid", "⚡", "Rapid Fire 60s", "Answer as many real questions as you can in 60 seconds", bs.rapid && bs.rapid.best ? bs.rapid.best.best + " pts best" : "") +
      tile("memo", "🃏", "Memory Pairs", "Flip cards and match term–definition pairs in as few moves as possible", bs.memo && bs.memo.best ? bs.memo.best.best + " moves best" : "") +
      tile("ladder", "🪜", "Ladder Challenge", "10 rungs, 3 lives, ever-tighter timing — climb for the top", bs.ladder && bs.ladder.best ? bs.ladder.best.best + " rungs best" : "") +
      tile("videos", "🎬", "Video Studio", "Curated Nigerian lesson videos + add your own links", "") +
      tile("hub", "🗺", "Curriculum Hub", "Every SS1–SS3 subject with lesson notes in one place", "") +
      "</div>");
  }
  function tile(mode, icon, t, small, best) {
    return '<button type="button" class="arc-tile" onclick="ARC.go(\'' + mode + '\')"><span>' + icon + '</span><b>' + esc(t) + '</b><small>' + esc(small) + '</small>' + (best ? '<div class="arc-best">' + esc(best) + "</div>" : "") + "</button>";
  }

  /* ---------- Term Match ---------- */
  function termGo(opts) {
    var subj = (opts && opts.subj) || M.subj || "Mathematics";
    if (!PAIRS[subj]) subj = Object.keys(PAIRS)[0];
    M.subj = subj;
    M.round = 0; M.score = 0; M.streak = 0; M.over = false;
    var chips = Object.keys(PAIRS).map(function (s) { return '<button type="button" class="arc-chip' + (s === subj ? " on" : "") + '" onclick="ARC.termSub(\'' + esc(s).replace(/'/g, "\\'") + '\')">' + esc(s) + "</button>"; }).join("");
    shell("🧠 Term Match — " + subj, '<div class="arc-sub">' + chips + "</div><div id=\"arcPlay\"></div>");
    termRound();
  }
  function termSub(s) { M.subj = s; termGo(); }
  function termRound() {
    var play = $("arcPlay"); if (!play) return;
    if (M.round >= 10) return termEnd();
    var pairs = PAIRS[M.subj];
    var right = pairs[M.round % pairs.length];
    var wrong = shuffle(pairs.filter(function (p) { return p.t !== right.t; })).slice(0, 3);
    var opts = shuffle([right].concat(wrong));
    M.round++;
    play.innerHTML = '<div class="arc-hud"><span class="arc-pill">Round ' + M.round + "/10</span><span class=\"arc-pill\">Score " + M.score + "</span><span class=\"arc-pill\">Streak 🔥" + M.streak + "</span></div>" +
      '<div class="arc-q"><div class="arc-qtext">' + esc(right.t) + "</div>" +
      '<div class="arc-opts" id="arcTermOpts" data-answer="' + opts.indexOf(right) + '">' +
      opts.map(function (p, i) { return '<button type="button" class="arc-opt" onclick="ARC.pick(' + i + ')">' + esc(p.d) + "</button>"; }).join("") + "</div></div>";
  }
  function pick(i) {
    var opts = $("arcTermOpts"); if (!opts) return;
    var ans = +opts.getAttribute("data-answer");
    var btns = opts.querySelectorAll(".arc-opt");
    Array.prototype.forEach.call(btns, function (b, k) {
      b.classList.add(k === ans ? "good" : "dim");
      if (k === i && i !== ans) b.classList.add("bad");
      b.disabled = true;
    });
    if (i === ans) { M.score += 10 + 2 * M.streak; M.streak++; }
    else M.streak = 0;
    setTimeout(termRound, 650);
  }
  function termEnd() {
    M.best = M.score;
    xp(M.score * 2); coin(M.score >= 60 ? 1 : 0);
    saveBest("term");
    var p = $("arcPlay");
    if (p) p.innerHTML = '<div class="arc-q"><div class="arc-qtext">🏁 Final score: ' + M.score + ' pts (streak bonus included)</div>' +
      '<p style="font-size:.78rem;color:var(--mut,#8a7a5e);margin:0 0 10px">Every point is 2 XP toward your level in the main app.</p>' +
      '<div class="arc-actions"><button type="button" class="arc-btn gold" onclick="ARC.go(\'term\')">Play again</button><button type="button" class="arc-btn" onclick="ARC.go(\'open\')">All games</button></div></div>';
  }

  /* ---------- Rapid Fire 60s ---------- */
  function rapidGo(opts) {
    var secs = (opts && opts.secs) || 60;
    var cls = bank(); if (!cls) { toast("The question bank is still loading — try again in a moment", "⏳"); return go("open"); }
    M.secs = secs; M.score = 0; M.streak = 0; M.round = 0; M.over = false;
    M.deck = rapidDeck(cls).slice(0, 40);
    M.t0 = Date.now();
    shell("⚡ Rapid Fire — 60 seconds", '<div class="arc-hud"><span class="arc-pill" id="arcClock">⏱ ' + secs + "s</span><span class=\"arc-pill\">Score " + M.score + '</span><span class="arc-pill">Streak 🔥' + M.streak + "</span></div><div id=\"arcPlay\"></div>");
    rapidQ();
    M.timer = setInterval(function () {
      var left = Math.max(0, secs - ((Date.now() - M.t0) / 1000 | 0));
      var c = $("arcClock"); if (c) c.textContent = "⏱ " + left + "s";
      if (left <= 0) { clearInterval(M.timer); M.timer = null; rapidEnd(); }
    }, 1000);
  }
  function rapidDeck(cls) {
    /* adaptive: lean on the subjects where this device has the most mistakes */
    var miss = null;
    try { var m = store("nssc_mistakes"); if (m && typeof m === "object") miss = m; } catch (e) {}
    var all = [];
    cls.forEach(function (c) { (c.questions || []).forEach(function (q) { all.push(q); }); });
    if (miss) {
      var hot = [];
      Object.keys(miss).forEach(function (k) {
        var v = miss[k];
        var n = typeof v === "number" ? v : (v && v.n) || 0;
        if (n > 2) hot.push(k);
      });
      if (hot.length) {
        var hotQs = all.filter(function (q) { return hot.indexOf(q.s) >= 0; });
        if (hotQs.length > 20) return shuffle(hotQs).concat(shuffle(all.filter(function (q) { return hot.indexOf(q.s) < 0; })));
      }
    }
    return shuffle(all);
  }
  function rapidQ() {
    var play = $("arcPlay"); if (!play || M.over) return;
    var q = M.deck[M.round % M.deck.length]; M.round++;
    play.innerHTML = '<div class="arc-q"><div class="arc-qtext">' + esc(q.q) + "</div>" +
      '<div class="arc-opts" id="arcRapidOpts" data-answer="' + q.a + '">' +
      q.o.map(function (o, i) { return '<button type="button" class="arc-opt" onclick="ARC.rpick(' + i + ')">' + esc(o) + "</button>"; }).join("") + "</div></div>";
  }
  function rpick(i) {
    var opts = $("arcRapidOpts"); if (!opts || M.over) return;
    var ans = +opts.getAttribute("data-answer");
    var btns = opts.querySelectorAll(".arc-opt");
    Array.prototype.forEach.call(btns, function (b, k) {
      b.classList.add(k === ans ? "good" : "dim"); if (k === i && i !== ans) b.classList.add("bad"); b.disabled = true;
    });
    if (i === ans) { M.score += 10 + 2 * M.streak; M.streak++; } else M.streak = 0;
    setTimeout(rapidQ, 420);
  }
  function rapidEnd() {
    M.over = true; M.best = M.score;
    xp(M.score); coin(M.score >= 400 ? 1 : 0);
    saveBest("rapid");
    var p = $("arcPlay");
    if (p) p.innerHTML = '<div class="arc-q"><div class="arc-qtext">⏱ Time! ' + M.score + ' pts — ' + (M.round - 1) + ' questions</div>' +
      '<div class="arc-actions"><button type="button" class="arc-btn gold" onclick="ARC.go(\'rapid\')">Go again</button><button type="button" class="arc-btn" onclick="ARC.go(\'open\')">All games</button></div></div>';
  }

  /* ---------- Memory Pairs ---------- */
  function memoGo(opts) {
    var subj = (opts && opts.subj) || M.subj || "Mathematics";
    if (!PAIRS[subj]) subj = Object.keys(PAIRS)[0];
    M.subj = subj; M.moves = 0; M.t0 = Date.now(); M.deck = [];
    var pairs = shuffle(PAIRS[subj]).slice(0, 6);
    var cards = [];
    pairs.forEach(function (p, k) {
      cards.push({ k: k, w: "t", t: p.t });
      cards.push({ k: k, w: "d", t: p.d });
    });
    cards = shuffle(cards);
    M.deck = cards;
    var chips = Object.keys(PAIRS).map(function (s) { return '<button type="button" class="arc-chip' + (s === subj ? " on" : "") + '" onclick="ARC.memoSub(\'' + esc(s).replace(/'/g, "\\'") + '\')">' + esc(s) + "</button>"; }).join("");
    shell("🃏 Memory Pairs — " + subj, '<div class="arc-sub">' + chips + '</div><div class="arc-hud"><span class="arc-pill">Moves ' + M.moves + '</span><span class="arc-pill" id="memoTimer">⏱ 0s</span></div><div class="arc-cards" id="memoGrid"></div>');
    renderCards();
    M.timer = setInterval(function () {
      var mt = $("memoTimer"); if (mt) mt.textContent = "⏱ " + ((Date.now() - M.t0) / 1000 | 0) + "s";
    }, 500);
  }
  function memoSub(s) { M.subj = s; memoGo(); }
  function renderCards() {
    var g = $("memoGrid"); if (!g) return;
    g.innerHTML = M.deck.map(function (c, i) {
      return '<button type="button" class="arc-card" data-i="' + i + '" data-k="' + c.k + '" onclick="ARC.flip(' + i + ')">?</button>';
    }).join("");
  }
  var F1 = null, F2 = null, LOCK = false;
  function flip(i) {
    if (LOCK) return;
    var g = $("memoGrid"); if (!g) return;
    var cards = g.children;
    if (F1 === null) { F1 = i; flipShow(cards, i); return; }
    if (F2 === null && i !== F1) {
      F2 = i; flipShow(cards, i); M.moves++;
      var mv = $("memoMoves"); if (!mv) { }
      var hud = document.querySelectorAll(".arc-pill");
      if (hud[0]) hud[0].textContent = "Moves " + M.moves;
      if (M.deck[F1].k === M.deck[F2].k) {
        cards[F1].classList.add("gone"); cards[F2].classList.add("gone");
        var left = g.querySelectorAll(".arc-card:not(.gone)").length;
        if (left === 0) memoEnd();
        F1 = null; F2 = null;
      } else {
        LOCK = true;
        setTimeout(function () {
          if (M.deck[F1]) { flipShow(cards, F1, true); flipShow(cards, F2, true); }
          F1 = null; F2 = null; LOCK = false;
        }, 750);
      }
    }
  }
  function flipShow(cards, i, hide) {
    var c = cards[i]; if (!c) return;
    c.classList.toggle("up", !hide);
    c.textContent = hide ? "?" : (M.deck[i].w === "t" ? M.deck[i].t : M.deck[i].t);
  }
  function memoEnd() {
    clearInterval(M.timer); M.timer = null;
    var secs = (Date.now() - M.t0) / 1000 | 0;
    M.best = M.moves;
    xp(Math.max(10, 60 - M.moves * 2)); coin(M.moves <= 10 ? 1 : 0);
    saveBest("memo");
    var g = $("memoGrid");
    if (g) { g.style.gridTemplateColumns = "1fr"; g.innerHTML = '<div class="arc-q"><div class="arc-qtext">🃏 All matched in ' + M.moves + ' moves (' + secs + 's)</div>' +
      '<div class="arc-actions"><button type="button" class="arc-btn gold" onclick="ARC.go(\'memo\')">Play again</button><button type="button" class="arc-btn" onclick="ARC.go(\'open\')">All games</button></div></div>'; }
  }

  /* ---------- Ladder Challenge ---------- */
  function ladderGo(opts) {
    var cls = bank(); if (!cls) { toast("The question bank is still loading — try again in a moment", "⏳"); return go("open"); }
    M.deck = shuffle(cls.reduce(function (a, c) { return a.concat(c.questions || []); }, [])).slice(0, 10);
    M.round = 0; M.lives = 3; M.score = 0; M.over = false;
    M.secs = (opts && opts.secs) || 20;
    shell("🪜 Ladder Challenge", '<div class="arc-hud"><span class="arc-pill">Rung ' + (M.round + 1) + "/10</span><span class=\"arc-pill\">Lives ❤❤❤</span><span class=\"arc-pill\">Score " + M.score + "</span><span class=\"arc-pill\" id=\"ladClock\">⏱ 20s</span></div><div id=\"arcPlay\"></div>");
    ladderQ();
  }
  function ladderQ() {
    var play = $("arcPlay"); if (!play || M.over) return;
    var q = M.deck[M.round]; M.round++;
    var per = Math.max(6, M.secs - M.round); /* each rung gets a little tighter */
    M.rungSecs = per;
    var play2 = $("arcPlay");
    play2.innerHTML = '<div class="arc-q"><div class="arc-qtext">' + esc(q.q) + "</div>" +
      '<div class="arc-opts" id="arcLadOpts" data-answer="' + q.a + '">' +
      q.o.map(function (o, i) { return '<button type="button" class="arc-opt" onclick="ARC.lpick(' + i + ')">' + esc(o) + "</button>"; }).join("") + "</div></div>";
    M.ladT = Date.now();
    if (M.timer) clearInterval(M.timer);
    M.timer = setInterval(function () {
      var left = Math.max(0, per - ((Date.now() - M.ladT) / 1000 | 0));
      var c = $("ladClock"); if (c) c.textContent = "⏱ " + left + "s";
      if (left <= 0) { clearInterval(M.timer); M.timer = null; ladderMiss(true); }
    }, 1000);
  }
  function lpick(i) {
    if (M.over) return;
    clearInterval(M.timer); M.timer = null;
    var opts = $("arcLadOpts"); if (!opts) return;
    var ans = +opts.getAttribute("data-answer");
    if (i === ans) { M.score += 10 + M.round; }
    else ladderMiss(false);
    if (i === ans) setTimeout(ladderNext, 420);
  }
  function ladderMiss(timeup) {
    if (M.over) return;
    M.lives--;
    var hud = document.querySelectorAll(".arc-pill");
    if (hud[1]) hud[1].textContent = "Lives " + "❤".repeat(Math.max(0, M.lives)) + "🖤".repeat(3 - Math.max(0, M.lives));
    if (M.lives <= 0) { M.over = true; ladderEnd(); return; }
    setTimeout(ladderNext, 500);
  }
  function ladderNext() {
    if (M.over) return;
    if (M.round >= 10) return ladderEnd();
    var hud = document.querySelectorAll(".arc-pill");
    if (hud[0]) hud[0].textContent = "Rung " + (M.round + 1) + "/10";
    ladderQ();
  }
  function ladderEnd() {
    M.over = true; M.best = M.round;
    xp(M.score); coin(M.round >= 8 ? 1 : 0);
    saveBest("ladder");
    var p = $("arcPlay");
    if (p) p.innerHTML = '<div class="arc-q"><div class="arc-qtext">' + (M.lives > 0 ? "🏁 You climbed " + M.round + " rungs!" : "💀 Out of lives at rung " + M.round) + " — " + M.score + " pts</div>" +
      '<div class="arc-actions"><button type="button" class="arc-btn gold" onclick="ARC.go(\'ladder\')">Climb again</button><button type="button" class="arc-btn" onclick="ARC.go(\'open\')">All games</button></div></div>';
  }

  /* ---------- Video Studio ---------- */
  function vidRoute() {
    M.mode = "videos";
    var custom = store(CUSTOM_VID); if (!Array.isArray(custom)) custom = [];
    var all = VIDEOS.concat(custom);
    var subs = [];
    all.forEach(function (v) { if (v.s && subs.indexOf(v.s) < 0) subs.push(v.s); });
    subs.sort();
    var chips = ['<button type="button" class="arc-chip on" id="vidAll">All subjects</button>']
      .concat(subs.map(function (s) { return '<button type="button" class="arc-chip" data-s="' + esc(s) + '">' + esc(s) + "</button>"; })).join("");
    shell("🎬 Video Studio — lessons on demand", "" +
      '<div class="arc-sub" id="vidChips">' + chips + "</div>" +
      '<div class="arc-add"><input id="vidUrl" placeholder="Paste a YouTube link (watch?v=…, youtu.be/…)" aria-label="Video link"><input id="vidTitle" placeholder="Video title" aria-label="Video title"><button type="button" class="arc-btn" onclick="ARC.addVideo()" id="vidAdd">＋ Add video</button></div>' +
      '<p class="arc-note">Videos stream online (the app saves your list but not the video). Offline? The quiz games and lesson notes still work — videos need internet. Miss your class\'s videos? Paste a link above and they are saved on this device.</p>' +
      '<div id="vidList">' + vidList(all, "") + "</div>" +
      '<h4 style="margin:16px 0 8px;font-size:.95rem">📺 Trusted Nigerian lesson channels</h4>' +
      '<div class="arc-pairs">' + CHANNELS.map(function (c) {
        return '<div class="arc-pair"><b>' + esc(c.t) + "</b> — " + esc(c.d) + ' <a href="' + esc(c.u) + '" target="_blank" rel="noopener" style="color:#8a6d1f;font-weight:800">Open channel ↗</a></div>';
      }).join("") + "</div>");
    var chipsEl = $("vidChips");
    if (chipsEl) {
      Array.prototype.forEach.call(chipsEl.querySelectorAll(".arc-chip"), function (b) {
        b.onclick = function () {
          Array.prototype.forEach.call(chipsEl.querySelectorAll(".arc-chip"), function (x) { x.classList.remove("on"); });
          b.classList.add("on");
          var s = b.getAttribute("data-s") || "";
          $("vidList").innerHTML = vidList(all, s);
        };
      });
    }
  }
  function vidList(all, s) {
    var list = all.filter(function (v) { return !s || v.s === s; });
    if (!list.length) return '<p class="arc-note">No videos in this subject yet — add one above or choose another subject.</p>';
    return list.map(function (v) {
      return '<div class="arc-vid">' +
        (M.nowPlaying === v.id ? '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(v.id) + '?autoplay=1" title="' + esc(v.t) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' : "") +
        '<h4>' + esc(v.t) + "</h4><small>" + esc(v.s) + " · " + esc(v.c) + " · " + esc(v.ch || "You") + "</small><div style=\"margin-top:8px\">" +
        '<button type="button" class="arc-play" onclick="ARC.watch(\'' + esc(v.id) + '\')">▶ Watch</button>' +
        (v.user ? '<button type="button" class="arc-btn" style="min-height:34px;padding:4px 12px" onclick="ARC.delVideo(\'' + esc(v.id) + '\')">Remove</button>' : "") +
        "</div></div>";
    }).join("");
  }
  function watch(id) { M.nowPlaying = id; vidRoute(); }
  function youtubeId(url) {
    var m = String(url || "").match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,20})/);
    return m ? m[1] : null;
  }
  function addVideo() {
    var u = $("vidUrl"), t = $("vidTitle");
    var id = youtubeId(u && u.value);
    if (!id) return toast("That does not look like a YouTube link", "⚠️");
    var title = (t && t.value.trim()) || "My video";
    var custom = store(CUSTOM_VID); if (!Array.isArray(custom)) custom = [];
    custom = custom.filter(function (v) { return v.id !== id; });
    custom.unshift({ t: title, s: "My videos", c: "SS1–SS3", id: id, ch: "You", user: 1 });
    store(CUSTOM_VID, custom);
    toast("Video saved to your list", "🎬");
    vidRoute();
  }
  function delVideo(id) {
    var custom = store(CUSTOM_VID); if (!Array.isArray(custom)) return;
    custom = custom.filter(function (v) { return v.id !== id; });
    store(CUSTOM_VID, custom);
    vidRoute();
  }

  /* ---------- Curriculum Hub ---------- */
  function hubRoute() {
    M.mode = "hub";
    var subs = Object.keys(PAIRS).sort();
    shell("🗺 Curriculum Hub — every SS1–SS3 subject", "" +
      '<p style="font-size:.8rem;color:var(--mut,#8a7a5e);margin:0 0 10px">All ' + subs.length + ' subjects of the Senior Secondary curriculum with lesson notes, worked examples and evaluation questions — tap a subject to open its lesson notes in the Teaching Suite.</p>' +
      '<div class="arc-grid">' + subs.map(function (s) {
        return '<button type="button" class="arc-tile" onclick="ARC.lesson(\'' + esc(s).replace(/'/g, "\\'") + '\')"><span>📘</span><b>' + esc(s) + "</b><small>Lesson notes · worked examples · evaluation</small></button>";
      }).join("") + "</div>");
  }
  function lesson(s) {
    try {
      if (window.EDU && EDU.ready) { EDU.subject(s); EDU.go("notes"); close(); return; }
      if (window.edu) { edu("notes"); setTimeout(function () { try { EDU.subject(s); EDU.go("notes"); } catch (e) {} }, 600); close(); return; }
    } catch (e) {}
    toast("Lesson notes are loading — tap the Teaching Suite button", "📘");
  }

  /* ---------- boot ---------- */
  var CSSID = "arcCss";
  try {
    if (!$("arcCss")) { var st = document.createElement("style"); st.id = CSSID; st.textContent = CSS; document.head.appendChild(st); }
  } catch (e) {}

  window.ARC = {
    ready: true,
    go: go,
    close: close,
    pick: pick, rpick: rpick, flip: flip, lpick: lpick,
    termSub: termSub, memoSub: memoSub,
    watch: watch, addVideo: addVideo, delVideo: delVideo,
    lesson: lesson,
    _state: function () { return M; }
  };
  window.ARC.ready = true;
})();
