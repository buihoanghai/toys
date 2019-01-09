const saveFile = require("../lib/saveFile");
const csv = require("../lib/csv");
const keywordGen = require("../lib/keyword");
const crawlGoogleSnippet = require("../lib/crawlGoogleSnippet");
const fs = require('fs');
const DELAY = 20000;

function process() {
	const file = "google-snippet/keywords.csv";
	fs.readFile(file, 'utf8', function (err, data) {
		let arr = csv.CSVToArray(data);
		let offset = 0;
		let googleURL = arr[0][0] || "https://www.google.co.id/search?q=";
		arr.map(function (item, index) {
			if(index === 0){
				return;
			}
			setTimeout(function () {
				console.log(item);
				if (!item[0]) {
					return;
				}
				let keyword = keywordGen.keywordSearch(item[0]);
				let url = googleURL +keyword;
				let deferer = crawlGoogleSnippet.crawl(url).then((data) => {
					saveFile.updateFile("google-snippet/result.csv", item[0] + "," + data.join(", "));
				});

			}, DELAY * offset);
			offset++;
		});
	});

}

process();
