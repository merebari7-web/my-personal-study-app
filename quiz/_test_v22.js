/* v22.0 suite — Mater Notes library now carries BOTH terms: 60 school PDFs
   (SS1/SS2/SS3 × 10 subjects × First Term weeks 1-6 + Second Term weeks 7-12),
   lazy module mater_data.js with the First/Second Term toggle, launcher, and
   SW key -v22.
   Run: node quiz/_test_v22.js */
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");
const HTML = fs.readFileSync("index.html", "utf8");
const BANK = fs.readFileSync("bank.js", "utf8");
const SW = fs.readFileSync("sw.js", "utf8");
const MATER = fs.readFileSync("quiz/mater_data.js", "utf8");
let fails = 0;
const run = async (label, fn) => { try { await fn(); console.log("PASS:", label); } catch (e) { fails++; console.log("FAIL:", label, "->", String(e && e.message || e).slice(0, 220)); } };

(async () => {
  await run("shell: mater launcher + loader ship", () => {
    if (!/window\.mater=function/.test(HTML)) throw "no loader";
    if (!/id="materLaunch"/.test(HTML)) throw "no launcher button";
    if (!/quiz\/mater_data\.js/.test(HTML)) throw "no module path";
  });
  await run("mater_data: MATER has 60 entries (20 per class, 10 per term)", () => {
    const start = MATER.indexOf("var MATER=JSON.parse(") + "var MATER=JSON.parse(".length;
    const end = MATER.indexOf(");", start);
    const entries = JSON.parse(eval(MATER.slice(start, end)));
    const c = { SS1: 0, SS2: 0, SS3: 0 }, t = { first: 0, second: 0 };
    entries.forEach(e => {
      c[e.cls]++;
      if (/Second\s*Term/i.test(e.weeks)) t.second++; else t.first++;
      if (!e.file || !e.subj || !e.pages) throw "bad entry " + JSON.stringify(e);
    });
    if (c.SS1 !== 20 || c.SS2 !== 20 || c.SS3 !== 20) throw JSON.stringify(c);
    if (t.first !== 30 || t.second !== 30) throw JSON.stringify(t);
    for (const e of entries) {
      const fp = path.join("mater-notes", e.file);
      if (!fs.existsSync(fp)) throw "missing file " + e.file;
      if (!fs.readFileSync(fp).slice(0, 5).toString().startsWith("%PDF")) throw "not a pdf " + e.file;
    }
  });
  await run("mater_data: term toggle UI present in module", () => {
    if (!/data-t="T1"/.test(MATER) || !/data-t="T2"/.test(MATER)) throw "no term buttons";
    if (!/Second Term 2026\/2027 · Weeks 7–12|Second Term 2026\/2027/.test(MATER)) throw "no term label";
    if (!/window\.MN\s*=\s*\{/.test(MATER)) throw "no MN api";
    if (!/mn-terms/.test(MATER)) throw "no terms css";
  });
  await run("service worker cache key bumped to -v22", () => {
    if (!/"-v22"/.test(SW)) throw "NSS_V not -v22";
  });
  await run("boot wire gzip <= 266240 B", () => {
    const w = zlib.gzipSync(HTML, { level: 9 }).length + zlib.gzipSync(BANK, { level: 9 }).length;
    if (w > 266240) throw "wire " + w;
    console.log("   (wire " + w + " — headroom " + (266240 - w) + " B)");
  });

  /* jsdom smoke: launcher + open/close + class tabs + term toggle */
  const html = HTML.replace('<script src="bank.js"></script>', "<script>" + BANK + "</script>");
  const vc = new VirtualConsole(); vc.on("jsdomError", () => {});
  const d = new JSDOM(html, { runScripts: "dangerously", url: "https://nssc-quiz.test/", pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(window) {
      window.DecompressionStream = globalThis.DecompressionStream; window.TextDecoder = globalThis.TextDecoder; window.TextEncoder = globalThis.TextEncoder;
      const vp = new Proxy(function(){}, { get: (t, p) => (p === Symbol.toPrimitive ? () => "" : vp), apply: () => vp, set: () => true });
      window.HTMLCanvasElement.prototype.getContext = () => vp;
      window.speechSynthesis = { cancel() {}, speak() {}, getVoices() { return [{ lang: "en-GB" }]; } };
      window.SpeechSynthesisUtterance = function (t) { this.text = t; };
      window.scrollTo = () => {}; window.matchMedia = window.matchMedia || (() => ({ matches: false }));
    } });
  const w = d.window;
  await new Promise(r => setTimeout(r, 600));
  await run("shell boots errorless", () => {
    if (!w.document.getElementById("materLaunch")) throw "no launcher";
    if (!w.document.getElementById("aiGrid")) throw "no coach";
  });
  await run("mater module opens First Term SS1 (10 items) and toggles to Second Term", async () => {
    w.eval(MATER);
    w.eval('window.mater()');
    await new Promise(r => setTimeout(r, 150));
    const ov = w.document.getElementById("mnOverlay");
    if (!ov || ov.style.display === "none") throw "overlay not open";
    let items = ov.querySelectorAll(".mn-it").length;
    if (items !== 10) throw "SS1 First items=" + items;
    let href = ov.querySelector(".mn-go").getAttribute("href");
    if (!/WK 1-6\.pdf$/.test(decodeURIComponent(href))) throw "bad first-term href " + href;
    w.eval('document.querySelector(\'.mn-terms button[data-t="T2"]\').click()');
    await new Promise(r => setTimeout(r, 150));
    items = ov.querySelectorAll(".mn-it").length;
    if (items !== 10) throw "SS1 Second items=" + items;
    href = ov.querySelector(".mn-go").getAttribute("href");
    if (!/WK 7-12\.pdf$/.test(decodeURIComponent(href))) throw "bad second-term href " + href;
    const lbl = w.document.getElementById("mnTermLbl").textContent;
    if (!/Second Term/.test(lbl)) throw "label not updated: " + lbl;
    w.eval('document.querySelector(\'.mn-tab[data-c="SS2"]\').click()');
    await new Promise(r => setTimeout(r, 150));
    items = ov.querySelectorAll(".mn-it").length;
    if (items !== 10) throw "SS2 Second items=" + items;
    w.eval('document.querySelector(\'.mn-terms button[data-t="T1"]\').click()');
    await new Promise(r => setTimeout(r, 150));
    items = ov.querySelectorAll(".mn-it").length;
    if (items !== 10) throw "SS2 First items=" + items;
    w.eval('MN.close()');
    if (ov.style.display === "none") return;
    throw "close failed";
  });

  /* real-Chrome: launcher visible, modal opens, term toggle works, no overflow */
  let puppeteer = null;
  try { puppeteer = require("puppeteer"); } catch (e) {}
  if (puppeteer) {
    const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
    try {
      for (const v of [{ w: 375, h: 667 }, { w: 1280, h: 800 }]) {
        const p = await b.newPage();
        await p.setViewport({ width: v.w, height: v.h });
        await p.goto("file://" + process.cwd() + "/index.html", { waitUntil: "load" });
        await p.waitForFunction(() => typeof CLASSES !== "undefined", { timeout: 20000 }).catch(() => {});
        await p.evaluate(() => { document.getElementById("gateName").value = "A B"; document.getElementById("gateEmail").value = "a@b.c"; gateSignUp(); });
        await new Promise(r => setTimeout(r, 700));
        await p.evaluate(MATER);
        await p.evaluate(() => document.getElementById("materLaunch").click());
        await new Promise(r => setTimeout(r, 400));
        await run("chrome " + v.w + ": modal opens, term toggle, no overflow", async () => {
          const m = await p.evaluate(() => {
            const ov = document.getElementById("mnOverlay");
            if (!ov) throw "no overlay";
            const firstHref = document.querySelector(".mn-go").getAttribute("href");
            document.querySelector('.mn-terms button[data-t="T2"]').click();
            return new Promise(res => setTimeout(() => {
              res({ items: ov.querySelectorAll(".mn-it").length,
                href: document.querySelector(".mn-go").getAttribute("href"),
                lbl: document.getElementById("mnTermLbl").textContent,
                firstHref,
                overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth });
            }, 250));
          });
          if (m.items !== 10) throw "items=" + m.items;
          if (!/WK 7-12\.pdf$/.test(decodeURIComponent(m.href))) throw "second-term href " + m.href;
          if (!/WK 1-6\.pdf$/.test(decodeURIComponent(m.firstHref))) throw "first-term href " + m.firstHref;
          if (!/Second Term/.test(m.lbl)) throw "label " + m.lbl;
          if (m.overflow) throw "horizontal overflow";
        });
        await p.close();
      }
    } finally { await b.close(); }
  }

  console.log(fails ? "\n" + fails + " FAIL" : "\nALL v22 CHECKS PASSED");
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error("suite crashed:", e); process.exit(2); });
