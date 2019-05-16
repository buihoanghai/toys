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
	for(let i = 0; i<homepage['PLP-FA-BrandCategory-Men-Carousel'].items.length;i++){
		let item = homepage['PLP-FA-BrandCategory-Men-Carousel'].items[i];
		url = item['main-url'];
		if (url.indexOf("iprice") === -1) {
			url = config.url + url;
		}
		await page.goto(url+"?show-filter=1");
		const data = await page.evaluate(() => {
			let brandName = document.querySelector('a[data-vars-cgt="click_brand_filter_label"] span');
			if(!brandName){
				return [];
			}
			brandName = brandName.innerText.trim();
			let isMan = document.querySelector('[data-vars-lb="Men"]');
			if(!isMan){
				isMan = document.querySelector('[data-vars-lb="Nam"]');
			}
			if(!isMan){
				isMan = document.querySelector('[data-vars-lb="Pria"]');
			}
			if(!isMan){
				isMan = document.querySelector('[data-vars-lb="ผู้ชาย"]');
			}
			let breadcrumb = document.querySelectorAll('.dn.dib-l.nowrap span');
			if(!breadcrumb[breadcrumb.length - 1]){
				return [];
			}
			let name = breadcrumb[breadcrumb.length - 1].innerText.trim();
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
	fs.writeFile("results/PLP-FA-BrandCategory-Men-Carousel.csv",csvContent, 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
