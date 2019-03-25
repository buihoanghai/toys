const _ = require('lodash');
const csv = require("../lib/csv");
const file = "./seo/data/ahref-2019-03-21.csv";

async function main() {
	console.time("Process");
	let arr = await csv.getArrDataFromCSV(file, "\t");
	analytic(arr);
	console.timeEnd("Process");
}

function analytic(arr) {
	console.log(arr[3]);
	let rankingUp = 0;
	let count = 0;
	let totalVolumn = 0;
	let totalTraffic = 0;
	_.each(arr, (item, index) => {
		if (index === 0) {
			return;
		}
		let keyword = item[1];
		let position = item[2];
		let volumn = parseInt(item[5]);
		let traffic = parseFloat(item[8]);
		let tempDown = 0;
		let positionHistory = item[3];
		if (!isNaN(position) && !isNaN(positionHistory)) {
			tempDown = positionHistory - position
		}
		// if (positionHistory < position) {
		// 	console.log(keyword, tempDown)
		// }
		if (position < 11) {
			count++;
			totalVolumn += volumn;
			totalTraffic += traffic;
			console.log(keyword, tempDown, position)
			rankingUp += tempDown;
		}
		// console.log(item);
	});
	console.log("rankingUp", rankingUp, count, totalVolumn, totalTraffic);
}

main();