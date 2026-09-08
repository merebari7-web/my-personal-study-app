#!/usr/bin/env python3
# v22.0 "Second Term in Mater Notes" — service-worker cache-key bump so the
# 60-file library (both terms) is served fresh after deploy. The UI toggle
# lives in the lazy module quiz/mater_data.js (see _mater_app.js), so no
# index.html shell change is needed. Assertion-guarded and idempotent.
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SW = os.path.join(HERE, "..", "sw.js")

sw = open(SW, encoding="utf-8").read()
if '"-v22"' in sw:
    print("sw already -v22 — skipped")
else:
    assert sw.count('"-v21"') == 1, "sw -v21 literal ambiguous/missing"
    sw = sw.replace('"-v21"', '"-v22"', 1)
    marker = "/* v21 — Mater Notes library"
    assert sw.count(marker) == 1, "v21 comment marker missing/ambiguous"
    sw = sw.replace(marker,
        "/* v22 — Second Term in Mater Notes: the library now serves 60 weekly lesson-note PDFs (First Term weeks 1-6 and Second Term weeks 7-12, all classes) */; " + marker, 1)
    open(SW, "w", encoding="utf-8").write(sw)
    print("ok sw -v22")
