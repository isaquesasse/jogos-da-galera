// Guarda o app todo no celular para funcionar offline.
// Ao criar um arquivo novo, adicione em FILES e aumente VERSION.
const VERSION = 'v5';
const FILES = [
  './', 'index.html', 'styles.css', 'app.js', 'core.js', 'logic.js', 'manifest.webmanifest',
  'games/impostor.js', 'games/espiao.js', 'games/palavra-proibida.js', 'games/misterios.js', 'games/nem-a-pato.js', 'games/pergunta.js',
  'data/impostor.js', 'data/espiao.js', 'data/palavra-proibida.js', 'data/misterios.js', 'data/nem-a-pato.js', 'data/pergunta.js',
  'fonts/bungee.woff2', 'fonts/rubik.woff2',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // Rede primeiro (pega atualização na hora), cache se estiver offline.
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })),
  );
});
