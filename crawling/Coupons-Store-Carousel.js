const puppeteer = require('puppeteer');
const homepage = require("../data/Homepage - MY");
const config = require("../config/config");
const _ = require('lodash');
const fs = require('fs');
let result = [];

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: '/usr/bin/google-chrome'
	});
	const page = await browser.newPage();
	for (var i = 0; i < homepage['Coupons-Store-Carousel'].items.length; i++) {
		let item = homepage['Coupons-Store-Carousel'].items[i];
		if(item.url.indexOf("iprice") === -1){ 			item.url = config.url + item.url; 		} await page.goto(item.url);
		const data = await page.evaluate(() => {
			let name;
			let imageUrl;
			let image = document.querySelector('.has-offer-text amp-img');
			imageUrl = image ? image.getAttribute('src').trim() : "";
			let breadcrumb = document.querySelectorAll('.dn.dib-l.f12 span');
			if(!breadcrumb[breadcrumb.length - 1]){
				return [];
			}
			name = breadcrumb[breadcrumb.length - 1].innerText.trim();
			let data = [];
			data.push(name.trim());
			data.push(imageUrl);
			return data;
		});
		result.push(data);
	}
	var lineArray = [];
	result.forEach(function (infoArray, index) {
		var line = infoArray.join("\t");
		lineArray.push(line);
	});
	var csvContent = lineArray.join("\n");
	fs.writeFile("results/Coupons-Store-Carousel.csv", csvContent, 'utf8', function (err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
