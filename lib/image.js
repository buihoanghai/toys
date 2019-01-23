const _ = require('lodash');
const firebase = require('./firebase');
require('firebase/storage');
var storageRef = firebase.storage().bucket();
const fs = require('fs');
const sharp = require('sharp');
const dir = require('../lib/dir');

function readFile(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}

function createPath(filePath, rootFolder) {
	// filePath = cropped/ga-tha-vuon/ga-tha-vuon10.jpg
	rootFolder = rootFolder || "cropped/";
	console.log(filePath);
	let arr = filePath.split("/");
	let path = rootFolder + arr[1];
	dir.make(path);
	return path + "/" + arr[2];
}

async function crop(filePath) {
	let des = createPath(filePath);
	return sharp(filePath).resize(500, 500).toFile(des, (err, info) => {
		console.log("Cropped file", des);
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

function downloadAll(path) {
	return storageRef.getFiles({directory: path}).then((arr) => {
		let files = arr[0];
		let promises = [];
		_.each(files, (file, index) => {
			file.getMetadata().then((meta) => {
				console.log(meta[0].name);
				if (file.download) {
					let filePath = createPath(meta[0].name, "ifarmer-image/");
					console.log(filePath);
					let defer = file.download({destination: filePath});
					promises.push(defer);
				}
			});
		});
		// console.log("Download", files);
	})
}

const image = {
	upload: upload,
	readFile: readFile,
	uploadFilePath: uploadFilePath,
	checkFile: checkFile,
	downloadAll: downloadAll,
	crop: crop
};
module.exports = image;