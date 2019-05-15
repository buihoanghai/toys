const URL = require("./url");
const util = require("../util");
const crawl = require("./crawl");
const _ = require("lodash");
let visitedStr = "";
let count = 0;
let timeStart = +(new Date());
let timeEnd;

function countProcess(){
	count++;
	if (count % 10 === 0) {
		timeEnd = +(new Date());
		console.log(count, "consumed", (timeEnd - timeStart) / 1000);
	}
}
function goToURL(url) {
	if (count) {

	}
	if (noNeedCrawl(url)) {
		return;
	}
	// console.time("getResponse");
	crawl.crawl(url).then(links => {
		// console.timeEnd("getResponse");
		countProcess();

		console.log("Found", url, links.length);
		processLinks1(links);
	});

	// URL.getResponse(url).then(res => {
	// 	countProcess();
	// 	let links = URL.processResponse(res);
	// 	processLinks1(links);
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
	visitedStr += url;
	return false;
}
function processLinks1(anchors) {
	for (let i = 0; i < anchors.length; i++) {
		let anchor = anchors[i];
		goToURL(anchor.href);
	}
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
