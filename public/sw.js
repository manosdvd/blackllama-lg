const CACHE_NAME = 'lawton-cache-v1';

const URLS_TO_CACHE = [
  '/',
  '/images/CLlogo.png',
  '/images/cllogospin.gif',
  '/images/PXL_20260612_151123910~2.jpg',
  '/images/PXL_20260607_155608710.jpg',
  '/images/PXL_20260605_172059179.PANO.jpg',
  '/images/Image_5.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // We only want to cache GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cache hit, or fetch from network and cache it
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // Ignore API calls and chrome-extensions etc
                if(event.request.url.startsWith('http') && !event.request.url.includes('api.weather.gov')) {
                   cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        ).catch(() => {
            // Fallback for offline if not in cache
        });
      })
  );
});
