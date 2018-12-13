const puppeteer = require('puppeteer');
const homepage = require("../data/Homepage - MY");
const config = require("../config/config");
const _ = require('lodash');
const fs = require('fs');
var result = [];
(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: '/usr/bin/google-chrome'
	});
	const page = await browser.newPage();
	await page.goto("https://ticket.tickethotline.com.my/");

	const result = await page.evaluate(() => {
		reload();
		async function reload() {
			document.location.reload();
			await delay(10000);
			let items = document.querySelector('.center.red.white-text');
			console.log("Tim text");
			if (items) {
				console.log("chua co ve");
				reload();
			} else {
				if(document.querySelector('body').innerText.length<100){
					reload();
				}else{
					document.location.href="https://www.youtube.com/watch?v=cWwEzknAbgc&list=RDMMcWwEzknAbgc&start_radio=1";
				}
			}
			function delay(time) {
				return new Promise(function(resolve) {
					setTimeout(resolve, time)
				});
			}
		}


	});

	//await browser.close();

})();
