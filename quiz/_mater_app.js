/* v22.0 — Mater Notes library (lazy module). Uses window.MATER (data array
   injected by quiz/_mater_build.py from the PDFs in mater-notes/). Creates its
   own overlay modal with class tabs, a First/Second Term toggle and
   downloadable/printable PDF cards (60 files: 30 per term). */
(function () {
  "use strict";
  if (window.MN) return;
  window.MN = { open: open, close: close };

  var CSS =
    ".mn-head{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:16px 18px 12px;border-bottom:1px solid rgba(201,162,39,.35)}" +
    ".mn-hico{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#e7c873,#b8912f);font-size:1.4rem;box-shadow:0 10px 22px -10px rgba(184,145,47,.8)}" +
    ".mn-htx{flex:1;min-width:0}.mn-htx h3{font-size:1.05rem;margin:0}.mn-htx small{color:var(--mut);font-size:.75rem}" +
    ".mn-x{background:none;border:1px solid var(--card-border);border-radius:10px;padding:7px 12px;cursor:pointer;color:var(--ink);font-family:inherit;font-size:.85rem}" +
    ".mn-tabs{display:flex;gap:8px;padding:14px 18px 4px;flex-wrap:wrap}" +
    ".mn-tab{border:1px solid var(--card-border);background:var(--panel,#fff);color:var(--ink-2);border-radius:999px;padding:8px 18px;font-weight:800;cursor:pointer;font-family:inherit;font-size:.82rem;transition:.2s}" +
    ".mn-tab.on{background:linear-gradient(135deg,#e7c873,#b8912f);color:#2a1d06;border-color:rgba(201,162,39,.55)}" +
    ".mn-terms .mn-tab{padding:6px 15px;font-size:.76rem}" +
    ".mn-list{padding:14px 18px 22px;display:grid;grid-template-columns:1fr;gap:12px}" +
    ".mn-it{border:1px solid var(--card-border);border-radius:14px;padding:13px 15px;background:var(--card-solid,#fff);display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;transition:.2s}" +
    ".mn-it:hover{border-color:var(--gold);box-shadow:var(--shadow-sm)}" +
    ".mn-itico{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;font-size:1.25rem;background:rgba(201,162,39,.14);border:1px solid rgba(201,162,39,.35);flex:none}" +
    ".mn-itx{flex:1;min-width:200px}.mn-itx b{display:block;font-size:.98rem}.mn-itx small{color:var(--mut);display:block;margin:2px 0 6px}" +
    ".mn-top{display:flex;flex-wrap:wrap;gap:6px}.mn-top span{font-size:.7rem;background:var(--panel,#f6f1e4);border:1px solid var(--card-border);border-radius:8px;padding:2px 8px;color:var(--ink-2)}" +
    ".mn-go{flex:none;align-self:center;border:0;border-radius:999px;padding:10px 18px;font-weight:800;cursor:pointer;font-family:inherit;font-size:.8rem;display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#e7c873,#b8912f);color:#2a1d06;box-shadow:0 10px 22px -10px rgba(184,145,47,.8);text-decoration:none}" +
    ".mn-empty{color:var(--mut);padding:26px;text-align:center}" +
    "@media(min-width:720px){.mn-list{grid-template-columns:1fr 1fr}}" +
    "@media(max-height:560px){.mn-head{padding-top:10px;padding-bottom:8px}}";

  function ensureCss() {
    if (document.getElementById("mnCss")) return;
    var st = document.createElement("style");
    st.id = "mnCss";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var cur = "SS1";
  var term = "T1";

  function termOf(e) {
    return e && e.weeks && /Second\s*Term/i.test(e.weeks) ? "T2" : "T1";
  }

  function rows() {
    var list = (window.MATER || []).filter(function (e) { return e.cls === cur && termOf(e) === term; });
    var html = "";
    list.forEach(function (e, i) {
      var href = "mater-notes/" + encodeURIComponent(e.file);
      var topics = (e.topics || []).slice(0, 6).map(function (t) {
        return "<span>" + esc(String(t).replace(/^[A-Z0-9 ]{4,50}\s*$/i, function (m) { return m.toLowerCase().replace(/\b\w/g, function (c) { return c.toUpperCase(); }); })) + "</span>";
      }).join("");
      var pages = e.pages ? e.pages + " pages" : "printable";
      html += '<div class="mn-it"><div class="mn-itico">\ud83d\udcda</div>' +
        '<div class="mn-itx"><b>' + esc(e.subj) + "</b><small>" + esc(e.weeks) + " · " + pages + "</small>" +
        (topics ? '<div class="mn-top">' + topics + "</div>" : "") + "</div>" +
        '<a class="mn-go" href="' + href + '" target="_blank" rel="noopener">Open PDF ↗</a></div>';
    });
    if (!html) html = '<div class="mn-empty">Files for this class are being prepared — check again soon.</div>';
    document.getElementById("mnList").innerHTML = html;
    var lb = document.getElementById("mnTermLbl");
    if (lb) lb.textContent = term === "T2" ? "Second Term 2026/2027 · Weeks 7–12" : "First Term 2026/2027 · Weeks 1–6";
  }

  function open() {
    ensureCss();
    var ov = document.getElementById("mnOverlay");
    if (ov) { ov.style.display = "flex"; rows(); return; }
    ov = document.createElement("div");
    ov.id = "mnOverlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-label", "Mater Notes library");
    ov.style.cssText =
      "position:fixed;inset:0;z-index:120;display:flex;align-items:flex-start;justify-content:center;" +
      "background:rgba(10,14,26,.55);padding:20px 12px 40px;overflow-y:auto;-webkit-overflow-scrolling:touch";
    var bx = document.createElement("div");
    bx.style.cssText = "width:min(920px,100%);max-height:calc(100dvh - 60px);overflow-y:auto;border-radius:18px;" +
      "background:var(--bg,#f6f1e4);border:1px solid rgba(201,162,39,.4);box-shadow:0 30px 80px -24px rgba(0,0,0,.65)";
    bx.innerHTML =
      '<div class="mn-head"><span class="mn-hico">\ud83d\udcda</span>' +
      '<div class="mn-htx"><h3>Mater Notes</h3><small>Mater Misericordiae Secondary School, Rumomasi · <span id="mnTermLbl">First Term 2026/2027 · Weeks 1–6</span></small></div>' +
      '<button class="mn-x" type="button">✕ Close</button></div>' +
      '<div class="mn-tabs"><button data-c="SS1" type="button">SS1</button><button data-c="SS2" type="button">SS2</button><button data-c="SS3" type="button">SS3</button></div>' +
      '<div class="mn-tabs mn-terms"><button data-t="T1" type="button">First Term</button><button data-t="T2" type="button">Second Term</button></div>' +
      '<div class="mn-list" id="mnList"></div>';
    ov.appendChild(bx);
    document.body.appendChild(ov);
    ov.addEventListener("click", function (e) {
      if (e.target === ov || e.target.closest(".mn-x")) close();
    });
    var tabs = ov.querySelectorAll(".mn-tabs:not(.mn-terms) button");
    tabs.forEach(function (b) {
      b.className = "mn-tab" + (b.getAttribute("data-c") === cur ? " on" : "");
      b.addEventListener("click", function () {
        cur = b.getAttribute("data-c");
        tabs.forEach(function (x) { x.className = "mn-tab" + (x.getAttribute("data-c") === cur ? " on" : ""); });
        rows();
      });
    });
    var terms = ov.querySelectorAll(".mn-terms button");
    terms.forEach(function (b) {
      b.className = "mn-tab" + (b.getAttribute("data-t") === term ? " on" : "");
      b.addEventListener("click", function () {
        term = b.getAttribute("data-t");
        terms.forEach(function (x) { x.className = "mn-tab" + (x.getAttribute("data-t") === term ? " on" : ""); });
        rows();
      });
    });
    document.body.style.overflow = "hidden";
    var hk = function (e) { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", hk, true);
    ov._hk = hk;
    rows();
  }

  function close() {
    var ov = document.getElementById("mnOverlay");
    if (ov) { ov.style.display = "none"; if (ov._hk) window.removeEventListener("keydown", ov._hk, true); }
    document.body.style.overflow = "";
  }
})();
