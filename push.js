const webPush = require('web-push');
const vapidKeys = require('./vapid-keys.json');

webPush.setVapidDetails(
	'mailto:dickyachmady@gmail.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
)

const pushSubscription = {
	"endpoint": "https://fcm.googleapis.com/fcm/send/dHOsMi7QSR8:APA91bGyLfYVKzEvS0Tq7_-YB7TwlIHTSWBz5nTG9mG3yia2wbFZ_gd2SQnEeDrJjkZ2iYn_HfOCnoQrg3WTqpsmsXafbBZg529F5zQ0AFSEuk0vEDLz6agk4I5jdqFExgxRtCUkTxZL",
	"keys": {
		"p256dh": "BHyWqGHWU12+S8vjbK3l8ygfd9DRa9vhWN9MxvtqApRGaV/o3knGPYqMFmqF3352DS+N/aATrFI4uK0E1GnzqSA=",
		"auth": "vQdmQRrGq/V8s6eagaxTTw=="
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