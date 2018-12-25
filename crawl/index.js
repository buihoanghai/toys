const crawl = require("../lib/crawl");
const crawlWiki = require("../lib/crawlWiki");
const parseData = require("../lib/parseData");
const saveFile = require("../lib/saveFile");
const csv = require("../lib/csv");
const fs = require('fs');
const DELAY = 5000;
function process() {
	let unableFillDataKeywords = [];
	let deferers = [];
	var file = "data/google-keywords.csv";
	fs.readFile(file, 'utf8', function (err, data) {
		var arr = csv.CSVToArray(data);
		var offset = 0;
		arr.map(function(item){
			setTimeout(function(){
				if (!item[0]) {
					return;
				}
				let keyword = item[0].split(" ").join("+");
				let googleURL = "https://www.google.com.vn/search?q=" + keyword;
				let deferer = crawl.crawl(googleURL).then((data) => {
					if (!data) {
						unableFillDataKeywords.push({
							googleURL: googleURL,
							keyword: keyword
						});
						console.error("Can not find data for this keyword:", keyword);
						return;
					}
					var processedData = parseData.parse(data[0]);
					processedData.wikiURL = data[1];
					processedData.googleURL = googleURL;
					crawlWiki.crawl(processedData.wikiURL).then((res) => {
						processedData.wikiDoc = res;
						saveFile.save("google/" + keyword + ".json", JSON.stringify(processedData));
						// translate.go("Hello world").then(data=>{
						// 	processedData.wikiDocVN = data;
						// 	saveFile.save("google/" + keyword + ".json", JSON.stringify(processedData));
						// });
					});
				});
				deferers.push(deferer);
				Promise.all(deferers).then(() => {
					if (unableFillDataKeywords.length!==0) {
						isSaveUnableFile = true;
						saveFile.save("google/unable-fill-data-keywords.json", JSON.stringify(unableFillDataKeywords));
					}
				});
			}, DELAY + offset);
			offset += DELAY;
		});
	});

}

process();
