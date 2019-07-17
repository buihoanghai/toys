const _ = require('lodash');
const globule = require('globule');
const saveFile = require("../lib/saveFile");
const csv = require("../lib/csv");
const categprize = require('./categorize');
const pageTypeFile = "./iprice/condition/page-type3.csv";
const path = "./iprice/data/ahrefs_iPriceEN_add_Taxonomy.csv";
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
	let processedArr = categprize.categorizePageType(data, pageTypes);
	// await saveFile.updateCSVFile("./iprice/result", processedArr);
	await saveFile.updateCSVFile(file.replace("data", "result"), processedArr);
	console.log("resume");
	s.resume();
}

main();