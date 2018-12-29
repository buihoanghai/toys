const puppeteer = require('puppeteer');

const URL = "https://ticket.tickethotline.com.my/";

async function reloadPage() {
	document.location.reload();
	await sleep(10000);
	let items = document.querySelector('.center.red.white-text');
	console.log("Tim text");
	if (items) {
		console.log("chua co ve");
		reloadPage();
	} else {
		if(document.querySelector('body').innerText.length<100){
			reloadPage();
		} else {
			document.location.href="https://www.youtube.com/watch?v=cWwEzknAbgc&list=RDMMcWwEzknAbgc&start_radio=1";
		}
	}
}

const sleep = (time) => {
	return new Promise(function(resolve) {
		setTimeout(resolve, time)
	});
}

async function crawl(url) {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: '/usr/bin/google-chrome'
	});
	const page = await browser.newPage();
	await page.goto(url);
	await page.evaluate(() => {
		reloadPage()
			.then()
			.catch(console.error)
	});

	//await browser.close();
}


crawl(URL)
	.then()
	.catch(console.error);
