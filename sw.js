/* مناجاة — Service Worker (كاش munajat-v7) */
const V="munajat-v7";
const FILES=["./","index.html","manifest.webmanifest","icon-v5-192.png","icon-v5-512.png","icon-v5-512-maskable.png","tafsir-m.bin","tafsir-s.bin"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(async c=>{for(const u of FILES){try{await c.add(new Request(u,{cache:"reload"}))}catch(x){}}}))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("munajat")&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(r,{ignoreSearch:true});
const net=fetch(r).then(res=>{if(res&&res.ok)c.put(r,res.clone());return res}).catch(()=>null);
if(hit){if(!/\.(bin|png)$/.test(r.url))e.waitUntil(net);return hit}
return (await net)||new Response("",{status:504})}))});
