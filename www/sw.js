var CACHE='mv-v7';
var SHELL=['/','index.html','manifest.json'];

self.addEventListener('install',function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()})
  )
});
self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()})
  )
});
self.addEventListener('fetch',function(e){
  var url=e.request.url;
  // запросы времени — всегда напрямую в сеть, без кэша
  if(url.indexOf('worldtimeapi.org')>-1||url.indexOf('timeapi.io')>-1||url.indexOf('cdn-cgi/trace')>-1||e.request.method==='HEAD')return;
  // Firebase и внешние запросы — только сеть
  if(url.indexOf('firestore.googleapis.com')>-1||url.indexOf('firebase')>-1||url.indexOf('googleapis.com')>-1){
    e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request)}));
    return
  }
  // shell — сначала сеть (чтобы обновления сайта сразу доходили), кэш только офлайн
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(function(res){
      var clone=res.clone();
      caches.open(CACHE).then(function(c){c.put(e.request,clone)});
      return res
    }).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('index.html')})})
  )
});
