const _ = require("lodash");
const globule = require('globule');
const image = require('./image');

function uploadFiles(path) {
	let files = globule.find(path);
	let promises = [];
	_.each(files, file => {
		promises.push(image.uploadFilePath(file).then(data => {
		}));
	});
	return Promise.all(promises).then(() => {
			return files;
		}
	);
}

const revealed = {
	uploadFiles: uploadFiles
};
module.exports = revealed;