/* v12.0 suite — Teaching Suite extended subjects + Study Arcade + Video Studio.
   Run: node quiz/test_arcade.js  (repo root; jsdom) */
const fs = require("fs");
const { JSDOM, VirtualConsole } = require("jsdom");
const HTML = fs.readFileSync("index.html", "utf8");
const BANK = fs.readFileSync("bank.js", "utf8");
const EDU = fs.readFileSync("edu.js", "utf8");
const ARC = fs.readFileSync("arcade.js", "utf8");
let fails = 0;
const run = async (label, fn) => { try { await fn(); console.log("PASS:", label); } catch (e) { fails++; console.log("FAIL:", label, "->", String(e && e.message || e).slice(0, 180)); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

function dom(seed) {
  const html = HTML.replace('<script src="bank.js"></script>', "<script>" + BANK + "</script>");
  const vc = new VirtualConsole(); vc.on("jsdomError", () => {});
  const d = new JSDOM(html, {
    runScripts: "dangerously", url: "https://nssc-quiz.test/", pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(window) {
      for (const k in (seed || {})) { try { window.localStorage.setItem(k, seed[k]); } catch (e) {} }
      window.DecompressionStream = globalThis.DecompressionStream;
      window.TextDecoder = globalThis.TextDecoder;
      window.TextEncoder = globalThis.TextEncoder;
      const vp = new Proxy(function(){}, { get: (t, p) => (p === Symbol.toPrimitive ? () => "" : vp), apply: () => vp, set: () => true });
      window.HTMLCanvasElement.prototype.getContext = () => vp;
      window.speechSynthesis = { cancel() {}, speak() {}, getVoices() { return [{ lang: "en-GB" }]; } };
      window.SpeechSynthesisUtterance = function (t) { this.text = t; };
      window.scrollTo = () => {};
      window.matchMedia = window.matchMedia || (() => ({ matches: false }));
    }
  });
  const w = d.window; const errs = [];
  w.addEventListener("error", e => errs.push(String(e.message || "e").slice(0, 120)));
  w.addEventListener("unhandledrejection", e => errs.push(String(e.reason || "r").slice(0, 120)));
  return { w, doc: w.document, errs };
}
const badText = /NaN|undefined\b|Infinity/;

(async () => {
  const { w, doc, errs } = dom();
  await sleep(500);
  w.eval('document.getElementById("gateName").value="A B";document.getElementById("gateEmail").value="a@b.c";gateSignUp();');

  await run("launcher buttons styled (edu-launcher + arc-launcher, 40px)", () => {
    const e = doc.getElementById("eduLaunch"), a = doc.getElementById("arcLaunch");
    if (!e || e.className !== "edu-launcher") throw "eduLauncher class";
    if (!a || a.className !== "arc-launcher") throw "arcLauncher class";
    const css = (doc.getElementById("arcLaunchCss") || { textContent: "" }).textContent;
    if (!/min-height:40px/.test(css)) throw "arc launcher css missing min-height";
  });

  w.eval(EDU);
  await run("edu: subject list = 19 (13 + 6 extended)", async () => {
    w.eval('EDU.go("notes")');
    await sleep(120);
    const sel = doc.getElementById("eduSub");
    if (!sel || sel.options.length !== 19) throw "options=" + (sel && sel.options.length);
  });
  for (const [subj, probe] of [
    ["Further Mathematics", "Sets & Logic"],
    ["Christian Religious Studies", "Genesis"],
    ["Islamic Religious Studies", "Qur'an"],
    ["Data Processing", "ICT"],
    ["Food & Nutrition", "Nutrients"],
    ["French", "Les Articles"],
  ]) {
    await run(`edu notes: ${subj} lesson renders`, async () => {
      w.eval(`EDU.subject(${JSON.stringify(subj)}); EDU.go("notes");`);
      await sleep(90);
      const l = (doc.getElementById("eduLesson") || { textContent: "" }).textContent;
      const wk = (doc.getElementById("eduWork") || { textContent: "" }).textContent;
      if (!l.includes(probe)) throw "topic missing";
      if (!/Worked examples|Class evaluation/.test(wk)) throw "no evaluation block";
      if (!/edu-qtext/.test(doc.getElementById("eduWork").innerHTML)) throw "no questions";
    });
  }
  await run("edu: extended notes show no NaN/undefined", () => {
    const t = doc.getElementById("eduLesson").textContent + doc.getElementById("eduWork").textContent;
    if (badText.test(t)) throw "bad text in lesson";
  });

  w.eval(ARC);
  await run("arc: loads, home shows 8 tiles", async () => {
    w.eval('ARC.go("open")');
    await sleep(120);
    if (!w.ARC || !w.ARC.ready) throw "ARC not ready";
    if (doc.querySelectorAll(".arc-tile").length !== 8) throw "tiles=" + doc.querySelectorAll(".arc-tile").length;
    if (!doc.getElementById("arcOv")) throw "no overlay";
  });

  const xpBefore = (() => { const k = Object.keys(w.localStorage).find(x => x.indexOf("nssc_xp_") === 0); return k ? +w.localStorage.getItem(k) : 0; })();
  await run("arc: Term Match 10 rounds -> result + XP", async () => {
    w.eval('ARC.go("term",{subj:"Mathematics"})');
    await sleep(100);
    for (let i = 0; i < 10; i++) {
      const o = doc.getElementById("arcTermOpts"); if (!o) break;
      w.eval("ARC.pick(" + (+o.getAttribute("data-answer")) + ")");
      await sleep(680);
    }
    const p = doc.getElementById("arcPlay").textContent;
    if (!/Final score/.test(p)) throw "no result screen";
    const k = Object.keys(w.localStorage).find(x => x.indexOf("nssc_xp_") === 0);
    const now = k ? +w.localStorage.getItem(k) : 0;
    if (now <= xpBefore) throw "xp not awarded";
  });
  await run("arc: Rapid Fire (2s) runs and ends", async () => {
    w.eval('ARC.go("rapid",{secs:2})');
    await sleep(250);
    const o = doc.getElementById("arcRapidOpts");
    if (o) w.eval("ARC.rpick(" + (+o.getAttribute("data-answer")) + ")");
    await sleep(2500);
    if (!/Time!/.test(doc.getElementById("arcPlay").textContent)) throw "no time-up screen";
  });
  await run("arc: Memory Pairs solvable, records moves", async () => {
    w.eval('ARC.go("memo",{subj:"Physics"})');
    await sleep(180);
    for (let r = 0; r < 8; r++) {
      const cs = doc.querySelectorAll("#memoGrid .arc-card");
      let a = -1, b = -1;
      for (let i = 0; i < cs.length; i++) {
        if (cs[i].classList.contains("gone")) continue;
        for (let j = i + 1; j < cs.length; j++) {
          if (cs[j].classList.contains("gone")) continue;
          if (cs[i].getAttribute("data-k") === cs[j].getAttribute("data-k")) { a = i; b = j; break; }
        }
        if (a >= 0) break;
      }
      if (a < 0) break;
      w.eval("ARC.flip(" + a + ")"); w.eval("ARC.flip(" + b + ")"); await sleep(820);
    }
    const gridTxt = (doc.getElementById("memoGrid") || { textContent: "" }).textContent;
    if (!/All matched/.test(gridTxt)) throw "not solved: " + gridTxt.slice(0, 60);
  });
  await run("arc: Ladder Challenge plays to the end", async () => {
    w.eval('ARC.go("ladder")');
    await sleep(200);
    let n = 0;
    for (let i = 0; i < 12; i++) {
      const o = doc.getElementById("arcLadOpts"); if (!o) break;
      w.eval("ARC.lpick(" + (+o.getAttribute("data-answer")) + ")"); n++;
      await sleep(560);
    }
    const p = doc.getElementById("arcPlay").textContent;
    if (!/rungs|Out of lives/.test(p)) throw "no end screen (played " + n + ")";
  });

  await run("arc: Video Studio renders curated list + channels", async () => {
    w.eval('ARC.go("videos")');
    await sleep(120);
    if (doc.querySelectorAll("#vidList .arc-vid").length < 4) throw "videos < 4";
    if (doc.querySelectorAll(".arc-pair").length < 4) throw "channels < 4";
  });
  await run("arc: watch() opens embedded player", async () => {
    w.eval('ARC.watch("U_cHam0p4UE")');
    await sleep(150);
    const f = doc.querySelector("#vidList iframe");
    if (!f || f.src.indexOf("youtube-nocookie.com/embed/U_cHam0p4UE") < 0) throw "bad iframe";
  });
  await run("arc: addVideo parses link + saves to device list", async () => {
    doc.getElementById("vidUrl").value = "https://youtu.be/abcDEF12345";
    doc.getElementById("vidTitle").value = "My trial lesson";
    w.eval('ARC.addVideo()');
    await sleep(120);
    const list = doc.getElementById("vidList").textContent;
    if (!/My trial lesson/.test(list)) throw "custom video not listed";
  });
  await run("arc: corrupt nssc_videos_a does not crash the studio", async () => {
    w.localStorage.setItem("nssc_videos_a", '{"broken');
    w.eval('ARC.go("videos")');
    await sleep(100);
    if (!doc.getElementById("vidList")) throw "no vidList";
  });
  await run("arc: Curriculum Hub lists all 19 subjects", async () => {
    w.eval('ARC.go("hub")');
    await sleep(120);
    if (doc.querySelectorAll(".arc-tile").length !== 19) throw "tiles=" + doc.querySelectorAll(".arc-tile").length;
  });
  await run("arc: lesson() deep-links to Teaching Suite without throwing", async () => {
    w.eval('ARC.lesson("Physics")');
    await sleep(120);
  });
  await run("arc: junk nssc_arc_a storage keeps games alive", async () => {
    w.localStorage.setItem("nssc_arc_a", '{"broken');
    w.eval('ARC.go("open")');
    await sleep(100);
    w.eval('ARC.go("term",{subj:"English Language"})');
    await sleep(120);
    if (!doc.getElementById("arcTermOpts")) throw "term failed with junk bests";
  });

  // ---- v12: UTME Simulation + Flash Cards + 19-subject Rapid Fire ----
  await run("utme: picker locks English + 13 bank subjects", async () => {
    w.eval('ARC.go("utme")');
    await sleep(150);
    if (doc.querySelectorAll("#utmeSubs .arc-chip").length !== 13) throw "chips";
    if (doc.querySelectorAll("#utmeSubs [data-lock]").length !== 1) throw "no compulsory lock";
  });
  await run("utme: full 180-question paper -> 400/400 + verdict + XP", async () => {
    w.eval('ARC.utmeStart({subjects:["English Language","Mathematics","Physics","Chemistry"]})');
    await sleep(300);
    const ut = w.ARC._ut();
    if (!ut || ut.paper.length !== 180) throw "paper=" + (ut && ut.paper.length);
    if (doc.querySelectorAll("#utSheet .arc-cell").length !== 180) throw "no answer sheet";
    for (let i = 0; i < ut.paper.length; i++) w.eval("ARC.utmeSet(" + i + "," + (+ut.paper[i].q.a) + ")");
    if (ut.ans.some(a => a < 0)) throw "unanswered left";
    w.eval("ARC.utmeSubmit(false)");
    await sleep(160);
    const txt = doc.getElementById("arcBody").textContent.replace(/\s+/g, " ");
    if (!/400 \/ 400/.test(txt)) throw "total: " + txt.slice(0, 80);
    if (!/Outstanding/.test(txt)) throw "no verdict";
    if (!/Physics · 40\/40/.test(txt)) throw "no per-subject row";
    const k = Object.keys(w.localStorage).find(x => x.indexOf("nssc_xp_") === 0);
    if (k && +w.localStorage.getItem(k) <= 0) throw "no xp";
  });
  await run("utme: per-subject review shows answers + explanations", async () => {
    w.eval('ARC.utmeReview("Physics")');
    await sleep(160);
    const txt = doc.getElementById("arcBody").textContent;
    if ((txt.match(/✔/g) || []).length < 30) throw "not enough marked answers";
    if (!/arc-opt good|arc-opt bad|arc-opt dim/.test(doc.getElementById("arcBody").innerHTML)) throw "no marking classes";
  });
  await run("utme: auto-submit at time zero", async () => {
    w.eval('ARC.go("utme")'); await sleep(120);
    w.eval('ARC.utmeStart({subjects:["English Language","Mathematics","Biology","Economics"],secs:2})');
    await sleep(300);
    if (!w.ARC._ut() || w.ARC._ut().over) throw "ended too early";
    await sleep(2400);
    if (!w.ARC._ut().over) throw "not auto-submitted";
    if (!/Your UTME score/.test(doc.getElementById("arcBody").textContent)) throw "no result";
  });
  await run("cards: 19-subject chips + deck renders term-first", async () => {
    w.eval('ARC.go("cards",{subj:"French"})');
    await sleep(140);
    if (doc.querySelectorAll("#cardSubs .arc-chip").length !== 19) throw "chips";
    const cd = w.ARC._cd();
    if (!cd || cd.deck.length !== 6) throw "deck=" + (cd && cd.deck.length);
    if (!/Show answer/.test(doc.getElementById("arcPlay").textContent)) throw "no card";
  });
  await run("cards: flip -> rate all -> deck done + persistence", async () => {
    w.eval('ARC.go("cards",{subj:"French"})'); await sleep(120);
    let guard = 0;
    while (guard++ < 10) {
      const play = doc.getElementById("arcPlay");
      if (!play || /Deck done/.test(play.textContent)) break;
      w.eval("ARC.cardFlip()");
      w.eval("ARC.cardRate(1)");
      await sleep(25);
    }
    if (!/Deck done/.test(doc.getElementById("arcPlay").textContent)) throw "no deck end";
    const saved = JSON.parse(w.localStorage.getItem("nssc_cards_a") || "{}");
    if (!saved.French || saved.French.length !== 6) throw "not persisted";
    if (!/knew it/.test(doc.getElementById("arcPlay").textContent)) throw "no summary";
  });
  await run("cards: known cards re-queued last after restart", async () => {
    w.eval('ARC.cardRestart()'); await sleep(60);
    const cd = w.ARC._cd();
    if (!cd || cd.deck.length !== 6) throw "no deck";
    if (cd.deck[0].fresh) throw "known card not re-queued last";
  });
  await run("rapid: subject chips = All + 19 subjects", async () => {
    w.eval('ARC.go("rapid")'); await sleep(140);
    if (doc.querySelectorAll("#arcRSubs .arc-chip").length !== 20) throw "chips=" + doc.querySelectorAll("#arcRSubs .arc-chip").length;
  });
  await run("rapid: extended subject (French) playable", async () => {
    w.eval('ARC.go("rapid",{subj:"French",secs:999})'); await sleep(250);
    const o = doc.getElementById("arcRapidOpts");
    if (!o) throw "no question for French";
    w.eval("ARC.rpick(" + (+o.getAttribute("data-answer")) + ")");
    await sleep(620);
    if (!(w.ARC._state().score > 0)) throw "score=" + w.ARC._state().score;
    if (!/Score [1-9]/.test(doc.getElementById("arcBody").textContent)) throw "score pill not updated";
    w.eval('ARC.go("open")');
  });
  await run("edu: read-aloud button + speak() works and header says 19 subjects", async () => {
    w.eval('EDU.subject("Further Mathematics"); EDU.go("notes");');
    await sleep(150);
    const l = doc.getElementById("eduLesson");
    if (!l || !/Hear this lesson/.test(l.textContent)) throw "no speak button";
    w.eval("EDU.speak()"); await sleep(50);
    w.eval("EDU.speak()"); await sleep(50);
    w.eval("EDU.stopSpeak()"); await sleep(30);
    const brand = doc.querySelector(".edu-brand small");
    if (!brand || !/all 19 subjects/.test(brand.textContent)) throw "header: " + (brand && brand.textContent);
    if (/all 13 subjects/.test(brand.textContent)) throw "stale 13";
  });
  await run("no uncaught errors across the whole v12 flow", () => {
    if (errs.length) throw errs.join(";").slice(0, 140);
    let hits = 0;
    doc.querySelectorAll("body *").forEach(el => {
      if (/^(SCRIPT|STYLE)$/.test(el.tagName)) return;
      if (el.children.length === 0 && el.textContent && /NaN/.test(el.textContent)) hits++;
    });
    if (hits > 0) throw "NaN in rendered text x" + hits;
  });

  console.log(fails ? `\n${fails} FAIL` : "\nALL v12 CHECKS PASSED");
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error("suite crashed:", e); process.exit(2); });
