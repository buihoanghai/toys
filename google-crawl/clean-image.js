const _ = require('lodash');
const image = require("../lib/image");
const globule = require('globule');

function process(){
	let files = globule.find("google/**/*.jpg");
	_.each(files, async file => {
		await image.checkFile(file);
	});
}
process();