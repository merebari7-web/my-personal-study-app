/* v10.0 — THE TEACHING SUITE (edu.js)
   A deferred feature module for My Personal Study App.
   It adds the tools a Nigerian SS1–SS3 teacher and every Senior Secondary
   candidate actually use in class:
     📚 Lesson Notes    — term-organized, objectives + content + key points +
                          worked examples + class evaluation, per SS1/SS2/SS3
     💻 CBT Centre      — a real computer-based test (instructions, candidate
                          form, answer sheet, timer, submit, review + result slip)
     🗓 Scheme of Work  — 1st/2nd/3rd term weekly topic outline, all 13 subjects
     🧭 Syllabus Map    — the 13-subject SS1–SS3 syllabus, class by class
     🏅 Marking Guide   — WAEC/NECO grade scale + quick marking tips

   Everything runs on the device and reuses the app's own question bank, so it
   can never drift from the syllabus content that is already verified in bank.js.
*/
(function () {
  "use strict";

  var DOC = document;
  function $(id) { return DOC.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function toast(msg, ico) {
    try { if (window.toast) window.toast(msg, ico || "🎓"); } catch (e) {}
  }
  function say(t) { try { if (window.speakText) window.speakText(t); } catch (e) {} }
  function fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function fmtTime(s) {
    s = Math.max(0, Math.round(+s || 0));
    var m = Math.floor(s / 60), r = s % 60;
    return m + ":" + (r < 10 ? "0" : "") + r;
  }
  function shuffle(a) {
    a = (a || []).slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function st(k, d) { try { return window.store ? store.get(k, d) : d; } catch (e) { return d; } }
  function setSt(k, v) { try { window.store && store.set(k, v); } catch (e) {} }

  /* ---------- reads from the app ---------- */
  function subjectList() {
    try {
      var q = window.QUIZ_RAW;
      if (q && Array.isArray(q.subj) && q.subj.length === 13) return q.subj.slice();
    } catch (e) {}
    try {
      if (Array.isArray(CLASSES) && CLASSES.length && CLASSES[0].questions) {
        var seen = [], out = [];
        CLASSES[0].questions.forEach(function (x) { if (seen.indexOf(x.s) < 0) { seen.push(x.s); out.push(x.s); } });
        if (out.length) return out;
      }
    } catch (e) {}
    return ["Mathematics", "English Language", "Biology", "Chemistry", "Physics",
      "Agricultural Science", "Economics", "Government", "Literature in English",
      "Geography", "Commerce", "Computer Studies", "Civic Education"];
  }
  function classList() {
    try {
      if (Array.isArray(CLASSES) && CLASSES.length === 3) return CLASSES.map(function (c) { return c.class; });
    } catch (e) {}
    return ["SS1", "SS2", "SS3"];
  }
  function topicsOf(subject) {
    try {
      if (typeof TOPICS !== "undefined" && TOPICS[subject]) return TOPICS[subject];
    } catch (e) {}
    try {
      var nb = notesOf(subject);
      if (nb) return Object.keys(nb).map(function (t) { return [t, []]; });
    } catch (e) {}
    return [];
  }
  function notesOf(subject) {
    try { if (window.notesBank) return notesBank()[subject] || {}; } catch (e) {}
    try { if (typeof RNOTES !== "undefined" && RNOTES[subject]) return RNOTES[subject]; } catch (e) {}
    return {};
  }
  function subjectsData() {
    try {
      if (Array.isArray(CLASSES) && CLASSES.length === 3 && CLASSES[0].questions) return CLASSES;
    } catch (e) {}
    return [];
  }
  function questionsFor(clsIndex, subject) {
    var data = subjectsData();
    if (!data.length) return [];
    var arr = data[Math.max(0, Math.min(2, +clsIndex || 0))].questions || [];
    if (!subject || subject === "All subjects") return arr.slice();
    return arr.filter(function (q) { return q.s === subject; });
  }
  function kwPhrase(kws) {
    kws = (kws || []).filter(function (k) { return k && k.length > 1; });
    if (!kws.length) return "the core ideas of this topic";
    var top = kws.slice(0, 5).map(function (k) { return "'" + k.trim() + "'"; });
    if (top.length === 1) return top[0];
    return top.slice(0, -1).join(", ") + " and " + top[top.length - 1];
  }
  function subjectCurriculum(subject) {
    var m = {
      "Mathematics": "The SS1–SS3 Mathematics syllabus covers number systems, algebra, geometry, trigonometry, mensuration, statistics, probability, functions, graphs and their applications to everyday and exam problems.",
      "English Language": "English Language at Senior Secondary level develops grammar, vocabulary, comprehension, essay and letter writing, oral English (phonetics and stress) and the expression skills examined in WAEC, NECO and JAMB.",
      "Biology": "Biology follows the living world from cells and organisation, through ecology, genetics and evolution, to plant and animal physiology, with health, nutrition and disease prevention linked to Nigerian life.",
      "Chemistry": "Chemistry builds the particulate nature of matter, atomic structure and bonding, acids and bases, chemical reactions, separation techniques, organic chemistry and the physical chemistry needed for WAEC/NECO.",
      "Physics": "Physics covers measurement, mechanics and motion, heat and thermodynamics, electricity and magnetism, waves and optics, pressure and fluids, and modern physics — all examined with formulas and numerical work.",
      "Agricultural Science": "Agricultural Science spans soil and crop production, animal production, farm management, agricultural technology and processing, ecology, genetics and improvement, with strong ties to Nigerian farming practice.",
      "Economics": "Economics develops basic concepts and theory, demand and supply, market structures, money and banking, national income and trade, public finance, development and production in the Nigerian and global economy.",
      "Government": "Government examines political concepts, constitutions, democracy and elections, Nigerian political history, public administration, political parties, pressure groups and international organisations such as the UN, AU and ECOWAS.",
      "Literature in English": "Literature in English covers poetry, prose, drama, literary terms and devices, African literature, and comprehension and analysis of prescribed texts, with critical thinking and close reading at the centre.",
      "Geography": "Geography combines physical geography, climate and weather, landforms and water, settinng, population, settlement, industry and map work — the skills needed to read and interpret the Nigerian environment.",
      "Commerce": "Commerce develops trade, commerce and industry, business organisations, money and banking, insurance, consumerism, trade and finance, and the principles behind Nigerian commercial life.",
      "Computer Studies": "Computer Studies builds hardware and systems, software and applications, internet and networks, programming and algorithms, data and security, and ICT fundamentals, ethics and digital citizenship.",
      "Civic Education": "Civic Education cultivates values and citizenship, rights and duties, national consciousness, democracy and governance, social and community issues, and health, environment and national development."
    };
    return m[subject] || ("The Senior Secondary " + subject + " syllabus is delivered as a progressive three-year course that leaves students ready for WAEC, NECO and JAMB at the end of SS3.");
  }
  function classFocus(cls) {
    if (cls === "SS1") return "SS1 is the foundation year. Introduce the key vocabulary, definitions and basic procedures, then work simple examples until the class is confident before moving forward.";
    if (cls === "SS2") return "SS2 consolidates and extends SS1. Apply the concepts to longer questions, link the topic to other parts of the syllabus and build exam-style working habits.";
    return "SS3 is the WAEC/NECO/JAMB year. Revise the essentials, practise under timed conditions, avoid common mistakes and connect this topic to the questions that frequently appear in public examinations.";
  }
  function lessonObjectives(topicName, kws) {
    var base = [
      "Define and explain " + esc(topicName) + " in your own words.",
      "Identify the key terms and ideas: " + kwPhrase(kws) + ".",
      "Work through at least one clear example with correct working.",
      "Use the facts, formulas or definitions in a WAEC/NECO-style question.",
      "Explain the connection between this topic and other parts of " + ("the syllabus") + "."
    ];
    return base;
  }
  function contentPara(subject, topicName, kws, cls) {
    var card = notesOf(subject)[topicName] || "";
    return cls + " " + topicName + ". " + subjectCurriculum(subject) +
      " This lesson centres on " + kwPhrase(kws) +
      (card ? ". The key facts and formulas for this topic are set out below, so the class can read them, learn them and apply them." : ". Work through the definition first, then the explanatory points and the worked example.") +
      ". In " + cls + " the emphasis is on " + (cls === "SS1" ? "building a solid foundation" : cls === "SS2" ? "deepening understanding and improving accuracy" : "exam readiness, accuracy and speed") + ".";
  }
  function schemeFor(subject, cls) {
    var topics = topicsOf(subject);
    var out = [];
    if (!topics.length) return out;
    var t1 = topics.slice(0, 2), t2 = topics.slice(2, 4), t3 = topics.slice(4);
    function weeks(topicArr, labels) {
      return labels.map(function (lbl, i) {
        return { week: lbl, topic: (topicArr[i % topicArr.length] || [topicArr[0] || ["General", []]])[0] };
      });
    }
    out.push([{ term: "1st Term", focus: "Foundations and first units" }, weeks(t1, ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12"])]);
    out.push([{ term: "2nd Term", focus: "Development and applications" }, weeks(t2, ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12"])]);
    out.push([{ term: "3rd Term", focus: "Revision and public-examination preparation" }, weeks(t3, ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12"])]);
    return out;
  }
  function matchQuestions(subject, topicName, kws, clsIndex, n) {
    var all = questionsFor(clsIndex, subject);
    var matched = [];
    if (kws && kws.length) {
      matched = all.filter(function (q) {
        var t = (q.q + " " + (q.e || "")).toLowerCase();
        return kws.some(function (k) { return k && k.length >= 2 && t.indexOf(k.toLowerCase()) >= 0; });
      });
    }
    if (matched.length < (n || 4)) matched = all.slice();
    return shuffle(matched).slice(0, n || 4);
  }
  function gradeFor(pct) {
    if (pct >= 75) return "A1";
    if (pct >= 70) return "B2";
    if (pct >= 65) return "B3";
    if (pct >= 60) return "C4";
    if (pct >= 55) return "C5";
    if (pct >= 50) return "C6";
    if (pct >= 45) return "D7";
    if (pct >= 40) return "E8";
    return "F9";
  }
  function verdictFor(pct) {
    if (pct >= 70) return "Distinction — excellent.";
    if (pct >= 50) return "Credit — solid, keep building.";
    if (pct >= 40) return "Pass — revise the weak topics.";
    return "Below pass — review the lesson and retry.";
  }

  /* ---------- module state ---------- */
  var state = {
    route: "notes",
    subj: subjectList()[0],
    cls: classList()[2] || "SS3",
    topic: null,
    cbt: null
  };

  /* ---------- launcher ---------- */
  function injectLauncher() {
    if ($("eduLaunch")) return;
    var b = DOC.createElement("button");
    b.id = "eduLaunch";
    b.type = "button";
    b.title = "Open the Teaching Suite — lesson notes, CBT, scheme of work";
    b.setAttribute("aria-label", "Open the Teaching Suite");
    b.innerHTML = '<span class="edu-launch-ico">🎓</span><span class="edu-launch-txt">Teaching Suite</span>';
    b.onclick = function () { open(); };
    DOC.body.appendChild(b);
  }

  /* ---------- modal ---------- */
  function close() {
    var o = $("eduOv");
    if (o && o.parentNode) {
      var pv = o.getAttribute("data-prevov") || "";
      try { DOC.body.style.overflow = pv; } catch (e) {}
      o.parentNode.removeChild(o);
    }
    if (CBT && CBT.timer) { clearInterval(CBT.timer); CBT.timer = null; }
  }
  function open(kind, arg) {
    try { close(); } catch (e) {}
    var ov = DOC.createElement("div");
    ov.id = "eduOv";
    ov.className = "edu-ov";
    ov.setAttribute("data-prevov", DOC.body.style.overflow || "");
    DOC.body.style.overflow = "hidden";
    var modal = DOC.createElement("div");
    modal.id = "eduModal";
    modal.className = "edu-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = "";
    ov.appendChild(modal);
    DOC.body.appendChild(ov);
    if (kind) state.route = kind;
    paint(arg);
  }
  function paint(arg) {
    var m = $("eduModal");
    if (!m) return;
    m.innerHTML = shellHtml(arg);
    var r = state.route;
    if (r === "cbt") return cbtRoute(arg);
    if (r === "scheme") return schemeRoute(arg);
    if (r === "syllabus") return syllabusRoute(arg);
    if (r === "marks") return marksRoute(arg);
    return notesRoute(arg);
  }
  function shellHtml(arg) {
    var tabs = [
      ["notes", "📚 Lesson Notes", "Lesson notes for SS1–SS3"],
      ["cbt", "💻 CBT", "Computer-based test"],
      ["scheme", "🗓 Scheme", "Termly scope & sequence"],
      ["syllabus", "🧭 Syllabus", "Full subject map"],
      ["marks", "🏅 Marking", "WAEC/NECO grading"]
    ];
    var t = tabs.map(function (x) {
      return '<button type="button" class="edu-tab' + (state.route === x[0] ? " on" : "") + '" title="' + esc(x[2]) + '" onclick="EDU.go(\'' + x[0] + '\')">' + x[1] + "</button>";
    }).join("");
    return '<div class="edu-head"><div class="edu-brand"><b>🎓 Teaching Suite</b><small>SS1–SS3 · Nigerian curriculum · all 13 subjects</small></div><button type="button" class="edu-x" onclick="EDU.close()" aria-label="Close">✕</button></div>' +
      '<div class="edu-tabs" role="tablist">' + t + "</div>" +
      '<div class="edu-body" id="eduSBody"></div>' +
      '<div class="edu-foot">Runs on this device · no account needed · © merebari web</div>';
  }
  function body() { return $("eduSBody"); }

  /* ---------- lesson notes ---------- */
  function notesRoute(arg) {
    var subs = subjectList(), cls = state.cls || "SS3", subj = state.subj || subs[0];
    var topics = topicsOf(subj);
    if (!state.topic || !topics.some(function (t) { return t[0] === state.topic; })) state.topic = topics.length ? topics[0][0] : null;
    var b = body(); if (!b) return;
    var topicSel = topics.map(function (t) {
      return '<button type="button" class="edu-chip' + (state.topic === t[0] ? " on" : "") + '" onclick="EDU.topic(\'' + esc(t[0]).replace(/'/g, "\\'") + '\')">' + esc(t[0]) + "</button>";
    }).join("");
    b.innerHTML =
      '<div class="edu-sec">'
      + '<h3>📚 Lesson Notes</h3>'
      + '<p class="edu-lede">Ready-to-use lesson notes for every SS1–SS3 subject: learning objectives, content, key points, worked examples and a class evaluation drawn from the app\u2019s verified question bank.</p>'
      + '<div class="edu-pickrow">'
      + '<label>Class <select class="edu-sel" id="eduCls">' + classList().map(function (c) { return '<option value="' + esc(c) + '"' + (c === cls ? " selected" : "") + '>' + esc(c) + "</option>"; }).join("") + "</select></label>"
      + '<label>Subject <select class="edu-sel" id="eduSub">' + subs.map(function (s) { return '<option value="' + esc(s) + '"' + (s === subj ? " selected" : "") + '>' + esc(s) + "</option>"; }).join("") + "</select></label>"
      + "</div>"
      + '<div class="edu-chiprow">' + topicSel + "</div>"
      + '<div class="edu-grid2">'
      + '<div class="edu-card"><h4>📘 Lesson content</h4><div id="eduLesson">' + lessonHtml(subj, state.topic, cls) + "</div></div>"
      + '<div class="edu-card"><h4>✍️ Evaluations &amp; practice</h4><div id="eduWork">' + workHtml(subj, state.topic, cls) + "</div></div>"
      + "</div>"
      + "</div>";
    var clsSel = $("eduCls"), subSel = $("eduSub");
    if (clsSel) clsSel.onchange = function () { state.cls = clsSel.value; paint(); };
    if (subSel) subSel.onchange = function () { state.subj = subSel.value; state.topic = topicsOf(state.subj)[0] ? topicsOf(state.subj)[0][0] : null; paint(); };
  }
  function lessonHtml(subj, topic, cls) {
    if (!topic) return "<p class=\"edu-empty\">Choose a topic to see the lesson note.</p>";
    var kws = [];
    try {
      var tp = (TOPICS[subj] || []).filter(function (x) { return x[0] === topic; })[0];
      kws = tp ? tp[1] : [];
    } catch (e) {}
    var card = notesOf(subj)[topic] || "";
    var bullets = card ? card.split(". ").filter(function (x) { return x && x.length > 2; }).map(function (x) { return "• " + x.trim(); }).join("<br>") : "• Read the worked example and class evaluation below.";
    var objs = lessonObjectives(topic, kws).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    var focus = classFocus(cls);
    return '<div class="edu-note">'
      + '<p><b>Topic:</b> ' + esc(topic) + ' · <b>Class:</b> ' + esc(cls) + ' · <b>Subject:</b> ' + esc(subj) + '</p>'
      + '<p><b>Curriculum context.</b> ' + esc(contentPara(subj, topic, kws, cls)) + '</p>'
      + '<p><b>Learning focus for ' + esc(cls) + '.</b> ' + esc(focus) + '</p>'
      + '<div class="edu-sub"><b>🎯 Objectives</b><ul>' + objs + "</ul></div>"
      + '<div class="edu-sub"><b>📌 Key points &amp; facts</b><div class="edu-card-mini">' + bullets + '</div></div>'
      + '<div class="edu-sub"><b>🖨 Teacher tip.</b> Ask the class to read the key points once, close the screen, then write the facts they remember. This retrieval practice is the single most reliable way to teach a topic for WAEC/NECO.</div>'
      + "<div style=\"display:flex;gap:8px;flex-wrap:wrap;margin-top:12px\">"
      + '<button type="button" class="edu-btn" onclick="EDU.lessonPrint()">🖨 Print this lesson</button>'
      + '<button type="button" class="edu-btn gold" onclick="EDU.lessonDrill(\'' + esc(subj).replace(/'/g, "\\'") + '\',\'' + esc(topic).replace(/'/g, "\\'") + '\',\'' + esc(cls).replace(/'/g, "\\'") + '\')">▶ Drill this topic</button>'
      + "</div></div>";
  }
  function workHtml(subj, topic, cls) {
    if (!topic) return "<p class=\"edu-empty\">Choose a topic to see the class evaluation.</p>";
    var ci = classList().indexOf(cls); if (ci < 0) ci = 2;
    var examples = matchQuestions(subj, topic, kwArr(subj, topic), ci, 2);
    var evalr = matchQuestions(subj, topic, kwArr(subj, topic), ci, 4);
    function qBlock(q, i, ex) {
      if (!q) return "";
      return '<div class="edu-q">'
        + '<div class="edu-qhead"><b>Q' + (i + 1) + '</b>' + (ex ? '<span class="edu-tag">Worked example</span>' : '<span class="edu-tag">Class evaluation</span>') + "</div>"
        + '<div class="edu-qtext">' + esc(q.q) + "</div>"
        + '<div class="edu-opts">' + (q.o || []).map(function (o, k) { return '<div class="edu-opt">' + ["A", "B", "C", "D"][k] + ". " + esc(o) + "</div>"; }).join("") + "</div>"
        + '<button type="button" class="edu-mini" onclick="EDU.reveal(\'eduExp' + i + '\', this)">👁 Show answer &amp; explanation</button>'
        + '<div class="edu-exp" id="eduExp' + i + '" hidden><b>Answer: ' + ["A", "B", "C", "D"][q.a] + '</b> — ' + esc(q.e) + "</div>"
        + "</div>";
    }
    var exHtml = examples.map(function (q, i) { return qBlock(q, i, true); }).join("");
    var evHtml = evalr.map(function (q, i) { return qBlock(q, i, false); }).join("");
    return '<div class="edu-qwrap"><h5>Worked examples</h5>' + (exHtml || "<p class=\"edu-empty\">Examples will appear here.</p>") + '</div>'
      + '<div class="edu-qwrap"><h5>Class evaluation</h5>' + (evHtml || "<p class=\"edu-empty\">Evaluation questions will appear here.</p>") + "</div>";
  }
  function kwArr(subj, topic) {
    try { var tp = (TOPICS[subj] || []).filter(function (x) { return x[0] === topic; })[0]; return tp ? tp[1] : []; } catch (e) { return []; }
  }
  function reveal(id, btn) {
    var el = $(id);
    if (el && btn) {
      el.hidden = !el.hidden;
      btn.textContent = el.hidden ? "👁 Show answer & explanation" : "🙈 Hide answer";
    }
  }
  function lessonDrill(subj, topic, cls) {
    try {
      close();
      if (window.drillSubject) drillSubject(subj === "All subjects" ? null : subj, 10);
    } catch (e) { toast("Could not open the drill — choose a paper from the home screen", "⚠️"); }
  }
  function lessonPrint() {
    var subj = state.subj, topic = state.topic, cls = state.cls;
    if (!topic) return toast("Choose a topic first", "⚠️");
    var w = window.open("", "eduPrint", "width=760,height=900");
    if (!w) return toast("Allow pop-ups to print the lesson", "⚠️");
    var kws = kwArr(subj, topic);
    var card = notesOf(subj)[topic] || "";
    var bullets = card ? card.split(". ").filter(function (x) { return x && x.length > 2; }).map(function (x) { return "<li>" + esc(x.trim()) + "</li>"; }).join("") : "<li>See worked example.</li>";
    var objs = lessonObjectives(topic, kws).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    w.document.write(
      "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Lesson Note - " + esc(topic) + "</title>" +
      "<style>body{font-family:Georgia,serif;padding:24px;color:#111} h1{font-size:1.4rem} .box{border:1px solid #999;border-radius:8px;padding:12px;margin:14px 0} small{color:#666}</style></head><body>" +
      "<h1>🎓 Lesson Note — " + esc(subj) + "</h1>" +
      "<p><b>Class:</b> " + esc(cls) + " · <b>Topic:</b> " + esc(topic) + "</p>" +
      "<div class='box'><b>Curriculum context.</b> " + esc(contentPara(subj, topic, kws, cls)) + "</div>" +
      "<div class='box'><h3>🎯 Objectives</h3><ul>" + objs + "</ul></div>" +
      "<div class='box'><h3>📌 Key points</h3><ul>" + bullets + "</ul></div>" +
      "<div class='box'><h3>✍️ Class evaluation</h3>" +
      matchQuestions(subj, topic, kws, classList().indexOf(cls) < 0 ? 2 : classList().indexOf(cls), 4).map(function (q, i) {
        return "<p><b>" + (i + 1) + ".</b> " + esc(q.q) + "</p><ol type='A'><li>" + esc(q.o[0]) + "</li><li>" + esc(q.o[1]) + "</li><li>" + esc(q.o[2]) + "</li><li>" + esc(q.o[3]) + "</li></ol>";
      }).join("") + "</div>" +
      "<p><small>Generated by My Personal Study App · © merebari web</small></p></body></html>");
    w.document.close(); w.focus();
    setTimeout(function () { try { w.print(); } catch (e) {} }, 350);
  }

  /* ---------- CBT ---------- */
  var CBT = null;
  function cbtRoute() {
    var subs = subjectList(), b = body(); if (!b) return;
    b.innerHTML =
      '<div class="edu-sec">'
      + '<h3>💻 Computer-Based Test (CBT)</h3>'
      + '<p class="edu-lede">A real CBT experience for class tests or WAEC/NECO-style practice: candidate registration, timed answering, an answer-sheet grid, flagging, submission and a printable result slip.</p>'
      + '<div class="edu-cbt-wrap">'
      + '<div class="edu-card">'
      + '<h4>Candidate registration</h4>'
      + '<label class="edu-field">Candidate name<br><input class="edu-input" id="cbtName" maxlength="80" placeholder="e.g. Adebayo Funke"></label>'
      + '<label class="edu-field">School / centre<br><input class="edu-input" id="cbtSchool" maxlength="120" placeholder="e.g. Government College, Lagos"></label>'
      + '<div class="edu-pickrow">'
      + '<label>Class <select class="edu-sel" id="cbtCls">' + classList().map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("") + "</select></label>"
      + "<label>Subject <select class=\"edu-sel\" id=\"cbtSub\">" + subs.map(function (s) { return "<option>" + esc(s) + "</option>"; }).join("") + "</select></label>"
      + '</div>'
      + '<div class="edu-pickrow">'
      + '<label>Questions <select class="edu-sel" id="cbtCount"><option>10</option><option selected>20</option><option>30</option><option>50</option><option>100</option></select></label>'
      + '<label>Time (minutes) <select class="edu-sel" id="cbtMins"><option>15</option><option>30</option><option>45</option><option selected>60</option></select></label>'
      + "</div>"
      + '<label class="edu-check"><input type="checkbox" id="cbtAgree"> I have read and will obey the CBT rules. I understand that switching tabs or windows may be recorded and that malpractice is a serious offence.</label>'
      + '<button type="button" class="edu-btn gold" id="cbtStart" style="margin-top:12px">▶ Start CBT</button>'
      + "</div>"
      + '<div class="edu-card edu-help"><h4>📋 How the CBT works</h4>'
      + "<ol>"
      + "<li>Fill the candidate details and choose subject, class, number of questions and time.</li>"
      + "<li>On the start screen confirm the details, then begin when you are ready.</li>"
      + "<li>Use <b>Previous</b> / <b>Next</b>, the answer-sheet grid, and the <b>Flag</b> button for questions you want to return to.</li>"
      + "<li>Submit your test. You will get a full review with explanations and a printable result slip with a WAEC/NECO-style grade.</li>"
      + "</ol>"
      + "<p>Because this is a practice app, the review screen shows the correct answers and explanations so you can learn from every question.</p></div>"
      + "</div>"
      + "</div>";
    var btn = $("cbtStart"); if (btn) btn.onclick = cbtStart;
  }
  function cbtStart() {
    var subj = $("cbtSub") ? $("cbtSub").value : state.subj;
    var cls = $("cbtCls") ? $("cbtCls").value : state.cls;
    var cnt = +($("cbtCount") ? $("cbtCount").value : 20);
    var mins = +($("cbtMins") ? $("cbtMins").value : 60);
    var name = $("cbtName") ? $("cbtName").value.trim() : "";
    var school = $("cbtSchool") ? $("cbtSchool").value.trim() : "";
    var agree = $("cbtAgree") ? $("cbtAgree").checked : false;
    if (!name) return toast("Enter the candidate name", "⚠️");
    if (!agree) return toast("Tick the rules box before starting", "⚠️");
    var ci = classList().indexOf(cls); if (ci < 0) ci = 2;
    var qs = shuffle(questionsFor(ci, subj)).slice(0, cnt);
    if (qs.length < cnt) return toast("Not enough questions for that class and subject", "⚠️");
    CBT = {
      subj: subj, cls: cls, name: name, school: school, mins: mins, count: cnt,
      qs: qs, idx: 0, answers: {}, flags: {}, started: Date.now(), deadline: Date.now() + mins * 60000, submitted: false, timer: null
    };
    cbtIntro();
  }
  function cbtIntro() {
    var b = body(); if (!b || !CBT) return;
    b.innerHTML = '<div class="edu-sec"><h3>💻 CBT — confirm and begin</h3>'
      + '<div class="edu-card">'
      + '<p><b>Candidate:</b> ' + esc(CBT.name) + (CBT.school ? "<br><b>School/Centre:</b> " + esc(CBT.school) : "") + "</p>"
      + '<p><b>Class:</b> ' + esc(CBT.cls) + ' · <b>Subject:</b> ' + esc(CBT.subj) + "<br><b>Questions:</b> " + CBT.count + " · <b>Time:</b> " + CBT.mins + " minutes</p>"
      + '<div class="edu-rules"><b>INSTRUCTIONS</b><ul>'
      + "<li>Answer ALL questions. Each question carries 1 mark.</li>"
      + "<li>Every question has four options A–D. Choose only one.</li>"
      + "<li>There is no negative marking.</li>"
      + "<li>Use the flag button to mark a question for revision.</li>"
      + "<li>Do not open other tabs or windows while the test is running.</li>"
      + "</ul></div>"
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">'
      + '<button type="button" class="edu-btn gold" onclick="EDU.cbtBegin()">▶ Begin CBT</button>'
      + '<button type="button" class="edu-btn" onclick="EDU.go(\'cbt\')">↩ Back to setup</button>'
      + "</div></div></div>";
  }
  function cbtBegin() {
    if (!CBT) return;
    var m = $("eduModal"); if (!m) return;
    var header = '<div class="edu-cbt-top">'
      + '<div><b>💻 CBT</b><small class="edu-cbt-subj">' + esc(CBT.subj) + " · " + esc(CBT.cls) + " · " + CBT.count + " questions</small></div>"
      + '<div class="edu-cbt-timer" id="cbtClock"><b>⏱ ' + fmtTime((CBT.deadline - Date.now()) / 1000) + "</b></div>"
      + '<button type="button" class="edu-mini" onclick="EDU.cbtSubmitNow()">✓ Submit now</button>'
      + "</div>";
    m.innerHTML = shellHtml("cbt").replace('<div class="edu-body" id="eduSBody"></div>', '<div class="edu-body" id="eduSBody">' + header + '<div class="edu-cbt" id="cbtBody"></div></div>');
    cbtPaint();
    if (CBT.timer) clearInterval(CBT.timer);
    CBT.timer = setInterval(cbtTick, 1000);
  }
  function cbtTick() {
    if (!CBT || CBT.submitted) return;
    var left = Math.max(0, Math.round((CBT.deadline - Date.now()) / 1000));
    var c = $("cbtClock"); if (c) c.innerHTML = "<b>⏱ " + fmtTime(left) + "</b>";
    if (left <= 0) cbtSubmitNow(true);
  }
  function cbtPaint() {
    var b = $("cbtBody"); if (!b || !CBT) return;
    var q = CBT.qs[CBT.idx] || {};
    var ans = CBT.answers[CBT.idx];
    var flags = [];
    CBT.qs.forEach(function (x, i) {
      flags.push('<button type="button" class="edu-cell' + (CBT.answers[i] !== undefined ? " done" : "") + (CBT.flags[i] ? " flag" : "") + (i === CBT.idx ? " on" : "") + '" onclick="EDU.cbtGo(' + i + ')" title="Question ' + (i + 1) + '">' + (i + 1) + "</button>");
    });
    var answered = Object.keys(CBT.answers).length;
    var flagCount = Object.keys(CBT.flags).length;
    b.innerHTML =
      '<div class="edu-cbt-q">'
      + '<div class="edu-cbt-qhead"><span class="edu-cell on">' + (CBT.idx + 1) + "</span><b>" + esc(CBT.subj) + "</b><small>" + esc(CBT.cls) + " · CBT</small><button type='button' class='edu-mini' onclick='EDU.cbtFlag()'>" + (CBT.flags[CBT.idx] ? "🚩 Flagged" : "🚩 Flag") + "</button></div>"
      + '<div class="edu-cbt-qtext">' + esc(q.q) + "</div>"
      + '<div class="edu-opts">' + (q.o || []).map(function (o, k) {
        return '<button type="button" class="edu-opt' + (ans === k ? " on" : "") + '" onclick="EDU.cbtPick(' + k + ')">' + ["A", "B", "C", "D"][k] + ". " + esc(o) + "</button>";
      }).join("") + "</div>"
      + "</div>"
      + '<div class="edu-cbt-actions">'
      + '<button type="button" class="edu-btn" onclick="EDU.cbtPrev()" ' + (CBT.idx === 0 ? "disabled" : "") + ">← Previous</button>"
      + '<button type="button" class="edu-btn gold" onclick="EDU.cbtNext()" ' + (CBT.idx >= CBT.count - 1 ? "disabled" : "") + ">Next →</button>"
      + "</div>"
      + '<div class="edu-grid"><div class="edu-card"><b>Answer sheet</b><div class="edu-sheet">' + flags.join("") + "</div></div>"
      + '<div class="edu-card"><h5>Progress</h5><div class="edu-bar"><div style="width:' + Math.round(answered / CBT.count * 100) + '%"></div></div>'
      + "<p>" + answered + " answered · " + flagCount + " flagged</p></div></div>";
  }
  function cbtPick(i) {
    if (!CBT) return;
    CBT.answers[CBT.idx] = i;
    cbtPaint();
  }
  function cbtFlag() {
    if (!CBT) return;
    CBT.flags[CBT.idx] = !CBT.flags[CBT.idx];
    cbtPaint();
  }
  function cbtGo(i) { if (CBT) { CBT.idx = Math.max(0, Math.min(CBT.count - 1, i)); cbtPaint(); } }
  function cbtPrev() { cbtGo((CBT ? CBT.idx : 0) - 1); }
  function cbtNext() { cbtGo((CBT ? CBT.idx : 0) + 1); }
  function cbtSubmitNow() {
    if (!CBT || CBT.submitted) return;
    var n = CBT.qs.length;
    var answered = Object.keys(CBT.answers).length;
    if (answered < n) {
      var ok = confirm("You have answered " + answered + " of " + n + " questions. Submit anyway?");
      if (!ok) return;
    }
    if (CBT.timer) { clearInterval(CBT.timer); CBT.timer = null; }
    CBT.submitted = true;
    cbtReview();
  }
  function cbtReview() {
    if (!CBT) return;
    var m = $("eduModal"); if (!m) return;
    var total = CBT.qs.length, correct = 0;
    CBT.qs.forEach(function (q, i) { if (CBT.answers[i] === q.a) correct++; });
    var pct = Math.round(correct / total * 100);
    var timeUsed = Math.round((Date.now() - CBT.started) / 1000);
    var grade = gradeFor(pct);
    var head = '<div class="edu-cbt-top"><div><b>📄 CBT Result</b><small class="edu-cbt-subj">' + esc(CBT.subj) + " · " + esc(CBT.cls) + "</small></div>"
      + '<button type="button" class="edu-mini" onclick="EDU.cbtPrint()">🖨 Print result slip</button></div>';
    m.innerHTML = shellHtml("cbt").replace('<div class="edu-body" id="eduSBody"></div>',
      '<div class="edu-body" id="eduSBody">' + head +
      '<div class="edu-result">'
      + '<div class="edu-result-grid">'
      + '<div><b>Candidate</b><span>' + esc(CBT.name) + "</span></div>"
      + '<div><b>Class / Subject</b><span>' + esc(CBT.cls) + " · " + esc(CBT.subj) + "</span></div>"
      + '<div><b>Score</b><span>' + correct + " / " + total + " (" + pct + "%)</span></div>"
      + '<div><b>Grade</b><span class="edu-grade">' + grade + "</span></div>"
      + '<div><b>Time used</b><span>' + fmtTime(timeUsed) + "</span></div>"
      + '<div><b>Verdict</b><span>' + esc(verdictFor(pct)) + "</span></div>"
      + "</div>"
      + '<div class="edu-bar"><div style="width:' + pct + '%"></div></div>'
      + "</div>"
      + '<h4>Review &amp; explanations</h4>'
      + CBT.qs.map(function (q, i) {
        var a = CBT.answers[i];
        var ok = a === q.a;
        return '<div class="edu-q">'
          + '<div class="edu-qhead"><b>Q' + (i + 1) + "</b>" + (CBT.flags[i] ? "<span class=\"edu-tag\">🚩 Flagged</span>" : "") + "<span class=\"edu-tag " + (ok ? "ok" : "no") + "\">" + (ok ? "✓ Correct" : "✗ Wrong") + "</span></div>"
          + '<div class="edu-qtext">' + esc(q.q) + "</div>"
          + '<div class="edu-opts">' + (q.o || []).map(function (o, k) {
            var cls = "edu-opt" + (k === q.a ? " ok" : (k === a ? " no" : ""));
            return '<div class="' + cls + '">' + ["A", "B", "C", "D"][k] + ". " + esc(o) + (k === q.a ? " ✓" : "") + "</div>";
          }).join("") + "</div>"
          + '<div class="edu-exp" style="display:block"><b>Explanation:</b> ' + esc(q.e) + "</div>"
          + "</div>";
      }).join("")
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">'
      + '<button type="button" class="edu-btn gold" onclick="EDU.cbtBegin()">↺ Retake</button>'
      + '<button type="button" class="edu-btn" onclick="EDU.go(\'cbt\')">↩ New CBT</button>'
      + '<button type="button" class="edu-btn" onclick="EDU.go(\'notes\')">📚 Go to lesson notes</button>'
      + "</div></div>");
  }
  function cbtPrint() {
    if (!CBT) return;
    var total = CBT.qs.length, correct = 0;
    CBT.qs.forEach(function (q, i) { if (CBT.answers[i] === q.a) correct++; });
    var pct = Math.round(correct / total * 100);
    var w = window.open("", "cbtResult", "width=760,height=900");
    if (!w) return toast("Allow pop-ups to print the result", "⚠️");
    w.document.write("<!DOCTYPE html><html><head><meta charset='utf-8'><title>CBT Result</title><style>body{font-family:Georgia,serif;padding:24px;color:#111}table{width:100%;border-collapse:collapse;margin:14px 0}td,th{border:1px solid #999;padding:7px;text-align:left}.g{font-size:1.4rem;color:#1a6}</style></head><body>"
      + "<h1>NIGERIAN SENIOR SECONDARY CBT — RESULT SLIP</h1><p>© merebari web · generated by My Personal Study App</p>"
      + "<table><tr><td><b>Candidate</b></td><td>" + esc(CBT.name) + "</td><td><b>School / Centre</b></td><td>" + esc(CBT.school || "—") + "</td></tr>"
      + "<tr><td><b>Class</b></td><td>" + esc(CBT.cls) + "</td><td><b>Subject</b></td><td>" + esc(CBT.subj) + "</td></tr>"
      + "<tr><td><b>Date</b></td><td>" + new Date().toLocaleDateString("en-GB") + "</td><td><b>Time used</b></td><td>" + fmtTime((Date.now() - CBT.started) / 1000) + "</td></tr>"
      + "<tr><td><b>Score</b></td><td>" + correct + " / " + total + " (" + pct + "%)</td><td><b>Grade</b></td><td class='g'>" + gradeFor(pct) + "</td></tr></table>"
      + "<p>" + esc(verdictFor(pct)) + "</p>"
      + "<p><small>This result slip is a practice record, not an official examination certificate.</small></p></body></html>");
    w.document.close(); w.focus();
    setTimeout(function () { try { w.print(); } catch (e) {} }, 350);
  }

  /* ---------- scheme of work ---------- */
  function schemeRoute() {
    var b = body(); if (!b) return;
    var subs = subjectList(), cls = state.cls || "SS3";
    b.innerHTML = '<div class="edu-sec"><h3>🗓 Scheme of Work</h3>'
      + '<p class="edu-lede">A suggested term-by-term scope and sequence (1st, 2nd and 3rd terms) for every SS1–SS3 subject. It maps to the same topics used by the question bank and lesson notes, so a teacher can plan straight into the app.</p>'
      + '<div class="edu-pickrow">'
      + '<label>Class <select class="edu-sel" id="schCls">' + classList().map(function (c) { return '<option value="' + esc(c) + '"' + (c === cls ? " selected" : "") + '>' + esc(c) + "</option>"; }).join("") + "</select></label>"
      + '<label>Subject <select class="edu-sel" id="schSub">' + subs.map(function (s) { return '<option value="' + esc(s) + '"' + (s === state.subj ? " selected" : "") + '>' + esc(s) + "</option>"; }).join("") + "</select></label>"
      + "</div>"
      + '<div class="edu-scheme" id="schBody">' + schemeHtml(state.subj, cls) + "</div></div>";
    var sc = $("schCls"), ss = $("schSub");
    if (sc) sc.onchange = function () { state.cls = sc.value; $("schBody").innerHTML = schemeHtml(state.subj, state.cls); };
    if (ss) ss.onchange = function () { state.subj = ss.value; $("schBody").innerHTML = schemeHtml(state.subj, state.cls); };
  }
  function schemeHtml(subj, cls) {
    var rows = schemeFor(subj, cls);
    if (!rows.length) return "<p class=\"edu-empty\">No scheme available for this subject yet.</p>";
    return '<div class="edu-grid3">' + rows.map(function (r) {
      var meta = r[0];
      var items = r[1].map(function (w) {
        return '<div class="edu-week"><b>' + esc(w.week) + "</b><span>" + esc(w.topic) + "</span></div>";
      }).join("");
      return '<div class="edu-card"><h4>' + esc(meta.term) + '</h4><small class="edu-sub-label">' + esc(meta.focus) + "</small><div class=\"edu-weeklist\">" + items + "</div></div>";
    }).join("") + "</div>" +
      '<div class="edu-note" style="margin-top:12px"><b>Teaching tip.</b> Use one week on each row. Link each topic to its lesson note in the <b>📚 Lesson Notes</b> tab, then set the class a 10-question CBT from the <b>💻 CBT</b> tab at the end of every unit.</div>';
  }

  /* ---------- syllabus ---------- */
  function syllabusRoute() {
    var b = body(); if (!b) return;
    var subs = subjectList(), cls = state.cls || "SS3";
    b.innerHTML = '<div class="edu-sec"><h3>🧭 SS1–SS3 Syllabus Map</h3>'
      + '<p class="edu-lede">The full Senior Secondary syllabus for the 13 subjects covered by the app. Every topic group in the map has a lesson note, questions and a scheme-of-work slot, so teachers can see the whole three-year course at a glance.</p>'
      + '<div class="edu-pickrow"><label>Class <select class="edu-sel" id="sylCls">' + classList().map(function (c) { return '<option value="' + esc(c) + '"' + (c === cls ? " selected" : "") + '>' + esc(c) + "</option>"; }).join("") + "</select></label></div>"
      + '<div class="edu-grid" id="sylBody">' + syllabusHtml(cls) + "</div></div>";
    var sc = $("sylCls"); if (sc) sc.onchange = function () { state.cls = sc.value; $("sylBody").innerHTML = syllabusHtml(state.cls); };
  }
  function syllabusHtml(cls) {
    var subs = subjectList();
    return '<div class="edu-grid3">' + subs.map(function (s) {
      var topics = topicsOf(s);
      var items = topics.map(function (t) { return '<span class="edu-pill">' + esc(t[0]) + "</span>"; }).join("");
      return '<div class="edu-card"><h4>' + esc(s) + ' <small>' + esc(cls) + "</small></h4>" +
        '<p class="edu-sub-label">' + esc(subjectCurriculum(s)) + "</p>" + (items || "<p class=\"edu-empty\">No topics listed.</p>") + "</div>";
    }).join("") + "</div>";
  }

  /* ---------- marking guide ---------- */
  function marksRoute() {
    var b = body(); if (!b) return;
    var grades = [
      [75, 100, "A1", "Excellent; distinction-level performance."],
      [70, 74, "B2", "Very good; clearly above average."],
      [65, 69, "B3", "Good; strong credit performance."],
      [60, 64, "C4", "Good; above average."],
      [55, 59, "C5", "Fair credit; adequate."],
      [50, 54, "C6", "Credit pass; sufficiency."],
      [45, 49, "D7", "Pass; weak but acceptable."],
      [40, 44, "E8", "Pass; fail threshold."],
      [0, 39, "F9", "Fail."]
    ];
    b.innerHTML = '<div class="edu-sec"><h3>🏅 Marking Guide</h3>'
      + '<p class="edu-lede">The widely-used WAEC/NECO 9-point grading scale, plus quick marking rules for teachers marking CBT results in class.</p>'
      + '<div class="edu-card"><h4>Grade scale</h4><table class="edu-table"><thead><tr><th>Score (%)</th><th>Grade</th><th>Description</th></tr></thead><tbody>'
      + grades.map(function (g) { return "<tr><td>" + g[0] + "–" + g[1] + "</td><td><b>" + g[2] + "</b></td><td>" + esc(g[3]) + "</td></tr>"; }).join("")
      + "</tbody></table></div>"
      + '<div class="edu-grid2">'
      + '<div class="edu-card"><h4>Marking rules</h4><ul>'
      + "<li>Each objective question carries 1 mark; there is no negative marking.</li>"
      + "<li>Score = correct answers ÷ total questions × 100.</li>"
      + "<li>A candidate who scores below C6 should redo the lesson and retake a shorter test.</li>"
      + "<li>Flags and unfinished questions are the best revision targets — not the questions the candidate already knew.</li>"
      + "</ul></div>"
      + '<div class="edu-card"><h4>Teacher’s quick checklist</h4><ul>'
      + "<li>Has the whole class seen the topic’s key facts?</li>"
      + "<li>Did the class attempt the worked example before the answer was revealed?</li>"
      + "<li>Which two topics need reteaching next week?</li>"
      + "<li>Are the weakest students getting a 10-question CBT for confidence?</li>"
      + "</ul></div></div>"
      + '<div class="edu-note"><b>Tip.</b> Use the <b>💻 CBT</b> tab to generate a test, then this guide to grade the result slip instantly.</div></div>';
  }

  /* ---------- css ---------- */
  function injectCss() {
    if ($("eduCss")) return;
    var c = DOC.createElement("style");
    c.id = "eduCss";
    c.textContent =
      ".edu-launcher{position:fixed;right:14px;top:calc(14px + env(safe-area-inset-top));z-index:99;display:inline-flex;align-items:center;min-height:40px;gap:8px;background:var(--card-solid,#fff);border:1px solid var(--card-border,#d8cdb4);border-radius:999px;padding:8px 14px;cursor:pointer;box-shadow:var(--shadow,0 8px 24px -12px rgba(0,0,0,.35));color:var(--ink,#1c1626);font-family:inherit;font-size:.82rem;font-weight:700;transition:.2s}.edu-launcher:hover{transform:translateY(-2px);border-color:var(--gold,#c9a25f)}.edu-launch-ico{font-size:1.15rem}.edu-launch-txt{display:none}@media(min-width:520px){.edu-launch-txt{display:inline}}" +
      ".edu-ov{position:fixed;inset:0;z-index:160;background:rgba(10,8,16,.55);display:flex;align-items:center;justify-content:center;padding:10px}.edu-modal{position:relative;width:min(950px,100%);max-height:92vh;overflow:auto;background:var(--bg,#f5efe4);color:var(--ink,#1c1626);border-radius:18px;box-shadow:0 30px 70px -20px rgba(0,0,0,.5)}.edu-head{position:sticky;top:0;z-index:3;display:flex;align-items:center;gap:12px;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--card-border,#ddd2b8);background:var(--card-solid,#fffaf0)}.edu-brand b{display:block;font-size:1.05rem}.edu-brand small{color:var(--mut,#7b736a);font-size:.7rem}.edu-x{background:transparent;border:1px solid var(--card-border,#ddd2b8);border-radius:50%;width:40px;height:40px;cursor:pointer;font-size:1rem;color:var(--ink)}.edu-tabs{display:flex;gap:6px;overflow-x:auto;padding:10px 14px;border-bottom:1px solid var(--card-border,#ddd2b8);background:var(--card-solid,#fffaf0)}.edu-tab{border:1px solid var(--card-border,#ddd2b8);background:var(--bg,#f5efe4);color:var(--ink);border-radius:999px;padding:8px 12px;font-size:.78rem;cursor:pointer;white-space:nowrap;font-family:inherit}.edu-tab.on{background:var(--green-d,#1f8a68);border-color:var(--green-d,#1f8a68);color:#fff}.edu-body{padding:16px 18px 24px}.edu-foot{padding:10px 18px;border-top:1px solid var(--card-border,#ddd2b8);color:var(--mut,#7b736a);font-size:.68rem;text-align:center;background:var(--card-solid,#fffaf0)}" +
      ".edu-sec h3{font-size:1.25rem;margin:2px 0 8px;color:var(--green-d,#1f8a68)}.edu-lede{font-size:.86rem;line-height:1.6;color:var(--ink-2,#3f3a47);margin:0 0 16px;max-width:760px}.edu-pickrow{display:flex;gap:10px;flex-wrap:wrap;align-items:end;margin:10px 0}.edu-pickrow label,.edu-field{display:flex;flex-direction:column;font-size:.7rem;letter-spacing:.05em;color:var(--mut,#7b736a);text-transform:uppercase;font-weight:700}.edu-sel,.edu-input{border:1.5px solid var(--chip-border,#c9bd9d);background:var(--opt-bg,#fffaf0);color:var(--ink,#1c1626);border-radius:10px;padding:10px 12px;margin-top:4px;font-size:.9rem;font-family:inherit;min-width:150px}.edu-input{min-width:0;width:100%;text-transform:none}.edu-card{background:var(--card,#fffaf0);border:1px solid var(--card-border,#ddd2b8);border-radius:14px;padding:14px 16px;margin-bottom:14px}.edu-card h4{margin:0 0 8px;font-size:.96rem;color:var(--gold-d,#8a5f24)}.edu-card h5{margin:4px 0 8px;font-size:.88rem;color:var(--green-d,#1f8a68)}.edu-card-mini{background:var(--panel,#f7f0e2);border:1px dashed var(--card-border,#ddd2b8);border-radius:10px;padding:10px 12px;margin:8px 0;font-size:.86rem;line-height:1.7;color:var(--ink-2,#3f3a47)}.edu-grid{display:grid;gap:14px}.edu-grid2{display:grid;gap:14px;grid-template-columns:1fr;margin-top:14px}@media(min-width:860px){.edu-grid2{grid-template-columns:1fr 1fr}.edu-grid3{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}}@media(max-width:860px){.edu-grid3{grid-template-columns:1fr}}" +
      ".edu-chiprow{display:flex;flex-wrap:wrap;gap:7px;margin:8px 0}.edu-chip{border:1.5px solid var(--chip-border,#c9bd9d);background:var(--chip-bg,#fffaf0);color:var(--ink);padding:7px 11px;border-radius:999px;font-size:.76rem;cursor:pointer;font-family:inherit}.edu-chip.on{background:var(--green-d,#1f8a68);border-color:var(--green-d,#1f8a68);color:#fff}.edu-sub{margin-top:12px}.edu-sub h4,.edu-sub b{color:var(--ink)}.edu-sub ul{margin:6px 0 0;padding-left:18px;font-size:.86rem;line-height:1.7}.edu-note{font-size:.86rem;line-height:1.68;color:var(--ink-2,#3f3a47)}.edu-btn{border:1.5px solid var(--chip-border,#c9bd9d);background:var(--opt-bg,#fffaf0);color:var(--ink);border-radius:999px;padding:9px 14px;font-size:.8rem;cursor:pointer;font-family:inherit}.edu-btn.gold{background:var(--green-d,#1f8a68);border-color:var(--green-d,#1f8a68);color:#fff}.edu-btn:hover{border-color:var(--gold,#c9a25f)}.edu-btn[disabled]{opacity:.45;cursor:not-allowed}" +
      ".edu-q{background:var(--panel,#f7f0e2);border:1px solid var(--card-border,#ddd2b8);border-radius:12px;padding:11px 13px;margin-bottom:10px}.edu-qhead{display:flex;align-items:center;gap:8px;font-size:.74rem;color:var(--mut,#7b736a);margin-bottom:7px}.edu-qhead b{font-size:.95rem;color:var(--green-d,#1f8a68)}.edu-qtext{font-size:.95rem;line-height:1.55;margin-bottom:9px}.edu-opts{display:grid;gap:7px;margin-bottom:8px}.edu-opt{text-align:left;border:1.5px solid var(--opt-border,#d4c8aa);background:var(--opt-bg,#fffaf0);color:var(--ink);border-radius:10px;padding:9px 11px;font-size:.86rem;cursor:pointer;font-family:inherit}.edu-opt.on,.edu-opt.ok{border-color:var(--green-2,#1f8a68);background:var(--green-l,#e4f2ec)}.edu-opt.no{border-color:var(--red,#c0392b);background:var(--red-l,#fbe9e7)}.edu-mini{border:1px solid var(--card-border,#ddd2b8);background:transparent;border-radius:999px;padding:6px 10px;font-size:.72rem;cursor:pointer;color:var(--ink);font-family:inherit}.edu-tag{background:var(--panel,#f7f0e2);border-radius:999px;padding:2px 8px;font-size:.68rem}.edu-tag.ok{background:var(--green-l,#e4f2ec);color:#1a6a4a}.edu-tag.no{background:var(--red-l,#fbe9e7);color:#a93226}.edu-exp{font-size:.83rem;line-height:1.6;color:var(--ink-2,#3f3a47);background:var(--green-l,#e4f2ec);border-radius:9px;padding:8px 10px;margin-top:7px}.edu-empty{color:var(--mut,#7b736a);font-size:.85rem}" +
      ".edu-check{display:flex;gap:8px;align-items:flex-start;font-size:.78rem;color:var(--ink-2,#3f3a47);line-height:1.5;margin-top:12px}.edu-help li{font-size:.82rem;line-height:1.65}.edu-rules{background:var(--panel,#f7f0e2);border:1px dashed var(--card-border,#ddd2b8);border-radius:10px;padding:10px 14px;margin-top:12px;font-size:.8rem}.edu-rules li{line-height:1.7}.edu-cbt-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:space-between;padding:8px 0 10px;border-bottom:1px solid var(--card-border,#ddd2b8);margin-bottom:12px}.edu-cbt-subj{display:block;font-size:.72rem;color:var(--mut,#7b736a)}.edu-cbt-timer{font-size:1.2rem;font-weight:900;color:var(--green-d,#1f8a68);font-variant-numeric:tabular-nums}.edu-cbt{max-width:720px;margin:0 auto}.edu-cbt-qhead{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:.8rem;margin-bottom:10px;color:var(--mut,#7b736a)}.edu-cbt-qtext{font-size:1.08rem;line-height:1.65;margin-bottom:14px}.edu-cbt-actions{display:flex;gap:8px;justify-content:space-between;margin:14px 0}.edu-sheet{display:grid;grid-template-columns:repeat(auto-fill,minmax(34px,1fr));gap:6px;margin-top:8px}.edu-cell{width:34px;height:34px;border-radius:9px;border:1.5px solid var(--chip-border,#c9bd9d);background:var(--opt-bg,#fffaf0);font-size:.74rem;cursor:pointer;color:var(--ink);font-family:inherit}.edu-cell.done{background:var(--green-l,#e4f2ec);border-color:var(--green-2,#1f8a68)}.edu-cell.flag{border-style:dashed;border-color:var(--gold,#c9a25f)}.edu-cell.on{background:var(--green-d,#1f8a68);color:#fff;border-color:var(--green-d,#1f8a68)}.edu-bar{height:12px;border-radius:999px;background:var(--bar-track,#e7ddc6);overflow:hidden;margin:8px 0}.edu-bar>div{height:100%;background:linear-gradient(90deg,var(--gold-d,#8a5f24),var(--gold,#c9a25f))}" +
      ".edu-result{background:var(--card,#fffaf0);border:1px solid var(--card-border,#ddd2b8);border-radius:14px;padding:16px;margin-bottom:14px}.edu-result-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:10px}.edu-result-grid b{display:block;font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;color:var(--mut,#7b736a);margin-bottom:3px}.edu-result-grid span{font-size:.92rem;font-weight:700}.edu-grade{color:var(--green-d,#1f8a68);font-size:1.3rem}" +
      ".edu-scheme{margin-top:14px}.edu-weeklist{display:flex;flex-direction:column;gap:5px;margin-top:10px}.edu-week{display:flex;justify-content:space-between;gap:10px;border:1px solid var(--card-border,#ddd2b8);border-radius:9px;padding:7px 9px;font-size:.78rem;background:var(--panel,#f7f0e2)}.edu-week b{color:var(--gold-d,#8a5f24)}.edu-week span{color:var(--ink-2,#3f3a47);text-align:right}.edu-sub-label{display:block;font-size:.75rem;line-height:1.55;color:var(--mut,#7b736a);margin-bottom:8px}.edu-pill{display:inline-block;background:var(--panel,#f7f0e2);border:1px solid var(--card-border,#ddd2b8);border-radius:999px;padding:4px 9px;font-size:.72rem;margin:2px;color:var(--ink-2,#3f3a47)}.edu-table{width:100%;border-collapse:collapse;font-size:.82rem}.edu-table th,.edu-table td{border:1px solid var(--card-border,#ddd2b8);padding:7px 9px;text-align:left}.edu-table th{background:var(--panel,#f7f0e2);color:var(--gold-d,#8a5f24)}" +
      "@media(max-width:560px){.edu-modal{border-radius:14px}.edu-body{padding:12px 12px 20px}.edu-launcher{right:10px;top:10px}.edu-pickrow .edu-sel{min-width:100%}.edu-btn{width:100%}}";
    DOC.head.appendChild(c);
  }

  /* ---------- exposed ---------- */
  function go(kind) {
    if (kind === "close") return close();
    if (["notes", "cbt", "scheme", "syllabus", "marks"].indexOf(kind) >= 0) state.route = kind;
    open(state.route);
  }
  function topic(t) { state.topic = t; paint(); }

  injectCss();
  injectLauncher();

  window.EDU = window.EDU || {};
  window.EDU.ready = true;
  window.EDU.go = go;
  window.EDU.close = close;
  window.EDU.open = open;
  window.EDU.topic = topic;
  window.EDU.reveal = reveal;
  window.EDU.lessonPrint = lessonPrint;
  window.EDU.lessonDrill = lessonDrill;
  window.EDU.cbtBegin = cbtBegin;
  window.EDU.cbtPick = cbtPick;
  window.EDU.cbtFlag = cbtFlag;
  window.EDU.cbtGo = cbtGo;
  window.EDU.cbtPrev = cbtPrev;
  window.EDU.cbtNext = cbtNext;
  window.EDU.cbtSubmitNow = cbtSubmitNow;
  window.EDU.cbtPrint = cbtPrint;
})();
