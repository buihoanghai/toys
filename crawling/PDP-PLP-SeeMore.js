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
	for(var i = 0; i<homepage['PDP-PLP-SeeMore'].items.length;i++){
		let item = homepage['PDP-PLP-SeeMore'].items[i];
		await page.goto(item.url);
		const data = await page.evaluate(() => {
			var name = document.querySelector("#b-c");
			if(name){
				name = name.innerText;
			}
			if(!name){
				let brandName = document.querySelector('#clear_filters a span');

				brandName = brandName ? brandName.innerText.trim() + " " : "";
				let breadcrumb = document.querySelectorAll('.dn.dib-l.nowrap a');
				name = brandName + breadcrumb[breadcrumb.length-1].innerText.trim();
			}
			return name.trim();
		});
		result.push(data.trim());
	}
	var lineArray = [];
	result.forEach(function (infoArray, index) {
		var line = infoArray;
		lineArray.push(line);
	});
	var csvContent = lineArray.join("\n");
	fs.writeFile("results/PDP-PLP-SeeMore.csv",csvContent, 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
