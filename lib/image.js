const _ = require('lodash');
const firebase = require('./firebase');
require('firebase/storage') ;
var storageRef = firebase.storage().bucket();
const fs = require('fs');
function readFile(filePath) {
	return new Promise((resolve) => {
		fs.readFile(filePath, (err, data) => {
			if (err) throw err;
			resolve(data);
		});
	});
}
function uploadFilePath(filePath){
	return new Promise((resolve) => {
		readFile(filePath).then(file => {
			upload(file, filePath);
		});
	});
}
function upload(file, filePath){
	var options = {
		destination : filePath.replace("ifarmer/",'')
	}
// Upload file and metadata to the object 'images/mountains.jpg'
	console.log(filePath);
	return storageRef.upload(filePath,options, (err, file, apiResponse)=>{
	});

}

const image = {
	upload: upload,
	readFile: readFile,
	uploadFilePath: uploadFilePath
};
module.exports = image;