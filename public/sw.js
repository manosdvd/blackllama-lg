const CACHE_NAME = "lawton-public-v3";
const PUBLIC_ASSETS = [
  "/images/CLlogo.png",
  "/images/PXL_20260612_151123910~2.jpg",
  "/images/PXL_20260607_155608710.jpg",
  "/images/PXL_20260605_172059179.PANO.jpg",
  "/images/Image_5.jpg",
  "/map/camp-lawton-map.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PUBLIC_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((names) => Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isPrivateOrDynamic = url.pathname.startsWith("/api/") || url.pathname.startsWith("/staff") || url.pathname.startsWith("/workspace") || url.pathname.endsWith(".rsc");
  if (isPrivateOrDynamic) return;

  if (PUBLIC_ASSETS.includes(url.pathname)) {
    event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => new Response("Camp Lawton Leader Hub is offline. Reconnect to view current camp information.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } })));
  }
});
