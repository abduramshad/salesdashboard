/* myG Sales Dashboard: service worker (offline support)
   - precaches the app shell, icons and the bundled libraries
   - navigations: network first, falling back to the cached page when offline
   - same-origin files: cache first, refreshed in the background
   - requests to other origins (Google Sheets, UPI) always go straight to the network
   Bump VERSION when you change any cached file. */
const VERSION='myg-sales-v1';
const SHELL=['./','./index.html','./manifest.json','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png',
  './vendor/chart.umd.js','./vendor/xlsx.full.min.js','./vendor/qrcode.js'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;                 // Google, UPI etc.: network only
  if(req.mode==='navigate'){
    e.respondWith(
      fetch(req).then(res=>{const copy=res.clone();caches.open(VERSION).then(c=>c.put('./index.html',copy));return res})
        .catch(()=>caches.match('./index.html').then(r=>r||caches.match('./')))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(hit=>{
      const net=fetch(req).then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(VERSION).then(c=>c.put(req,copy))}return res}).catch(()=>hit);
      return hit||net;
    })
  );
});
