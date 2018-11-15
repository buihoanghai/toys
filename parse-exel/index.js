const jsonData = require("./codebeautify.json");
const _ = require('lodash');
const fs = require('fs');
console.log(jsonData.hits.hits.length);
function process() {
	let items = jsonData.hits.hits;
	let results = [];
	let results1 = [];
	_.each(items, item => {
		results.push('https://iprice.co.id/harga/' + item._source.comparableUrl +"/");
		results1.push('https://iprice.co.id/harga/' + item._source.comparableUrl + "/\t" + item._source.offerCount);
	});
	fs.writeFile("result1.txt",results.join('\n'), 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	fs.writeFile("result2.csv",results1.join('\n'), 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
}
process();