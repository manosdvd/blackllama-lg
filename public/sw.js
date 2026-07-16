const CACHE_PREFIX = "lawton-public-";
const CACHE_NAME = `${CACHE_PREFIX}v6`;
const CORE_ASSETS = [
  "/offline",
  "/images/logo-ui.webp",
  "/icons/icon-192.png",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((names) => Promise.all(
    names.filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME).map((name) => caches.delete(name)),
  )));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isPrivateOrDynamic = url.pathname.startsWith("/api/")
    || url.pathname.startsWith("/staff")
    || url.pathname.startsWith("/workspace")
    || url.pathname.endsWith(".rsc");
  if (isPrivateOrDynamic) return;

  if (CORE_ASSETS.includes(url.pathname)) {
    event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("/offline")));
  }
});
