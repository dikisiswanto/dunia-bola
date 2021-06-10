if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
      console.log('ServiceWorker registration succeed');
    } catch (e) {
      console.log('ServiceWorker registration failed');
    }
  });
} else {
  console.log('ServiceWorker is not supported');
}