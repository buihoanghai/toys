const crawl = require("../lib/crawlGoogle");
const crawlImage = require("../lib/crawlGoogleImage");
const downloadImage = require("../lib/downloadImage");
const html = require("../lib/html");
const crawlWiki = require("../lib/crawlWiki");
const parseData = require("../lib/parseData");
const saveFile = require("../lib/saveFile");
const csv = require("../lib/csv");
const fs = require('fs');
const DELAY = 5000;
function process() {
	let unableFillDataKeywords = [];
	let deferers = [];
	const file = "data/google-keywords.csv";
	fs.readFile(file, 'utf8', function (err, data) {
		let arr = csv.CSVToArray(data);
		let offset = 0;
		arr.map(function(item){
			setTimeout(function(){
				console.log(item);
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
					let processedData = parseData.parse(data[0]);
					processedData.wikiURL = data[1];
					processedData.googleURL = googleURL;
					crawlWiki.crawl(processedData.wikiURL).then((res) => {
						processedData.wikiDoc = html.parseHTML(res);
						crawlImage.crawl(googleURL+"&tbm=isch").then(res=>{
							processedData.listImages = res;
							// downloadImage.downloadAll(res,keyword);
							saveFile.save("google/" + keyword + ".json", JSON.stringify(processedData));
						});
						// translate.go("Hello world").then(data=>{
						// 	processedData.wikiDocVN = data;
						// 	saveFile.save("google/" + keyword + ".json", JSON.stringify(processedData));
						// });
					});
				});
				deferers.push(deferer);
				Promise.all(deferers).then(() => {
					if (unableFillDataKeywords.length!==0) {
						saveFile.save("google/unable-fill-data-keywords.json", JSON.stringify(unableFillDataKeywords));
					}
				});
			}, DELAY + offset);
			offset += DELAY;
		});
	});

}

process();
