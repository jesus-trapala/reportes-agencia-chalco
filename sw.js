/* Herramientas · Agencia Chalco · service worker
   · Red primero: siempre se pide la versión más nueva; la copia guardada
     solo se usa cuando no hay señal.
   · Nunca se toca nada de Google (Apps Script, Sheets) ni de otros sitios:
     esos datos siempre llegan frescos.
   Al publicar cambios grandes, sube el número de CACHE para limpiar lo viejo. */
const CACHE = "chalco-2";
const BASE = [
  "./", "./index.html", "./dashboard-ventas-chalco.html", "./concentrador.html",
  "./comparador-semaforos.html", "./checklist-entrega.html", "./manifest.webmanifest",
  "./iconos/icono-192.png", "./iconos/icono-512.png", "./iconos/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).catch(() => {}));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith("chalco-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;   // Google, fuentes, librerías: directo a la red
  if (!url.pathname.startsWith(new URL("./", self.registration.scope).pathname)) return;
  e.respondWith(
    fetch(req, { cache: "no-store" })
      .then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; })
      .catch(() => caches.match(req, { ignoreSearch: true })
        .then(r => r || (req.mode === "navigate" ? caches.match("./index.html") : undefined))
        .then(r => r || Response.error()))
  );
});
