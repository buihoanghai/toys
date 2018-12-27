const puppeteer = require('puppeteer');

async function crawlGoogleImage(url) {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: '/usr/bin/google-chrome'
	});
	const page = await browser.newPage();
	await page.goto(url);
	await sleep(2000);
	const data = await page.evaluate(() => {
		var targetElements = document.querySelectorAll("#search a.rg_l");
		var result = [];
		for(var i=0;i<30;){
			let item = targetElements[i];
			let imageUrl = item.href;
			if(imageUrl.split('imgurl=')[1]){
				imageUrl = imageUrl.split('imgurl=')[1].split('&')[0];
				result.push(decodeURIComponent(imageUrl));
				i++
			}
		}

		return result;
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
	crawl: crawlGoogleImage
};

module.exports = revealed;