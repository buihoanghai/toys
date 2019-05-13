const puppeteer = require('puppeteer');
let browser;
let pages = [];
let page;

async function crawl(url) {
	//Todo Need to using singleton here
	if (!browser) {
		browser = await puppeteer.launch({
			headless: true,
		});
		 page = await browser.newPage();

		// pages.push({
		// 	page,
		//
		// })
	}
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