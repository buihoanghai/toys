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
	for(let i = 0; i<homepage['PDP-HB-Carousel'].items.length;i++){
		let item = homepage['PDP-HB-Carousel'].items[i];
		await page.goto(config.url + item.url);
		const data = await page.evaluate(() => {
			var name = document.querySelector("#b-b");
			name = name.innerText.trim();
			let price = document.querySelector('.green.f18.f25-l');
			price = price? price.innerText.trim(): "";
			let store = document.querySelectorAll('.offers-collection').length;
			let imageUrl = document.querySelector('#product-gallery amp-img').getAttribute('src').trim();
			let data = [];
			data.push(name);
			data.push(price);
			data.push(store);
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
	fs.writeFile("results/PDP-HB-Carousel.csv",csvContent, 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
