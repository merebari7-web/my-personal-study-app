#!/usr/bin/env python3
# v21.0 "Mater Notes library" — shell: lazy loader + floating launcher button
# for the Mater Notes PDF library (quiz/mater_data.js) + SW cache-key bump.
# Assertion-guarded and idempotent (no quote-hunting).
import os

HERE = os.path.dirname(os.path.abspath(__file__))
TPL = os.path.join(HERE, "template.html")
SW = os.path.join(HERE, "..", "sw.js")

MARKER = '<!-- builder markers: LIVING GOLD-DUST'
BLOCK = (
    '\n<!-- v21.0 Mater Notes library launcher (source: quiz/_patch_v21.py) -->\n'
    '<script>window.mater=function(){var a=arguments;if(window.MN&&MN.open)return MN.open.apply(MN,a);'
    'if(!window.__mnWait)window.__mnWait=[];window.__mnWait.push(function(){try{MN.open.apply(MN,a)}catch(e){}});'
    'if(window.__mnLoading)return;window.__mnLoading=1;var s=document.createElement("script");'
    's.src="quiz/mater_data.js";s.async=!0;s.onload=function(){delete window.__mnLoading;'
    'var w=(window.__mnWait||[]).splice(0);w.forEach(function(f){try{f()}catch(e){}})};'
    's.onerror=function(){delete window.__mnLoading;try{toast("Mater Notes need one online visit to download — after that they work offline","\U0001f4da")}catch(e){}};'
    'document.head.appendChild(s)};'
    '(function(){if(document.getElementById("materLaunch"))return;'
    'var x=document.createElement("button");x.id="materLaunch";x.className="mn-launch";x.type="button";'
    'x.title="Open the Mater Notes library — weekly lesson notes (PDFs)";'
    'x.setAttribute("aria-label","Open the Mater Notes library");'
    'x.innerHTML="\U0001f4da Mater Notes";'
    'x.onclick=function(){window.mater()};document.body.appendChild(x);'
    'if(!document.getElementById("materLaunchCss")){var st=document.createElement("style");st.id="materLaunchCss";'
    'st.textContent=".mn-launch{position:fixed;right:14px;top:calc(66px + env(safe-area-inset-top));z-index:99;'
    'display:inline-flex;align-items:center;min-height:40px;gap:8px;background:var(--card-solid,#fffaf0);'
    'border:1px solid rgba(201,162,39,.45);border-radius:999px;padding:8px 14px;cursor:pointer;'
    'box-shadow:0 8px 24px -12px rgba(0,0,0,.35);color:var(--ink,#1c1626);font-family:inherit;font-size:.82rem;'
    'font-weight:700;transition:.2s}.mn-launch:hover{transform:translateY(-2px);border-color:var(--gold,#c9a227)}'
    '@media(max-width:560px){.mn-launch{padding:6px 11px;font-size:.74rem}}";'
    'document.head.appendChild(st)}})();</script>'
)

# 1. shell block
tpl = open(TPL, encoding="utf-8").read()
assert MARKER in tpl, "builder-marker anchor missing"
if 'window.mater=function' not in tpl:
    assert tpl.count(MARKER) == 1, "marker ambiguous"
    tpl = tpl.replace(MARKER, BLOCK + "\n" + MARKER, 1)
    open(TPL, "w", encoding="utf-8").write(tpl)
    print("ok shell mater loader + launcher")
else:
    print("shell mater already present — skipped")

# 2. service worker
sw = open(SW, encoding="utf-8").read()
if '"-v21"' in sw:
    print("sw already -v21 — skipped")
else:
    assert sw.count('"-v20"') == 1, "sw -v20 literal ambiguous/missing"
    sw = sw.replace('"-v20"', '"-v21"', 1)
    marker = "/* v20 — AI Coach"
    assert marker in sw, "v20 comment marker missing"
    sw = sw.replace(marker,
        "/* v21 — Mater Notes library: lazy, service-worker-cached PDF library module (quiz/mater_data.js) with the 30 school weekly lesson notes added to the site */; " + marker, 1)
    open(SW, "w", encoding="utf-8").write(sw)
    print("ok sw -v21")
