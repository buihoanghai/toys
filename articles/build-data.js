const _ = require('lodash');
const fs = require('fs');
const globule = require('globule');
const doc = require("../lib/doc");
const saveFile = require("../lib/saveFile");
const path = "articles/data/*.doc";
let variant;

function main() {
	let files = globule.find(path);
	_.each(files, async file => {
		await fs.readFile(file, 'utf16le', function (err, data) {
				let arr = doc.parseFiles(data);
		});
	})
}

main();