if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
      console.log('Pendaftaran serviceWorker berhasil');
    } catch (e) {
      console.log('Pendaftaran serviceWorker gagal');
    }
  });
} else {
  console.log('ServiceWorker tidak didukung');
}