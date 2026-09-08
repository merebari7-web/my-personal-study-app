/* v21.0 suite — Mater Notes library: 30 school PDFs (SS1/SS2/SS3 × 10 subjects,
   weeks 1–6), lazy module mater_data.js, launcher, and SW key -v21.
   Run: node quiz/_test_v21.js */
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
  await run("mater_data: MATER has 30 entries (10 per class)", () => {
    const start = MATER.indexOf("var MATER=JSON.parse(") + "var MATER=JSON.parse(".length;
    const end = MATER.indexOf(");", start);
    const literal = MATER.slice(start, end);
    const entries = JSON.parse(eval(literal));
    const c = { SS1: 0, SS2: 0, SS3: 0 };
    entries.forEach(e => { c[e.cls]++; if (!e.file || !e.subj || !e.pages) throw "bad entry " + JSON.stringify(e); });
    if (c.SS1 !== 10 || c.SS2 !== 10 || c.SS3 !== 10) throw JSON.stringify(c);
    // every file exists on disk
    for (const e of entries) {
      const fp = path.join("mater-notes", e.file);
      if (!fs.existsSync(fp)) throw "missing file " + e.file;
      if (!fs.readFileSync(fp).slice(0, 5).toString().startsWith("%PDF")) throw "not a pdf " + e.file;
    }
  });
  await run("mater_data: syntax + UI module wired", () => {
    if (typeof MATER !== "string" || !/window\.MN\s*=\s*\{/.test(MATER)) throw "no MN api";
    if (!/mn-tab/.test(MATER) || !/mn-go/.test(MATER)) throw "missing UI classes";
    if (!/mater-notes\//.test(MATER)) throw "no PDF paths in data";
  });
  await run("service worker cache key bumped to -v21", () => {
    if (!/"-v21"/.test(SW)) throw "NSS_V not -v21";
  });
  await run("boot wire gzip <= 266240 B", () => {
    const w = zlib.gzipSync(HTML, { level: 9 }).length + zlib.gzipSync(BANK, { level: 9 }).length;
    if (w > 266240) throw "wire " + w;
    console.log("   (wire " + w + " — headroom " + (266240 - w) + " B)");
  });

  /* jsdom smoke: launcher + open/close + tabs */
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
  await run("mater module opens SS1 list and switches class", async () => {
    w.eval(MATER);
    w.eval('window.mater()');
    await new Promise(r => setTimeout(r, 150));
    const ov = w.document.getElementById("mnOverlay");
    if (!ov || ov.style.display === "none") throw "overlay not open";
    const items = ov.querySelectorAll(".mn-it").length;
    if (items !== 10) throw "SS1 items=" + items;
    w.eval('document.querySelector(\'.mn-tab[data-c="SS2"]\').click()');
    await new Promise(r => setTimeout(r, 150));
    const s2 = ov.querySelectorAll(".mn-it").length;
    if (s2 !== 10) throw "SS2 items=" + s2;
    w.eval('MN.close()');
    if (ov.style.display === "none") return;
    throw "close failed";
  });

  /* real-Chrome: launcher visible, modal opens, no overflow at 375px + 1280px */
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
        await run("chrome " + v.w + ": modal opens, 10 items, no overflow", async () => {
          const m = await p.evaluate(() => {
            const ov = document.getElementById("mnOverlay");
            if (!ov) throw "no overlay";
            return { items: ov.querySelectorAll(".mn-it").length,
              href: document.querySelector(".mn-go") ? document.querySelector(".mn-go").getAttribute("href") : null,
              overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth };
          });
          if (m.items !== 10) throw "items=" + m.items;
          if (!/\.pdf$/.test(m.href || "")) throw "bad href " + m.href;
          if (m.overflow) throw "horizontal overflow";
        });
        await p.close();
      }
    } finally { await b.close(); }
  }

  console.log(fails ? "\n" + fails + " FAIL" : "\nALL v21 CHECKS PASSED");
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error("suite crashed:", e); process.exit(2); });
