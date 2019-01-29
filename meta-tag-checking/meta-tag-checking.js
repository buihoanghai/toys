const _ = require('lodash');
const util = require('../lib/util');
const crawlMetaTag = require('../lib/crawlMetaTag');
const saveFile = require('../lib/saveFile');
const fs = require('fs');
var globule = require('globule');
var path = "meta-tag-checking/data/*.csv";

async function process() {
	let files = globule.find(path);
	for (var i = 0; i < files.length; i++) {
		let file = files[i];
		console.log("Processing file", file);
		await processItem(file);
	}
}

function processItem(file) {
	return new Promise(resolve => {
		let fileName = file.split("/");
		fileName = fileName[fileName.length - 1];
		fs.readFile(file, 'utf8', async function (err, data) {
			var json = util.CSVToArray(data);
			let result = [];
			for (var i = 0; i < json.length; i++) {
				let url = json[i][0];
				if(url) {
					let item = await crawlMetaTag.crawl(url);
					console.log(item);
					result.push(item);
				}else {
					result.push([]);
				}
			}
			var lineArray = [];
			result.forEach(function (infoArray, index) {
				var line = "";
				infoArray.forEach((item, i) => {
					if (i === 3 && index !== 0) {
						line += ",\"" + item + "\"";
					} else {
						line += line ? "," + item : item;
					}
				});
				lineArray.push(line);
			});
			var csvContent = lineArray.join("\n");
			let filePath = "meta-tag-checking/results/" + fileName;
			saveFile.save(filePath, csvContent).then(() => {
				resolve();

			});
		});
	});

}

process();