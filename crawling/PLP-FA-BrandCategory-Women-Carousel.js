const puppeteer = require('puppeteer');
const homepage = require("../data/Homepage - MY");
const config = require("../config/config");
const _ = require('lodash');
const fs = require('fs');
let result = [];
let url;

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: '/usr/bin/google-chrome'
	});
	const page = await browser.newPage();
	for (let i = 0; i < homepage['PLP-FA-BrandCategory-Women-Carousel'].items.length; i++) {
		let item = homepage['PLP-FA-BrandCategory-Women-Carousel'].items[i];
		url = item['main-url'];
		if (url.indexOf("iprice") === -1) {
			url = config.url + url;
		}
		await page.goto(url + "?show-filter=1");
		const data = await page.evaluate(() => {
			let brandName = document.querySelector('a[data-vars-cgt="click_brand_filter_label"] span');
			if (!brandName) {
				return [];
			}
			brandName = brandName.innerText.replace("> ", "").trim();
			let isWoman = document.querySelector('[data-vars-lb="Women"]');
			if(!isWoman){
				isWoman = document.querySelector('[data-vars-lb="Nữ"]');
			}
			if(!isWoman){
				isWoman = document.querySelector('[data-vars-lb="Wanita"]');
			}
			if(!isWoman){
				isWoman = document.querySelector('[data-vars-lb="ผู้หญิง"]');
			}
			let breadcrumb = document.querySelectorAll('#breadcrumb ul.dn.dib-l li');
			if(!breadcrumb[breadcrumb.length - 1]){
				return [];
			}
			let name = breadcrumb[breadcrumb.length - 1].innerText.replace("> ", "").trim();
			let data = [];
			data.push(brandName);
			data.push(name);
			data.push(location.href.replace("?show-filter=1", ""));
			let image = document.querySelector('.listing amp-img');
			let imageUrl = image ? image.getAttribute('src').trim() : "";
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
	fs.writeFile("results/PLP-FA-BrandCategory-Women-Carousel.csv", csvContent, 'utf8', function (err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
