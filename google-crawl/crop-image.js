const _ = require('lodash');
const image = require("../lib/image");
const dir = require("../lib/dir");
const globule = require('globule');

function main() {
	dir.make("cropped");
	let files = globule.find("ifarmer-image/**/*.jpg");
	_.each(files, async file => {
		image.crop(file);
	});
}

main();