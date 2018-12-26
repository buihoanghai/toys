const _ = require('lodash');
const util = require('./lib/util');
const fs = require('fs');
function process() {
	var file = "parse-csv/data/homepage/Homepage - PH1.csv";
	fs.readFile(file, 'utf8', function (err, data) {
		var json = util.CSVToArray(data);
		var arr = util.arrayToJson(json);
		fs.writeFile("data/Homepage - MY.json", JSON.stringify(arr), function(err) {
			if (err) {
				console.log('Some error occured - file either not saved or corrupted file saved.');
			} else {
				console.log('It\'s saved!');
			}
		});
	});

}

process();