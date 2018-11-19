const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
		headless: true,
		executablePath: '/usr/bin/google-chrome'
	});
	const page = await browser.newPage();
	await page.goto('https://my.iprice.mx/watches/');

	// Get the "viewport" of the page, as reported by the page.
	const dimensions = await page.evaluate(() => {
		var h1 = document.querySelector("h1");
		h1.innerText;
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
			deviceScaleFactor: window.devicePixelRatio,
			heading1: h1.innerText
		};
	});

	console.log('Dimensions:', dimensions);

	await browser.close();
})();
