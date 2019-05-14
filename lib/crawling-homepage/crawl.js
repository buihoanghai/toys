const puppeteer = require('puppeteer');
const _ = require("lodash");
let browser;
let pages = [];
let maxCrawl = 6;

async function setUpPage() {
	console.log("maxCrawl", maxCrawl);
	browser = await puppeteer.launch({
		headless: true,
	});
	for (let i = 0; i < maxCrawl; i++) {
		let page = await browser.newPage();
		let available = true;
		pages.push({
			page,
			available,
			i
		})
	}
}

function getFreePage() {
	return new Promise(resolve => {
		var handle = setInterval(function () {
			let freePage = _.find(pages, {available: true});
			if (freePage) {
				freePage.available = false;
				// console.log("use page", freePage.i);
				resolve(freePage);
				clearInterval(handle);
			}
			// console.log("wait free page");

		}, 1000);
	});
}

async function crawl(url) {
	//Todo Need to using singleton here
	let page;
	if (!browser) {
		await setUpPage();
	}
	let freePage = await getFreePage();
	page = freePage.page;
	// await sleep(1000);
	await page.goto(url);
	const data = await page.evaluate(() => {
		let result = [];
		let anchors = document.querySelectorAll("a");
		anchors.forEach(anchor => {
			let link = {
				href: anchor.href,
				rel: anchor.rel
			};
			// console.log(link);
			if (link.rel === "" || link === "follow") {
				result.push(link);
			}
		});

		return result;
	});
	// await browser.close();
	freePage.available = true;
	return data;
}

const sleep = (time) => {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	});
}
const revealed = {
	crawl
};

module.exports = revealed;