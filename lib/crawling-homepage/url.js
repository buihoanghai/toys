var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = new XMLHttpRequest();

function processResponse(text) {
	console.time("processResponse");
	if (isCrawl(text)) {
		return [];
	}
	let reget = new RegExp("\\s?(href=\")(f|ht)(tp)(s?)(://)([^\\.]*)[\\.|/](\\S*)", "gm");
	let matches;
	let qualities = [];
	while ((matches = reget.exec(text))) {
		let url = decodeURIComponent(matches[0]);
		// console.log(url);
		url = getURLFromStr(url);
		qualities.push({
			href: url
		});
	}
	console.timeEnd("processResponse");
	return qualities;
}

function isCrawl(text) {
	if (text.indexOf("noindex") > -1) {
		return true;
	}
	return false;
}

function getURLFromStr(str) {
	return str.split("\"")[1];
}

function getResponse(url) {
	return new Promise(resolve => {
		console.log("getResponse", url);
		console.time("getResponse");
		http.open('GET', url, false);
		http.send();
		// console.log(http.responseText.length);
		console.timeEnd("getResponse");
		resolve(http.responseText);
	});
}

let revealed = {
	processResponse,
	getResponse
};
module.exports = revealed;
