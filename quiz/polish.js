/* v24.0 — Aurum polish layer (lazy, boot-safe). Loaded by a tiny inline loader
   in index.html; appends a scoped stylesheet (html.polished) and a decorative
   hero effect layer. Everything is additive and fails silent: if this file is
   missing the app renders exactly as before. */
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
    /* hero effect layer */
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
    /* stat plates: inner gold frame + hover lift */
    "html.polished .stat{box-shadow:inset 0 0 0 1px var(--pf-ga),0 16px 34px -20px rgba(0,0,0,.55);transition:transform .25s,box-shadow .25s}" +
    "html.polished .stat:hover{transform:translateY(-3px);box-shadow:inset 0 0 0 1px rgba(220,184,95,.55),0 22px 44px -22px rgba(0,0,0,.6)}" +
    "html.polished .stat b{display:inline-block;animation:pfRise .7s cubic-bezier(.2,.7,.3,1.15) .1s both}" +
    /* cards: gold-edged hover */
    "html.polished .card{transition:border-color .25s,box-shadow .25s}" +
    "html.polished .card:hover{border-color:var(--pf-ga);box-shadow:0 22px 52px -24px rgba(15,20,45,.5)}" +
    /* buttons: lift + warm shadow */
    "html.polished .btn-primary{box-shadow:0 12px 30px -12px rgba(140,100,30,.6);transition:transform .2s,box-shadow .2s}" +
    "html.polished .btn-primary:hover{transform:translateY(-2px);box-shadow:0 18px 38px -14px rgba(140,100,30,.7)}" +
    /* coach CTAs: periodic shine sweep (::after is unused in base css; overflow:clip masks the sweep without creating scrollable overflow) */
    "html.polished .ai-go{position:relative;overflow:clip}" +
    "html.polished .ai-go::after{content:\"\";position:absolute;top:0;left:0;width:55%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-18deg) translateX(-190%);animation:pfShineA 5s ease-in-out infinite;pointer-events:none}" +
    /* flourish diamond: gentle pulse */
    "html.polished .hero .flourish{filter:drop-shadow(0 0 10px rgba(220,184,95,.25))}" +
    "html.polished .hero .fl-dia{animation:pfDia 5s ease-in-out infinite;transform-origin:center;transform-box:fill-box}" +
    /* dock: soft gold rim */
    "html.polished .home-dock{border-color:var(--pf-ga);box-shadow:0 -8px 34px -20px rgba(0,0,0,.5)}" +
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
    "@media (max-width:640px){html.polished #polishFx .pf-halo{width:132%;top:24%}}" +
    "@media print{html.polished #polishFx{display:none!important}}";

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
      var hero = document.querySelector(".hero");
      if (hero && !document.getElementById("polishFx")) {
        var fx = document.createElement("div");
        fx.id = "polishFx";
        fx.setAttribute("aria-hidden", "true");
        fx.innerHTML = '<i class="pf-halo"></i><i class="pf-s1"></i><i class="pf-s2"></i><i class="pf-s3"></i><i class="pf-s4"></i><i class="pf-s5"></i><i class="pf-s6"></i><i class="pf-s7"></i><i class="pf-s8"></i><i class="pf-s9"></i><i class="pf-s10"></i>';
        hero.insertBefore(fx, hero.firstChild);
      }
    } catch (e) { /* decorative only — never break the app */ }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
