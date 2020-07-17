const CACHE_NAME = 'telkom-v2';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/csr.html',
	'/pages/contact.html',
	'/pages/profile.html',
	'/pages/services.html',
	'/css/materialize.min.css',
	'/css/style.css',
	'/js/materialize.min.js',
	'/js/script.js',
	'/images/banner.jpg',
	'/images/fav.ico',
	'/images/logo.png',
	'/images/news-thumbnail-1.jpeg',
	'/images/news-thumbnail-2.jpeg',
	'/images/news-thumbnail-3.jpeg',
	'/images/product-1.jpg',
	'/images/product-2.png',
	'/images/product-3.png',
	'/images/product-4.png',
	'/images/product-5.png',
	'/images/product-6.png',
	'/images/product-7.png',
	'/images/product-8.png',
	'/images/product-9.png',
	'/images/product-10.png',
	'/images/product-11.png',
	'/images/product-12.png',
	'/images/product-13.png',
	'/images/product-14.png',
	'/images/product-15.png',
	'/images/product-16.png',
	'/images/product-17.png',
	'/images/product-18.png',
	'/images/product-19.png',
	'/images/product-20.png',
	'/manifest.json',
	'/icons/icon-72x72.png',
	'/icons/icon-96x96.png',
	'/icons/icon-128x128.png',
	'/icons/icon-144x144.png',
	'/icons/icon-152x152.png',
	'/icons/icon-192x192.png',
	'/icons/icon-384x384.png',
	'/icons/icon-512x512.png'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

