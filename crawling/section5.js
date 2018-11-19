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
	for(let i = 0; i<homepage.section5.items.length;i++){
		let item = homepage.section5.items[i];
		url = item.url;
		await page.goto(config.url + url);
		const data = await page.evaluate(() => {
			let brandName = document.querySelector('#clear_filters a span');
			brandName = brandName.innerText.trim();
			let isWoman = document.querySelector('.i-filter-gender-2');
			let breadcrumb = document.querySelectorAll('.dn.dib-l.nowrap a');
			let name = breadcrumb[breadcrumb.length-1].innerText.trim();
			let image =document.querySelector('.db-l.ba.b--gray-light.mr3.dn.v-mid amp-img');

			let imageUrl = image? image.getAttribute('src').trim() : "";
			let data = [];


			data.push(!!isWoman);
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
	fs.writeFile("results/section5.csv",csvContent, 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
