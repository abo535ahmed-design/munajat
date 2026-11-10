const V="munajat-v5",F=["./","index.html","manifest.webmanifest","icon-v5-192.png","icon-v5-512.png","icon-v5-512-maskable.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const r=e.request;
 if(r.method!="GET"||new URL(r.url).origin!=location.origin)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r).then(n=>{if(n.ok){const k=n.clone();caches.open(V).then(x=>x.put(r,k))}return n}).catch(()=>caches.match("index.html"))));
});
