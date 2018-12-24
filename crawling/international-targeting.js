const pages = require("../data/id-th");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = new XMLHttpRequest();

const _ = require('lodash');
const fs = require('fs');
const puppeteer = require('puppeteer');

function process() {
	for (var i = 1; i < pages.length; i++) {
		let url = pages[i][0];
		console.log(UrlExists(url));
	}
}

async function processPage() {

}


async function crawl(url) {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: '/usr/bin/google-chrome'
	});
	const page = await browser.newPage();
	await page.goto(url);
	await page.evaluate(() => {
		let data= processPage()
			.then()
			.catch(console.error)
	});

	//await browser.close();
}
function UrlExists(url) {
	http.open('HEAD', url, false);
	http.send();
	if (http.status === 404){
		return false;
	}
	//  do something
	return true;
}

process();