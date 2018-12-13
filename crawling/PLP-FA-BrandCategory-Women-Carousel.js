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
	for(let i = 0; i<homepage['PLP-FA-BrandCategory-Women-Carousel'].items.length;i++){
		let item = homepage['PLP-FA-BrandCategory-Women-Carousel'].items[i];
		url = item['main-url'];
		await page.goto(config.url + url);
		const data = await page.evaluate(() => {
			let brandName = document.querySelector('#clear_filters a span');
			brandName = brandName.innerText.trim();
			let isWoman = document.querySelector('[data-vars-lb="Women"]');

			let breadcrumb = document.querySelectorAll('.dn.dib-l.nowrap a');
			let name = breadcrumb[breadcrumb.length - 1].innerText.trim();
			let data = [];
			data.push(!!isWoman);
			data.push(brandName);
			data.push(name);
			if (!!isWoman) {
				data.push(isWoman.href.replace("?show-filter=1", ""));
			}

			return data;
		});
		if(data[0]){
			await page.goto(data[3]);
			const img = await page.evaluate(() => {
				let image = document.querySelector('.m-i amp-img');
				let imageUrl = image ? image.getAttribute('src').trim() : "";
				return imageUrl;
			});
			data.push(img);
		} else{
			data.push("");
			data.push("");
		}
		result.push(data);
	}
	var lineArray = [];
	result.forEach(function (infoArray, index) {
		var line = infoArray.join("\t");
		lineArray.push(line);
	});
	var csvContent = lineArray.join("\n");
	fs.writeFile("results/PLP-FA-BrandCategory-Women-Carousel.csv",csvContent, 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();