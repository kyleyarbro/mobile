const CACHE = 'watchtower-v4-shell';
const ASSETS = ['./watchtower_v4_mobile.html','./watchtower_v4_manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE ? caches.delete(key) : Promise.resolve()))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.includes('/rest/v1/')) {
    event.respondWith(fetch(event.request).catch(() => new Response(JSON.stringify({ error: 'offline' }), { headers: { 'Content-Type': 'application/json' } })));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(() => {});
      return response;
    }).catch(() => caches.match('./watchtower_v4_mobile.html')))
  );
});
