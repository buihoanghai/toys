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
	for (var i = 0; i < homepage['PDP-PLP-SeeMore'].items.length; i++) {
		let item = homepage['PDP-PLP-SeeMore'].items[i];
		if (item.url.indexOf("iprice") === -1) {
			item.url = config.url + item.url;
		}
		await page.goto(item.url);
		const data = await page.evaluate(() => {
			let name;
			let imageUrl;
			let image = document.querySelector('.store-logo-border amp-img');
			imageUrl = image ? image.getAttribute('src').trim() : "";
			if (imageUrl) {
				let breadcrumb = document.querySelectorAll('#breadcrumb ul.dn.dib-l li');
				if (!breadcrumb[breadcrumb.length - 1]) {
					return [];
				}


				name = breadcrumb[breadcrumb.length - 1].innerText.replace("> ", "").trim();
			}
			else {

				if (document.querySelector("#main-filter")) {
					//PLP
					let image = document.querySelector('#shop amp-img');
					imageUrl = image ? image.getAttribute('src').trim() : "";
					let brandName = document.querySelector('#clear_filters a span');

					brandName = brandName ? brandName.innerText.replace("> ", "").trim() + " " : "";
					brandName = brandName.trim();
					let breadcrumb = document.querySelectorAll('#breadcrumb ul.dn.dib-l li');
					if (!breadcrumb[breadcrumb.length - 1]) {
						return [];
					}
					let lastBreadcrumb = breadcrumb[breadcrumb.length - 1].innerText.replace("> ", "").trim();
					if (brandName.toLowerCase() !== lastBreadcrumb.toLowerCase()) {
						name = brandName + ' ' + lastBreadcrumb;
					} else {
						name = lastBreadcrumb;
					}

				} else {
					//PDP
					let breadcrumb = document.querySelectorAll('#breadcrumb ul.dn.dib-l li');
					if (!breadcrumb[breadcrumb.length - 1]) {
						return [];
					}
					name = breadcrumb[breadcrumb.length - 1].innerText.replace("> ", "").trim();
					let image = document.querySelector('#product-gallery amp-img');
					let imageUrl = "";
					if(image) {
						imageUrl = image.getAttribute('src').trim();
					}
				}
			}
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
	fs.writeFile("results/PDP-PLP-SeeMore.csv", csvContent, 'utf8', function (err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
