const URL = require("./url");
const util = require("../util");
const crawl = require("./crawl");
const _ = require("lodash");
let visitedStr = "";
let count = 0;
let timeStart = +(new Date());
let timeEnd;

async function goToURL(url) {
	if (count) {

	}
	if (noNeedCrawl(url)) {
		return;
	}
	if (count % 50 === 0) {
		timeEnd = +(new Date());
		console.log("consumed", (timeEnd - timeStart) / 1000);
	}
	count++;
	console.log(count);
	visitedStr += url;
	console.log("Go to", url);

	console.time("getResponse");
	let links = await crawl.crawl(url);
	console.timeEnd("getResponse");
	console.log("Found", url, links.length);
	await processLinks(links);

	// URL.getResponse(url).then(async res => {
	// 	let links = URL.processResponse(res);
	// 	// await processLinks(links);
	// 	console.log("Found", url, links.length);
	// });

}

function noNeedCrawl(url) {
	if (visitedStr.indexOf(url) > -1) {
		return true;
	}
	if (
		url.indexOf("iprice.my") === -1 ||
		url.indexOf("/r/") > -1 ||
		url.indexOf("/insights/") > -1 ||
		url.indexOf("?") > -1 ||
		url.indexOf("iema") > -1 ||
		url.indexOf("#") > -1) {
		return true;
	}
	return false;
}

async function processLinks(anchors) {
	return new Promise(async resolve1 => {

		let defers = [];
		let maxCount = 1;
		for (let i = 0; i < anchors.length; i++) {
			if (defers.length < maxCount) {
				let defer = new Promise(resolve => {
					let anchor = anchors[i];
					console.log("goToURL", i);
					goToURL(anchor.href);
					resolve();

				});
				defers.push(defer);
			}
			if (i === anchors.length - 1) {
				await Promise.all(defers).then(response => {
					defers = [];
				});
				resolve1();
			}
			if (defers.length === maxCount || i === anchors.length - 1) {
				await Promise.all(defers).then(response => {
					defers = [];
				});
			}

		}
	});
}

let revealed = {
	goToURL
};
module.exports = revealed;
