const _ = require("lodash");
const globule = require('globule');
const image = require('./image');
function getFiles(path) {
	var files = globule.find(path);
	_.each(files,file =>{
		image.uploadFilePath(file).then(data =>{
		});
	});

	return files;
}
const revealed = {
	getFiles: getFiles
};
module.exports = revealed;