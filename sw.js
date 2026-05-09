// Service worker — offline-first PWA con auto-update notification
// Strategia:
//   - precaching minimo (shell)
//   - runtime cache: same-origin → SWR; cross-origin (fonts/CDN) → cache-first
//   - postMessage al client quando una nuova versione è disponibile
const VERSION = 'sistemi5b-v6-2026-05-09';
const STATIC_CACHE = 'static-' + VERSION;
const RUNTIME_CACHE = 'runtime-' + VERSION;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/style.css',
  './assets/css/themes.css',
  './assets/js/app.js',
  './assets/js/storage.js',
  './assets/js/quiz.js',
  './assets/js/chapter.js',
  './assets/js/exam.js',
  './assets/js/flashcards.js',
  './assets/js/study-tools.js',
  './assets/js/pomodoro.js',
  './assets/js/notes.js',
  './assets/js/reading-bar.js',
  './assets/js/shortcuts.js',
  './assets/js/tts.js',
  './assets/js/cyberpunk-fx.js',
  './assets/js/customize.js',
  './data/modules.js',
  './data/content-m1.js',
  './data/content-m1b.js',
  './data/content-m1c.js',
  './data/content-m2.js',
  './data/content-m2b.js',
  './data/content-m3.js',
  './data/content-m4.js',
  './data/content-m4b.js',
  './data/content-m4c.js',
  './data/content-m5.js'
];

// Liste di chapter HTML caricate al primo install (per uso offline completo)
const CHAPTER_PAGES = [
  './chapters/m1.html','./chapters/m2.html','./chapters/m3.html','./chapters/m4.html','./chapters/m5.html',
  './chapters/exam.html','./chapters/flashcards.html','./chapters/cheatsheet.html',
  './chapters/mistakes.html','./chapters/mindmap.html','./chapters/tools.html',
  './chapters/glossario.html','./chapters/speed-read.html',
  './chapters/introduzione.html','./chapters/kerckhoffs.html','./chapters/simmetrica.html',
  './chapters/diffie-hellman.html','./chapters/cesare-vernam.html','./chapters/des.html',
  './chapters/asimmetrica.html','./chapters/rsa.html','./chapters/attacchi.html',
  './chapters/firma-digitale.html','./chapters/hash.html','./chapters/ca-certificati.html',
  './chapters/firewall.html','./chapters/acl.html','./chapters/categorie-firewall.html',
  './chapters/proxy.html','./chapters/ip-pubblici-privati.html','./chapters/nat-pat.html',
  './chapters/ipsec.html','./chapters/vpn.html','./chapters/dmz.html','./chapters/tls.html',
  './chapters/datacenter.html','./chapters/classificazione.html','./chapters/interni-esterni.html',
  './chapters/colocation.html','./chapters/virtualizzazione.html','./chapters/cloud.html',
  './chapters/cloud-deploy.html',
  './chapters/cablaggio.html','./chapters/ip-struttura.html','./chapters/ip-speciali.html',
  './chapters/flsm-vlsm.html','./chapters/routing.html','./chapters/ipv6.html',
  './chapters/wireless.html','./chapters/vlan.html','./chapters/dhcp.html','./chapters/dns.html',
  './chapters/http.html','./chapters/hardware-router.html','./chapters/accesso-internet.html',
  './chapters/icmp.html',
  './chapters/caso-logipack.html','./chapters/caso-dataforge.html',
  './chapters/esercizi-dmz.html','./chapters/esercizi-rsa.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async cache => {
      // App shell — fail loud se manca
      await cache.addAll(APP_SHELL).catch(err => console.warn('[SW] shell cache partial:', err));
      // Chapter — best-effort, non bloccare l'install
      cache.addAll(CHAPTER_PAGES).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== STATIC_CACHE && k !== RUNTIME_CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
    // Notifica i client che è arrivata una nuova versione
    const all = await self.clients.matchAll({ type: 'window' });
    all.forEach(c => c.postMessage({ type: 'sw-updated', version: VERSION }));
  })());
});

function isHTML(req) {
  const accept = req.headers.get('accept') || '';
  return req.mode === 'navigate' || accept.includes('text/html');
}
function sameOrigin(url) { return new URL(url).origin === self.location.origin; }

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // HTML navigation: network-first con fallback offline
  if (isHTML(req)) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const c = await caches.open(RUNTIME_CACHE);
        c.put(req, fresh.clone());
        return fresh;
      } catch {
        const cached = await caches.match(req);
        return cached || caches.match('./index.html');
      }
    })());
    return;
  }

  // Same-origin: stale-while-revalidate
  if (sameOrigin(req.url)) {
    event.respondWith((async () => {
      const cached = await caches.match(req);
      const fetchP = fetch(req).then(resp => {
        if (resp && resp.status === 200) {
          caches.open(RUNTIME_CACHE).then(c => c.put(req, resp.clone()));
        }
        return resp;
      }).catch(() => cached);
      return cached || fetchP;
    })());
    return;
  }

  // Cross-origin (Google Fonts, CDN Mermaid/D3): cache-first lungo
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const resp = await fetch(req);
      if (resp && (resp.status === 200 || resp.type === 'opaque')) {
        const c = await caches.open(RUNTIME_CACHE);
        c.put(req, resp.clone());
      }
      return resp;
    } catch {
      return cached || Response.error();
    }
  })());
});

// Permette al client di forzare l'update
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'skip-waiting') self.skipWaiting();
});
