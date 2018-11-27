const puppeteer = require('puppeteer');
const homepage = require("../data/Homepage - MY");
const config = require("../config/config");
const _ = require('lodash');
const fs = require('fs');
var result = [];
(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: '/usr/bin/google-chrome'
	});
	const page = await browser.newPage();
	await page.goto(config.urlCoupon);

	const result = await page.evaluate(() => {
		let items = document.querySelectorAll('#categories-coupons li');
		let result = [];
		for(let i = 0; i<items.length;i++){
			let item = items[i];
			let a = item.childNodes[1].childNodes[1];
			let url = a.href;
			let image = a.childNodes[1].childNodes[1];
			let name = item.innerText.trim();
			let imageUrl = image? image.getAttribute('src').trim() : "";
			let data = [];
			data.push(name);
			data.push(imageUrl);
			data.push(url);
			result.push(data);
		}
		return result;
	});
	console.log(result.length);
	var lineArray = [];
	result.forEach(function (infoArray, index) {
		var line = infoArray.join("\t");
		lineArray.push(line);
	});
	var csvContent = lineArray.join("\n");
	fs.writeFile("results/section7.csv",csvContent, 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
