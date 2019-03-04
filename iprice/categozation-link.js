const _ = require('lodash');
const globule = require('globule');
const saveFile = require("../lib/saveFile");
const csv = require("../lib/csv");
const pageTypeFile = "./data/page-type.csv";

async function main() {
	let pageTypes = await csv.getArrDataFromCSV(pageTypeFile);
	console.log(pageTypes);
}

main();