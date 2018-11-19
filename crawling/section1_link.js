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
	for(var i = 0; i<homepage.section1_link.items.length;i++){
		let item = homepage.section1_link.items[i];
		await page.goto(config.url + item.url);
		const data = await page.evaluate(() => {
			var elem = document.querySelector("#b-c");
			return elem.innerText;
		});
		result.push(data.trim());
	}
	var lineArray = [];
	result.forEach(function (infoArray, index) {
		var line = infoArray;
		lineArray.push(line);
	});
	var csvContent = lineArray.join("\n");
	fs.writeFile("results/section1_link.csv",csvContent, 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
	await browser.close();

})();
