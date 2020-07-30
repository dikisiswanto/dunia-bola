const CACHE_NAME = 'duniabola-v1';
const urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/team.html',
	'/pages/favorites.html',
	'/css/materialize.min.css',
	'/js/materialize.min.js',
	'/js/api.js',
	'/js/lib.js',
	'/js/constants.js',
	'/js/idb.js',
	'/js/db.js',
	'/js/view.js',
	'/js/main.js',
	'/css/style.css',
	'/css/icons.css',
	'/fonts/Material-Icons.woff2',
	'/images/epl-logo.png',
	'/images/laliga-logo.png',
	'/images/ucl-logo.png',
	'/images/logo.ico',
	'/icons/icon-72x72.png',
	'/icons/icon-96x96.png',
	'/icons/icon-128x128.png',
	'/icons/icon-144x144.png',
	'/icons/icon-152x152.png',
	'/icons/icon-192x192.png',
	'/icons/icon-384x384.png',
	'/icons/icon-512x512.png',
	'/manifest.json'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(cache => {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys()
		.then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request, {
			cacheName: CACHE_NAME
		})
		.then(response => {
			if (response) {
				return response;
			}
			const fetchRequest = event.request.clone();

			return fetch(fetchRequest).then(
				response => {
					if (!response || response.status !== 200) {
						return response;
					}
					const responseToCache = response.clone();
					caches.open(CACHE_NAME)
						.then(cache => {
							cache.put(event.request, responseToCache);
						});
					return response;
				}
			);
		})
	);
});

self.addEventListener('push', event => {
	let body;

	if (event.data) {
		body = event.data.text();
	} else {
		body = 'No payload';
	}

	const options = {
		body,
		icon: './icons/icon-96x96.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1,
		}
	};

	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});