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
	for(let i = 0; i<homepage['PLP-HB-BrandCategory-Carousel'].items.length;i++){
		let item = homepage['PLP-HB-BrandCategory-Carousel'].items[i];
		if(item.url.indexOf("iprice") === -1){ 			item.url = config.url + item.url; 		} await page.goto(item.url);
		const data = await page.evaluate(() => {
			let brandName = document.querySelector('#clear_filters a span');
			if(!brandName){
				return [];
			}
			brandName = brandName.innerText.replace("> ", "").trim();
			let breadcrumb = document.querySelectorAll('#breadcrumb ul.dn.dib-l li');
			let name = breadcrumb[breadcrumb.length-1].innerText.replace("> ", "").trim();
			let image =document.querySelector('.listing amp-img');

			let imageUrl = image? image.getAttribute('src').trim() : "";
			let data = [];
			data.push(brandName);
			data.push(name);
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
	fs.writeFile("results/PLP-HB-BrandCategory-Carousel.csv",csvContent, 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
