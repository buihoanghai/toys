const saveFile = require("../lib/saveFile");
const csv = require("../lib/csv");
const keywordGen = require("../lib/keyword");
const crawlGoogleSnippet = require("../lib/crawlGoogleSnippet");
const fs = require('fs');
const DELAY = 4000;

function getCountrySearch(cc) {
	switch (cc) {
		case "MY":
			return "https://www.google.com.my/search?q=";
		case "PH":
			return "https://www.google.com.ph/search?q=";
		case "SG":
			return "https://www.google.com.sg/search?q=";
		case "TH":
			return "https://www.google.co.th/search?q=";
		case "VN":
			return "https://www.google.com.vn/search?q=";
		case "HK":
			return "https://www.google.com.hk/search?q=";
		case "ID":
			return "https://www.google.co.id/search?q=";
	}
	return  "https://www.google.co.id/search?q=";
}

function process() {
	const file = "google-snippet/paaaage-type.csv";
	fs.readFile(file, 'utf16le', function (err, data) {
		let arr = csv.CSVToArray(data);
		let offset = 0;
		arr.map(function (item, index) {
			if (index === 0) {
				return;
			}
			setTimeout(function () {
				console.log(item);
				if (!item[0]) {
					return;
				}
				let googleURL = getCountrySearch(item[0]);
				let keyword = keywordGen.keywordSearch(item[1]);
				let url = googleURL + keyword;
				let deferer = crawlGoogleSnippet.crawl(url).then((data) => {
					saveFile.updateFile("google-snippet/result1.csv", item[1] + "," + data.join(", "));
				});

			}, DELAY * offset);
			offset++;
		});
	});

}

process();
