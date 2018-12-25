const puppeteer = require('puppeteer');

async function crawl(url) {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: '/usr/bin/google-chrome'
	});
	const page = await browser.newPage();
	await page.goto(url);
	const data = await page.evaluate(() => {
		var targetElements = document.querySelectorAll("#mw-content-text>div>p");
		var result = [];
		for(var i=0;i< targetElements.length;i++){
			let elem = targetElements[i];
			result.push(elem.innerText);
		}
		return result.join("\n");
	});
	await browser.close();
	return data;
}

const sleep = (time) => {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	});
}

const revealed = {
	crawl: crawl
};

module.exports = revealed;