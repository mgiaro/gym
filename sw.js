const C="corpo-libero-v1";
const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
// rete prima per la pagina (così gli aggiornamenti arrivano), cache come riserva offline
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
 e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{});return res;}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));});
