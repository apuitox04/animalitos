const C='animalitos-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',e=>{ self.skipWaiting(); e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS).catch(()=>{}))); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>k!==C?caches.delete(k):0)))); self.clients.claim(); });
self.addEventListener('fetch',e=>{ const req=e.request; if(req.method!=='GET') return;
  if(req.mode==='navigate' || req.destination==='document'){
    e.respondWith(fetch(req).then(r=>{ const cp=r.clone(); caches.open(C).then(c=>c.put('./index.html',cp)).catch(()=>{}); return r; }).catch(()=>caches.match('./index.html').then(r=>r||caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then(r=>r||fetch(req)));
});