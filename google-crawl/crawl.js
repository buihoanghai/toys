const crawl = require("../lib/crawlGoogle");
const crawlImage = require("../lib/crawlGoogleImage");
const downloadImage = require("../lib/downloadImage");
const dir = require("../lib/dir");
const keywordGen = require("../lib/keyword");
const html = require("../lib/html");
const crawlWiki = require("../lib/crawlWiki");
const parseData = require("../lib/parseData");
const saveFile = require("../lib/saveFile");
const csv = require("../lib/csv");
const fs = require('fs');
const DELAY = 12000;

function process() {
    let unableFillDataKeywords = [];
    let defereds = [];
	  dir.make("google");
	  dir.make("ifarmer");
    const file = "google-crawl/google-keywords.csv";
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
                let googleURL = "https://www.google.com.vn/search?q=" + keyword;
                let deferer = crawl.crawl(googleURL).then((data) => {setTimeout(() => {
		saveFile.save("ifarmer/products.json", JSON.stringify(products));
		saveFile.save("ifarmer/variants.json", JSON.stringify(variants));
	}, 5000);
                    if (!data) {
                        unableFillDataKeywords.push({
                            googleURL: googleURL,
                            keyword: keyword
                        });
                        console.error("Can not find data for this keyword:", keyword);
                        return;
                    }
                    let processedData = parseData.parse(data[0]);
                    processedData.name = item[0];
                    processedData.id = keywordGen.create(processedData.name);
                    dir.make("google/" + processedData.id);
                    processedData.variants = item[1];
                    processedData.title = processedData.name;
                    processedData.wikiURL = data[1];
                    processedData.googleURL = googleURL;
                    crawlImage.crawl(googleURL + "&tbm=isch").then(res => {
                        console.log(res.length);
                        processedData.listImages = res;
                        downloadImage.downloadAll(res, processedData.id);
                        if(!processedData.wikiURL){
                            saveFile.save("google/" + processedData.id + "/" + processedData.id + ".json", JSON.stringify(processedData));
                        }else{
                            crawlWiki.crawl(processedData.wikiURL).then((res) => {
                                console.log(res);
                                processedData.wikiDoc = html.parseHTML(res);
                                saveFile.save("google/" + processedData.id + "/" + processedData.id + ".json", JSON.stringify(processedData));
                                // translate.go("Hello world").then(data=>{
                                // 	processedData.wikiDocVN = data;
                                // 	saveFile.save("google/" + keyword + ".json", JSON.stringify(processedData));
                                // });
                            });
                        }


                    });

                });
                defereds.push(deferer);
                Promise.all(defereds).then(() => {
                    if (unableFillDataKeywords.length !== 0) {
                        saveFile.save("google/unable-fill-data-keywords.json", JSON.stringify(unableFillDataKeywords));
                    }
                });
            }, DELAY * offset);
            offset ++;
        });
    });

}

process();
