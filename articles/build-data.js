const _ = require('lodash');
const fs = require('fs');
const globule = require('globule');
const doc = require("../lib/doc");
const saveFile = require("../lib/saveFile");
const path = "articles/data/*.doc";
let variant;
const dir = require('../lib/dir');

function main() {
	dir.make("articles/result");
	let files = globule.find(path);
	_.each(files, async file => {
		await fs.readFile(file, 'utf16le', function (err, data) {
				let arr = doc.parseFiles(data);
			saveFile.save("articles/result/articles.json", JSON.stringify(arr));
		});
	})
}

main();