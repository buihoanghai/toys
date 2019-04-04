const _ = require('lodash');
const util = require('./lib/util');
const fs = require('fs');
var globule = require('globule');
var path = "parse-csv/data/international-targeting/errorlinks.csv";
function process() {
	 let files = globule.find(path);
	_.each(files, file =>{
		let fileName = file.split("/");
		fileName= fileName[fileName.length-1];
		fs.readFile(file, 'utf8', function (err, data) {
			var json = util.CSVToArray(data);
			json = util.buildInternationalArr(json);
			var lineArray = [];
			json.forEach(function (infoArray, index) {
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
			fs.writeFile("results/international-targeting/"+fileName, csvContent, 'utf8', function (err) {
				if (err) {
					console.log('Some error occured - file either not saved or corrupted file saved.');
				} else {
					console.log('It\'s saved!');
				}
			});
		});
	});

}
process();