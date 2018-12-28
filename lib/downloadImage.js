var fs = require('fs'),
	_ = require('lodash'),
	request = require('request');
const imageExtension = ["jpg", "jpeg", "png", "gif"]
const BASE_PATH = "google";

function download(uri, filename) {
	console.log('downloading:', uri);
	request.head(uri, function (err, res, body) {
		request(uri).pipe(fs.createWriteStream(filename));
	});
}

function downloadAll(arr, filePath) {
	_.each(arr, (item, index) => {
		let fileName = getFileName(item, filePath, index);
		let path = BASE_PATH + "/" + filePath;
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}
		download(item, path + "/" + fileName);
	});
}

function getFileName(str, name, index) {
	let arr = str.split("/");
	let fileName = arr[arr.length - 1];
	fileName = fileName.split(".");
	let fileExtension = fileName[fileName.length - 1];
	fileExtension = fileExtension.split('?')[0];
	fileExtension = renameExtension(fileExtension);
	return name + index + "." + fileExtension;
}

function renameExtension(str) {
	return (_.includes(imageExtension, str)) ? str : "png";
}

const revealed = {
	download: download,
	downloadAll: downloadAll,
	getFileName: getFileName
};

module.exports = revealed;