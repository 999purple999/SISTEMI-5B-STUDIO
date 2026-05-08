// Simple offline-first service worker
const CACHE = 'sistemi5b-v1';
const PRECACHE = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/js/storage.js',
  './assets/js/quiz.js',
  './assets/js/chapter.js',
  './assets/js/exam.js',
  './data/modules.js',
  './data/content-m1.js',
  './data/content-m1b.js',
  './data/content-m1c.js',
  './data/content-m2.js',
  './data/content-m2b.js',
  './data/content-m3.js',
  './data/content-m4.js',
  './data/content-m4b.js',
  './chapters/m1.html',
  './chapters/m2.html',
  './chapters/m3.html',
  './chapters/m4.html',
  './chapters/exam.html',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(()=>{})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(resp => {
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
