const saveFile = require("../lib/saveFile");
const csv = require("../lib/csv");
const keywordGen = require("../lib/keyword");
const crawlGoogleSnippet = require("../lib/crawlGoogleSnippet");
const fs = require('fs');
const DELAY = 1000;

function process() {
	const file = "google-snippet/keywords.csv";
	fs.readFile(file, 'utf8', function (err, data) {
		let arr = csv.CSVToArray(data);
		let offset = 0;
		arr.map(function (item) {
			setTimeout(function () {
				console.log(item);
				if (!item[0]) {
					return;
				}
				let keyword = keywordGen.keywordSearch(item[0]);
				let processedData = [];
				let googleURL = "https://www.google.co.id/search?q=" + keyword;
				let deferer = crawlGoogleSnippet.crawl(googleURL).then((data) => {
					saveFile.updateFile("google-snippet/result.csv", item[0] + "," + data.join(", "));
				});

			}, DELAY * offset);
			offset++;
		});
	});

}

process();
