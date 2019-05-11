const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const URL = require("./url");
const _ = require("lodash");
const http = new XMLHttpRequest();
let visitedStr = "";

function getResponse(url) {
	console.log("getResponse", url);
	http.open('GET', url, false);
	http.send();
	return http.responseText;
}

function goToURL(url) {
	if (visitedStr.indexOf(url) > -1) {
		return;
	}
	visitedStr += url;
	let res = getResponse(url);
	let links = URL.getUrls(res);
	console.log("Found", links.length);
	processLinks(links);
}

function processLinks(urls) {
	_.each(urls, url => {
		// console.log(url);
		goToURL(url);
	})
}

let revealed = {
	getResponse,
	goToURL
};
module.exports = revealed;
