const CACHE = 'brownie-v22';
const ASSETS = ['/index.html', '/manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', e => {
  if(e.request.method!=='GET') return;
  if(e.request.destination==='document'||new URL(e.request.url).pathname==='/'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r;}).catch(()=>caches.match('/index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r;})));
});
