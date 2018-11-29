const _ = require('lodash');
const util = require('./lib/util');
const fs = require('fs');

function process() {
	var file = "parse-csv/data/metaTags.csv";
	fs.readFile(file, 'utf8', function (err, data) {
		var json = util.CSVToArray(data);
		json = util.buildMetaTag(json);
		json = json.slice(1, json.length);
		json.unshift(["L0", "Page Type", "Type Template", "Value Template","Key"]);
		// console.log(json[1653]);
		fs.writeFile("data/metaTags.json", JSON.stringify(json), function (err) {
			if (err) {
				console.log('Some error occured - file either not saved or corrupted file saved.');
			} else {
				console.log('It\'s saved!');
			}
		});
		var lineArray = [];
		json.forEach(function (infoArray, index) {
			var line = "";
			infoArray.forEach((item, i) => {
				if(i === 3 && index !==0){
					line += ",\""+ item+"\"";
				}else{
					line += line? ","+ item: item;
				}
			});
			lineArray.push(line);
		});
		var csvContent = lineArray.join("\n");
		fs.writeFile("results/metaTags.csv", csvContent, 'utf8', function (err) {
			if (err) {
				console.log('Some error occured - file either not saved or corrupted file saved.');
			} else {
				console.log('It\'s saved!');
			}
		});
	});
}

process();