/* v26.0 — Aurum Design System (lazy, boot-safe). Loaded by the existing tiny
   async loader in index.html; appends a scoped stylesheet (html.polished) and
   a decoration layer. Upgrades EVERY surface: hero (shimmer, particles, live
   date/term/streak chip, numbered stat icons), nav glass, buttons, cards in
   the grid, quiz options, teaching-suite tiles, arcade tiles, library rows,
   modals (backdrop blur), toasts, focus rings, and adds three features:
   back-to-top button, scroll-reveal stagger, hero today-chip. Everything is
   additive and fails silent; missing file = app renders exactly as before. */
(function () {
  "use strict";
  if (window.__polish) return;
  window.__polish = 1;

  var CSS =
    "html.polished{--pf-g:#dcb85f;--pf-g2:#f4e3b2;--pf-ga:rgba(220,184,95,.32);--pf-soft:rgba(220,184,95,.13)}" +
    "html.polished ::selection{background:rgba(220,184,95,.42);color:#241a06}" +
    "html.polished ::-webkit-scrollbar{width:11px;height:11px}" +
    "html.polished ::-webkit-scrollbar-track{background:transparent}" +
    "html.polished ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#dcb85f,#8a6d1f);border-radius:99px;border:2.5px solid transparent;background-clip:padding-box}" +
    /* --- hero effect layer (v24 core, retained) --- */
    "html.polished #polishFx{position:absolute;inset:0;z-index:1;pointer-events:none;overflow:hidden}" +
    "html.polished .hero-copy{position:relative;z-index:2}" +
    "html.polished #polishFx i{position:absolute;z-index:0;display:block;background:var(--pf-g);border-radius:50%;opacity:0;box-shadow:0 0 14px 3px var(--pf-soft);animation:pfSpark var(--pd,7s) ease-in-out var(--pl,0s) infinite}" +
    "html.polished #polishFx .pf-halo{left:50%;top:30%;width:min(880px,94%);height:min(370px,66%);transform:translate(-50%,-50%);background:radial-gradient(50% 50% at 50% 50%,var(--pf-soft),transparent 68%);filter:blur(10px);box-shadow:none;border-radius:50%;opacity:.9;animation:pfBreathe 8s ease-in-out infinite}" +
    "html.polished #polishFx .pf-s1{left:7%;top:20%;width:5px;height:5px;--pd:7s;--pl:0s}" +
    "html.polished #polishFx .pf-s2{left:15%;top:58%;width:4px;height:4px;--pd:9s;--pl:.8s}" +
    "html.polished #polishFx .pf-s3{left:24%;top:34%;width:6px;height:6px;--pd:8s;--pl:1.6s}" +
    "html.polished #polishFx .pf-s4{left:33%;top:70%;width:4px;height:4px;--pd:10s;--pl:2.4s}" +
    "html.polished #polishFx .pf-s5{left:44%;top:16%;width:5px;height:5px;--pd:7.5s;--pl:1.1s}" +
    "html.polished #polishFx .pf-s6{left:55%;top:64%;width:4px;height:4px;--pd:8.6s;--pl:3s}" +
    "html.polished #polishFx .pf-s7{left:64%;top:26%;width:6px;height:6px;--pd:9.4s;--pl:.4s}" +
    "html.polished #polishFx .pf-s8{left:74%;top:52%;width:4px;height:4px;--pd:7.8s;--pl:2s}" +
    "html.polished #polishFx .pf-s9{left:83%;top:18%;width:5px;height:5px;--pd:8.2s;--pl:1.4s}" +
    "html.polished #polishFx .pf-s10{left:91%;top:44%;width:4px;height:4px;--pd:9.6s;--pl:.6s}" +
    /* --- v26: hero today-chip + stat icons --- */
    "html.polished .hero-chip{display:inline-flex;align-items:center;gap:7px;margin-top:12px;padding:8px 14px;border-radius:999px;border:1px solid rgba(244,227,178,.35);background:rgba(255,255,255,.07);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);font-size:.78rem;font-weight:700;letter-spacing:.02em;color:#f6ead2;box-shadow:0 10px 26px -16px rgba(0,0,0,.6)}" +
    "html.polished .hero-chip b{color:#eecf7e}" +
    "html.polished .hero-chip .hr-dot{width:6px;height:6px;border-radius:50%;background:#5fbf7a;box-shadow:0 0 8px #5fbf7a}" +
    "html.polished .stat b::before{margin-right:5px;font-size:.72em;opacity:.9;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35))}" +
    "html.polished .stat:nth-of-type(1) b::before{content:'\\1F4DD '}" +
    "html.polished .stat:nth-of-type(2) b::before{content:'\\1F4DA '}" +
    "html.polished .stat:nth-of-type(3) b::before{content:'\\1F3AF '}" +
    "html.polished .stat:nth-of-type(4) b::before{content:'\\1F3EB '}" +
    "html.polished .stat:nth-of-type(5) b::before{content:'\\1F4A1 '}" +
    "html.polished .stat:nth-of-type(6) b::before{content:'\\1F4C4 '}" +
    /* --- v26: nav + brand glass --- */
    "html.polished .nav{border-bottom:1px solid rgba(220,184,95,.14);background:rgba(255,255,255,.05)}" +
    "html.polished .brand .logo{box-shadow:0 8px 22px -10px rgba(220,184,95,.65)}" +
        "html.polished .icon-btn{border-radius:12px}" +
    "html.polished .hd-btn{border-radius:14px}" +
    "html.polished .hd-btn.on{box-shadow:inset 0 0 0 1px rgba(220,184,95,.35),0 8px 20px -12px rgba(220,184,95,.55)}" +
    "html.polished .home-dock{border-color:var(--pf-ga);box-shadow:0 -8px 34px -20px rgba(0,0,0,.5)}" +
    /* --- v26: components --- */
    "html.polished .stat{box-shadow:inset 0 0 0 1px var(--pf-ga),0 16px 34px -20px rgba(0,0,0,.55);transition:transform .25s,box-shadow .25s}" +
    "html.polished .stat:hover{transform:translateY(-3px);box-shadow:inset 0 0 0 1px rgba(220,184,95,.55),0 22px 44px -22px rgba(0,0,0,.6)}" +
    "html.polished .stat b{display:inline-block;animation:pfRise .7s cubic-bezier(.2,.7,.3,1.15) .1s both}" +
    "html.polished .card{transition:border-color .25s,box-shadow .25s}" +
    "html.polished .card:hover{border-color:var(--pf-ga);box-shadow:0 22px 52px -24px rgba(15,20,45,.5)}" +
    "html.polished .btn:active{transform:translateY(1px) scale(.99)}" +
    "html.polished .btn-primary{box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 12px 30px -12px rgba(140,100,30,.6);transition:transform .2s,box-shadow .2s}" +
    "html.polished .btn-primary:hover{transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 18px 38px -14px rgba(140,100,30,.7)}" +
    "html.polished .btn-ghost:hover{border-color:var(--pf-ga)}" +
    "html.polished .ai-go{position:relative;overflow:clip}" +
    "html.polished .ai-go::after{content:'';position:absolute;top:0;left:0;width:55%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-18deg) translateX(-190%);animation:pfShineA 5s ease-in-out infinite;pointer-events:none}" +
    "html.polished .hero .flourish{filter:drop-shadow(0 0 10px rgba(220,184,95,.25))}" +
    "html.polished .hero .fl-dia{animation:pfDia 5s ease-in-out infinite;transform-origin:center;transform-box:fill-box}" +
    /* --- v26: quiz + teaching surfaces --- */
    "html.polished .opt{transition:transform .18s,border-color .2s,box-shadow .25s,background .2s}" +
    "html.polished .opt:hover{transform:translateY(-1px);border-color:var(--gold)}" +
    "html.polished .opt.correct{box-shadow:0 0 0 3px rgba(0,135,81,.22)}" +
    "html.polished .qnav .btn{border-radius:12px}" +
    "html.polished .timer{color:var(--green-d,#8a5f24);font-weight:800}" +
    "html.polished .tab,.html.polished .chip{border-radius:12px}" +
    "html.polished .lab-tile:hover{transform:translateY(-3px);box-shadow:0 18px 36px -18px rgba(20,35,70,.45);border-color:var(--gold)}" +
    "html.polished .lab-tile{transition:transform .2s,border-color .2s,box-shadow .2s}" +
    "html.polished .sv-tile{transition:transform .2s,border-color .2s,box-shadow .2s}" +
    "html.polished .sv-tile:hover{transform:translateY(-2px);border-color:var(--gold);box-shadow:0 14px 30px -16px rgba(20,35,70,.4)}" +
    "html.polished .g-tile{transition:transform .2s,border-color .2s,box-shadow .2s}" +
    "html.polished .g-tile:hover{transform:translateY(-3px);border-color:var(--gold);box-shadow:0 20px 40px -20px rgba(20,35,70,.5)}" +
    "html.polished .lib-item{transition:background .2s,padding-left .2s}" +
    "html.polished .lib-item:hover{background:rgba(201,162,39,.07);padding-left:16px}" +
    "html.polished .hq-chip:hover{transform:translateY(-2px)}" +
    "html.polished .hq-chip{transition:transform .2s}" +
    "html.polished .edu-sec{border-left:3px solid rgba(201,162,39,.4)}" +
    /* --- v26: overlays, modals, toast --- */
    "html.polished #labOverlay,html.polished #eduOverlay,html.polished #libraryOverlay,html.polished #hqOverlay,html.polished #historyOverlay,html.polished #statsOverlay,html.polished #helpOverlay,html.polished #wheelOverlay,html.polished #certOverlay,html.polished #levelOverlay,html.polished #submitCheckOverlay,html.polished #accountOverlay{backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}" +
    "html.polished .modal{border:1px solid rgba(220,184,95,.28)}" +
    "html.polished #toast{border:1px solid rgba(220,184,95,.5);border-radius:999px;box-shadow:0 18px 44px -18px rgba(0,0,0,.55)}" +
    /* --- v26: new features --- */
    "html.polished .back-top{position:fixed;right:14px;bottom:calc(84px + env(safe-area-inset-bottom));z-index:96;width:44px;height:44px;border-radius:50%;border:1px solid rgba(220,184,95,.5);background:linear-gradient(160deg,#241a06,#3a2a0e);color:#f4e3b2;font-size:1.1rem;font-weight:900;cursor:pointer;box-shadow:0 14px 34px -14px rgba(0,0,0,.6);opacity:0;pointer-events:none;transform:translateY(14px);transition:opacity .3s,transform .3s;font-family:inherit}" +
    "html.polished .back-top.show{opacity:1;pointer-events:auto;transform:none}" +
    "html.polished .back-top:hover{border-color:#eecf7e;transform:translateY(-2px)}" +
    "html.polished .rv{opacity:0;transform:translateY(16px)}" +
    "html.polished .rv.rv-in{opacity:1;transform:none;transition:opacity .55s ease,transform .55s cubic-bezier(.22,1,.36,1)}" +
    "html.polished :focus-visible{outline:2px solid #c9a227;outline-offset:2px}" +
    "@media (prefers-reduced-motion:no-preference){" +
    "html.polished .hero h1{background:linear-gradient(100deg,#fff 0%,#fff 18%,var(--pf-g2) 36%,#eecf7e 50%,var(--pf-g2) 64%,#fff 82%,#fff 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;animation:pfSheen 11s linear infinite}" +
    "@keyframes pfSheen{0%{background-position:0% 0}100%{background-position:-220% 0}}" +
    "html.polished .hero h1 .h1-sub{-webkit-text-fill-color:currentColor;color:var(--pf-g2)}" +
    "@keyframes pfSpark{0%,100%{opacity:0;transform:scale(.4)}10%{opacity:.95;transform:scale(1)}24%{opacity:.28;transform:scale(.75)}38%{opacity:.85;transform:scale(.6)}54%{opacity:.12;transform:scale(.9)}70%{opacity:.8;transform:scale(1.08)}86%{opacity:.25}}" +
    "@keyframes pfBreathe{0%,100%{opacity:.55;transform:translate(-50%,-50%) scale(1)}50%{opacity:.95;transform:translate(-50%,-50%) scale(1.12)}}" +
    "@keyframes pfRise{0%{opacity:.2;transform:translateY(8px) scale(.94)}100%{opacity:1;transform:none}}" +
    "@keyframes pfShineA{0%,55%{transform:skewX(-18deg) translateX(-190%)}85%,100%{transform:skewX(-18deg) translateX(260%)}}" +
    "@keyframes pfDia{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.28);opacity:1}}" +
    "}" +
    "@media (max-width:640px){html.polished #polishFx .pf-halo{width:132%;top:24%}html.polished .hero-chip{padding:6px 11px;font-size:.7rem}}" +
    "@media print{html.polished #polishFx,html.polished .back-top,html.polished .hero-chip{display:none!important}}";

  function apply() {
    try {
      if (!document.getElementById("polishCss")) {
        var st = document.createElement("style");
        st.id = "polishCss";
        st.textContent = CSS;
        document.head.appendChild(st);
      }
      if (!document.documentElement.classList.contains("polished")) {
        document.documentElement.classList.add("polished");
      }
      heroLayer();
      heroChip();
      backTop();
      reveal();
    } catch (e) { /* decorative only — never break the app */ }
  }

  function heroLayer() {
    var hero = document.querySelector(".hero");
    if (hero && !document.getElementById("polishFx")) {
      var fx = document.createElement("div");
      fx.id = "polishFx";
      fx.setAttribute("aria-hidden", "true");
      fx.innerHTML = '<i class="pf-halo"></i><i class="pf-s1"></i><i class="pf-s2"></i><i class="pf-s3"></i><i class="pf-s4"></i><i class="pf-s5"></i><i class="pf-s6"></i><i class="pf-s7"></i><i class="pf-s8"></i><i class="pf-s9"></i><i class="pf-s10"></i>';
      hero.insertBefore(fx, hero.firstChild);
    }
  }

  function heroChip() {
    var hero = document.querySelector(".hero-badge");
    if (!hero || document.getElementById("heroChip")) return;
    var chip = document.createElement("div");
    chip.id = "heroChip";
    chip.className = "hero-chip";
    chip.setAttribute("aria-hidden", "true");
    var d = new Date();
    var m = d.getMonth() + 1;
    var term = m >= 9 ? "First Term" : (m <= 4 ? "Second Term" : (m <= 7 ? "Third Term" : "In Vacation"));
    var dateTxt = d.toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    var streak = "";
    try { if (typeof streakDays === "function") { var s = streakDays(); if (s > 0) streak = ' · <b>🔥 ' + s + '-day streak</b>'; } } catch (e) {}
    chip.innerHTML = '<span class="hr-dot"></span> ' + dateTxt + " · " + term + streak;
    hero.parentNode.insertBefore(chip, hero.nextSibling);
  }

  function backTop() {
    if (document.getElementById("backTop")) return;
    var b = document.createElement("button");
    b.id = "backTop";
    b.className = "back-top";
    b.type = "button";
    b.title = "Back to top";
    b.setAttribute("aria-label", "Back to top");
    b.innerHTML = "\u2191";
    b.addEventListener("click", function () {
      try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) { window.scrollTo(0, 0); }
    });
    document.body.appendChild(b);
    var onScroll = function () {
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y > 480) b.classList.add("show"); else b.classList.remove("show");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function reveal() {
    if (!("IntersectionObserver" in window)) return;
    var rm = false;
    try { rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    if (rm) return;
    var els = document.querySelectorAll(".card,.stat,.ai-it,.lab-tile,.sv-tile,.g-tile,.lib-item,.edu-sec,.hq-chip");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add("rv-in");
        io.unobserve(el);
        setTimeout(function () {
          el.classList.remove("rv", "rv-in");
          el.style.transitionDelay = "";
        }, 900);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -36px 0px" });
    Array.prototype.forEach.call(els, function (el, i) {
      el.classList.add("rv");
      el.style.transitionDelay = ((i % 6) * 55) + "ms";
      io.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
