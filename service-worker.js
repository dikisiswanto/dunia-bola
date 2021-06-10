importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log('Berhasil memuat Workbox');
} else {
  console.log('Workbox gagal dimuat!');
}

workbox.core.setCacheNameDetails({
  prefix: 'dunia-bola',
  suffix: 'v1',
  precache: 'app',
  runtime: 'external'
});

function mappingResource(path, files) {
  return files.map(fileName => {
    const resource = {
      url: path + fileName,
      revision: 1
    };
    return resource;
  })
}

const baseResources = ['index.html', 'nav.html', 'manifest.json'];
const pages = ['home.html', 'league.html', 'team.html', 'favorites.html'];
const styles = ['style.css', 'materialize.min.css', 'icons.css'];
const fonts = ['Material-Icons.woff2'];
const scripts = ['api.js', 'constants.js', 'db.js', 'idb.js', 'lib.js', 'main.js', 'materialize.min.js', 'register-service-worker.js', 'view.js'];
const icons = ['icon-72x72.png', 'icon-96x96.png', 'icon-128x128.png', 'icon-144x144.png', 'icon-152x152.png', 'icon-192x192.png', 'icon-384x384.png', 'icon-512x512.png'];
const images = ['epl-logo.png', 'laliga-logo.png', 'ucl-logo.png', 'logo.ico'];

workbox.precaching.precacheAndRoute([
  mappingResource('./', baseResources),
  mappingResource('./pages/', pages),
  mappingResource('./css/', styles),
  mappingResource('./fonts/', fonts),
  mappingResource('./js/', scripts),
  mappingResource('./icons/', icons),
  mappingResource('./images/', images)
].flat());

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: `${workbox.core.cacheNames.runtime}-api-response`
  })
);

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