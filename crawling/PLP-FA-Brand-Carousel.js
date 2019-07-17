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
	for(let i = 0; i<homepage['PLP-FA-Brand-Carousel'].items.length;i++){
		let item = homepage['PLP-FA-Brand-Carousel'].items[i];
		if(item.url.indexOf("iprice") === -1){ 			item.url = config.url + item.url; 		} await page.goto(item.url);
		const data = await page.evaluate(() => {
			let breadcrumb = document.querySelectorAll('#breadcrumb ul.dn.dib-l li');
			if(!breadcrumb[breadcrumb.length - 1])
				return [];
			let brandName =  breadcrumb[breadcrumb.length - 1].innerText.replace("> ", "").trim();
			let image =document.querySelector('.db-l.ba.b--gray-light.mr3.dn.v-mid amp-img');
			let imageUrl = image? image.getAttribute('src').trim() : "";
			let data = [];
			data.push(brandName);
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
	fs.writeFile("results/PLP-FA-Brand-Carousel.csv",csvContent, 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
