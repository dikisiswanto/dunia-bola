const webPush = require('web-push');
const vapidKeys = require('./vapid-keys.json');

webPush.setVapidDetails(
  'mailto:dickyachmady@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/e_albXI-iC4:APA91bHfujJDCy3MIa5fsT2U151OWg-18qERUm9X55Gn4ha7I7N7Ki0Fj4lSGLYOAGEtGgaJvLLlJnGwT3gOCi4YkROaURfoHYZUixi9wq5OtujZqVAzgoUaXBFm0mtImZ7BluVYX9XG",
  "keys": {
    "p256dh": "BBPrDP1xb5LcIehgv3ssEOYjR8chELdNvzBPz0tzB+Sgu19bwzzBR3Gml9dxANQ6Zrytl55NmOvw6FlJqKTr4HU=",
    "auth": "btIx25H6t71GXE0U0c+N3g=="
  }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
  gcmAPIKey: '833875990910',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);