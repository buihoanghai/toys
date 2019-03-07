const _ = require('lodash');
const globule = require('globule');
const saveFile = require("../lib/saveFile");
const csv = require("../lib/csv");
const pageTypeFile = "./iprice/condition/page-type.csv";
const path = "./iprice/data/*.csv";

async function main() {
	console.time("Process");
	let pageTypes = await csv.getArrDataLowerCaseFromCSV(pageTypeFile);
	console.log(pageTypes.length);
	let files = globule.find(path);
	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		console.time("LoadFile");
		let data = await csv.getArrDataFromCSV(file);
		console.timeEnd("LoadFile");
		let processedArr = categorizePageType(data, pageTypes);
		saveFile.saveCSVFile(file.replace("data", "result"), processedArr);
	}
	console.timeEnd("Process");
}

function categorizePageType(arr, pageTypes) {
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		let item = arr[i];
		let data = _.cloneDeep(item);
		let url = data[5];
		data[14] = getTypePage(url, pageTypes);
		result.push(data);
	}
	return result;
}

function getTypePage(str, arr) {
	let result = "PLP";
	_.each(arr, item => {
		if (isMatchPattern(str, item[1], item[2])) {
			result = item[3];
			return false;
		}
	});
	if (result === "Homepage" && !isHomePage(str)) {
		result = "PLP";
	}
	// if (result === "Homepage") {
	// 	// console.log(str, result);
	// }
	return result;
}

function isHomePage(str) {
	return !!str.match(/^http(s)?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*?(:[0-9]+)?(\/)?$/i);
}

function isMatchPattern(str, patern1, patern2) {
	if (!str || !patern2 || !patern1) {
		return false;
	}
	// str = str.toLowerCase();
	// patern1 = patern1.toLowerCase();
	// patern2 = patern2.toLowerCase();
	// var rx = new RegExp(expression, 'i');
	// return !!str.match(rx);
	// var expression = `(${patern1}${patern2})`;
	// var stri = `${patern1}${patern2}`;
	var stri = patern1 + patern2;
	return str.indexOf(stri) > 0;
}

main();