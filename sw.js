/* OFFLINE: service worker — after the first visit the whole app is cached, so
   it re-opens instantly and works with zero network (airplane mode). While
   online the network is tried first so updates arrive on the next visit.
   Bump NSS_V on every release. */
const NSS_V = "nssc-v20260907" + "-v15"; /* v15 — complete SS1–SS3 curriculum library: 684-topic term-by-term syllabus index and 19-subject lesson-note + question library (quiz/_syllabus_data.js, quiz/_curr_data.js). */
const NSS_CORE = ["./", "./index.html", "./sw.js", "./edu.js"];
/* labs.js is NOT in NSS_CORE on purpose: the runtime fetch handler below caches
   it the first time it is requested online, so an offline first-visit install
   (which must never fail) stays independent of it. */

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(NSS_V).then(function (c) {
    return c.addAll(NSS_CORE);
  }).then(function () {
    return self.skipWaiting();
  }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) {
      if (k !== NSS_V) return caches.delete(k);
    }));
  }).then(function () {
    return self.clients.claim();
  }));
});

self.addEventListener("fetch", function (e) {
  var u;
  try { u = new URL(e.request.url); } catch (err) { return; }
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  if (u.pathname.slice(-6) === "/sw.js") return;              // always re-checked by the browser
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res && res.ok) {
        var cl = res.clone();
        caches.open(NSS_V).then(function (c) { c.put(e.request, cl); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (m) {
        return m || caches.match("./index.html");             // any offline navigation still loads the app
      });
    })
  );
});
