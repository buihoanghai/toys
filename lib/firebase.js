const admin = require('firebase-admin');
const _ = require('lodash');
const dev = process.env.NODE_ENV !== 'production';
const env = dev ? "test": "test";
const firebase = admin.initializeApp({
	credential: admin.credential.cert(require('../credentials/server')),
	databaseURL: 'https://ifarmer-e25f1.firebaseio.com/',
	storageBucket: "ifarmer-e25f1.appspot.com",
}, 'server');

firebase.getPath = function(path) {
	path = path || "";
	return firebase.database().ref(env + path);
};
Object.freeze(firebase);
module.exports = firebase;
