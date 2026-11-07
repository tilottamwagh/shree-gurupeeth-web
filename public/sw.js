const CACHE_NAME="gurupeeth-pwa-offline-v1";
const OFFLINE_URL="/offline.html";

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.add(OFFLINE_URL)));
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.filter(name=>name.startsWith("gurupeeth-pwa-")&&name!==CACHE_NAME).map(name=>caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET"||request.mode!=="navigate")return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  event.respondWith(fetch(request).catch(async()=>{
    const offline=await caches.match(OFFLINE_URL);
    return offline||new Response("Offline",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8"}});
  }));
});
