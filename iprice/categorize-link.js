const _ = require('lodash');
const globule = require('globule');
const saveFile = require("../lib/saveFile");
const csv = require("../lib/csv");
const pageTypeFile = "./iprice/condition/Page Type (2).csv";
const path = "./iprice/data/*.csv";
let pageTypes;

async function main() {
	console.time("Process");
	pageTypes = await csv.getArrDataLowerCaseFromCSV(pageTypeFile);
	console.log("pageTypes", pageTypes.length);
	let files = globule.find(path);
	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		let data = await csv.getArrDataFromLargeCSV(file, buildFile);
	}
	console.timeEnd("Process");
}

async function buildFile(data, file, s) {
	console.log("build file", data.length, file);
	let processedArr = categorizePageType(data, pageTypes);
	// await saveFile.updateCSVFile("./iprice/result", processedArr);
	await saveFile.updateCSVFile(file.replace("data", "result"), processedArr);
	console.log("resume");
	s.resume();

}

function categorizePageType(arr, pageTypes) {
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		let item = arr[i];
		let data = _.cloneDeep(item);
		if (!data) {
			console.log("test", i);
		}
		let url = data[5];
		if (data.length) {
			data.unshift(getTypePage(url, pageTypes));
			result.push(data);
		}
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
	if (result === "Homepage" || result === "homepage") {
		if (!isHomePage(str)) {
			if (isPDP(str)) {
				result = "PDP";
			} else {
				result = "PLP";
			}
		}

	}
	// if (result === "Homepage") {
	// 	// console.log(str, result);
	// }
	return result;
}

function isPDP(str) {
	if (str.indexOf("priceprice.com") >= 0 && str.indexOf("/?") === -1) {
		return true;
	}
	return str.indexOf(".html") >= 0;
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