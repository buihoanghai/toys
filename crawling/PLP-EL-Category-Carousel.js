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
	let items = homepage['PLP-EL-Category-Carousel'].items;
	for(let i = 0; i< items.length;i++) {
		for (let j = 0; j < items[i].items.length; j++) {
			let item = items[i].items[j];
			if(item.url.indexOf("iprice") === -1){ 			item.url = config.url + item.url; 		} await page.goto(item.url);
			const data = await page.evaluate(() => {
				var breadcrumb = document.querySelectorAll("#breadcrumb ul.dn.dib-l li");
				if(!breadcrumb[breadcrumb.length-1]){
					return "";
				}
				let name = breadcrumb[breadcrumb.length-1].innerText.replace("> ", "").trim();
				return name;
			});
			result.push(data);
		}
		result.push("items1");
		result.push("name");
	}
	var lineArray = [];
	result.forEach(function (infoArray, index) {
		var line = infoArray;
		lineArray.push(line);
	});
	var csvContent = lineArray.join("\n");
	fs.writeFile("results/PLP-EL-Category-Carousel.csv",csvContent, 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
