const _ = require('lodash');
const dir = require("../lib/dir");
const csv = require("../lib/csv");
const globule = require('globule');
const fs = require('fs');
const saveFile = require("../lib/saveFile");
var api = "YOUR_GOOGLE_API_KEY";
var googleTranslate = require('google-translate')(api);

function process() {
	return new Promise(resolve => {
		const file = "../data/translate/translate-2.csv";
		let arrayToCsv = [];
		fs.readFile(file, 'utf8', async function (err, data) {
			let arr = csv.CSVToArray(data);
			let total = arr.length;
			for (let i = 0; i <= total - 1; i++) {
				let item = arr[i];
				if (item[0] === "") {
					console.log("Line " + i++ + " is empty");
					var itemSave = [
						item[0],
						item[0],
						item[2],
					];
					arrayToCsv.push(itemSave);
					continue;
				}
				var itemSave = [
					item[0],
					await translate(item[0]),
					item[2],
				];
				arrayToCsv.push(itemSave);
			}
			resolve(arrayToCsv);
		});
	});
}

async function main() {
	var arrayCsv = await process();
	await saveFile.saveCSVFile("../data/translate/translate-result-2.csv", arrayCsv);
}

function translate(text) {
	return new Promise(resolve => {
		googleTranslate.translate(text, 'vi', function(err, translation) {
			console.log(text + " => " + translation.translatedText);
			resolve(translation.translatedText);
		});
	});
}

main();


