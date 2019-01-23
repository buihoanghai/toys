const _ = require('lodash');
const firebase = require('./firebase');
require('firebase/storage');
var storageRef = firebase.storage().bucket();
const fs = require('fs');

function readFile(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}

async function checkFile(filePath) {
	return readFile(filePath).then(data => {
		if (data.length < 10048) {
			console.log("remove", filePath);
			fs.unlink(filePath, () => {
			});
			return false;
		}
		return true;
	});
}

function uploadFilePath(filePath) {
	return readFile(filePath).then(file => {
		return upload(file, filePath);
	});
}

function upload(file, filePath) {
	var options = {
		destination: filePath.replace("ifarmer/", '')
	};
// Upload file and metadata to the object 'images/mountains.jpg'
	console.log(filePath);
	return new Promise((resolve, reject) => {
		storageRef.upload(filePath, options, (err, file, apiResponse) => {
			console.log("Uploaded", filePath);
			return resolve(file);
		});
	});

}

const image = {
	upload: upload,
	readFile: readFile,
	uploadFilePath: uploadFilePath,
	checkFile: checkFile,
};
module.exports = image;