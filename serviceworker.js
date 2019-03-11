var CACHE_NAME = 'my-pwa-cache-v1';

var urlToCache=[
    '/',
    '/css/main.css',
    '/js/jquery.min.js',
    '/images/ugm.jpg',
    '/js/main.js'
]

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(
            function(cache){
                console.log('service worker do install..');
                return cache.addAll(urlToCache);
            }
        )
    )
});

if('serviceworker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/serviceworker.js').then(function(reg){
            console.log('SW regis sukses dengan skop', reg.scope)
            }, function(err){
                console.log('SW regis failed', err);
        })
    })
}

