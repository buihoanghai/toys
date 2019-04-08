const _ = require('lodash');
const globule = require('globule');
const saveFile = require("../lib/saveFile");
const csv = require("../lib/csv");
const puppeteer = require('puppeteer');
const crawFile = require("./crawl301");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const pageTypeFile = "./iprice/data/301-redirect-thanh.csv";


async function main() {
    console.log("start");
    let redirectArr = await csv.getArrDataLowerCaseFromCSV(pageTypeFile);
    let emptyFinalSlash = 0;
    let finalX = 0;
    let curryBracket = 0;
    let squareBracket = 0;
    let other = 0;
    let total = redirectArr.length;
    for (let i = 1; i <= total; i++)
    {
        let item = redirectArr[i];
        if (!item)
        {
            continue;
        }
        let url = item[0].replace("HTTP/1.1", "").replace("HTTP/2.0", "").replace("get ", "").replace("head ", "");
        if (_.endsWith(url, "/x ") || _.endsWith(url, "/x"))
        {
            finalX++;
            continue;
        };
        if (_.includes(url, "{{"))
        {
            curryBracket++;
            continue;
        }
        if (_.includes(url, "["))
        {
            squareBracket++;
            continue;
        }
        if (!url.endsWith("/") && !_.endsWith(url, "/x ") || !_.endsWith(url, "/x"))
        {
            emptyFinalSlash++;
            continue;
        }
        other++;
    }
    let result = [];
    result.push(["total", total, (total/total*100).toFixed(2) + "%"]);
    result.push(["finalX", finalX, (finalX/total*100).toFixed(2) + "%"]);
    result.push(["missLastSlash", emptyFinalSlash, (emptyFinalSlash/total*100).toFixed(2) + "%"]);
    result.push(["curryBracket", curryBracket, (curryBracket/total*100).toFixed(2) + "%"]);
    result.push(["squareBracket", squareBracket, (squareBracket/total*100).toFixed(2) + "%"]);
    result.push(["others", (other/total*100).toFixed(2) + "%"]);
    saveFile.saveCSVFile("iprice/data/result.csv", result);
    console.log(result);
}

async function checkExistUrl()
{
    console.log("start");
    let redirectArr = await csv.getArrDataLowerCaseFromCSV(pageTypeFile);
    let total = redirectArr.length;
    let result = [];
    let resultArray = [];
    resultArray.push(["request.keyword: Descending", "http_referer.keyword: Descending", "http_user_agent.keyword: Descending", "Count", "Exist"]);
    for (let i = 1; i <= total - 1; i++)
    {
        await sleep(100);
        console.log(i);
        let isExist = false;
        let item = redirectArr[i];
        let urlPattern = item[0].replace(" http/1.1", "").replace(" http/2.0", "").replace("get ", "").replace("head ", "");
        let url = item[1];
        if (!item)
        {
            continue;
        }
        if (!urlPattern.endsWith("/") && !urlPattern.endsWith("/x ") && !urlPattern.endsWith("/x") && !_.includes(urlPattern, "{{") && !_.includes(urlPattern, "["))
        {
            console.log(urlPattern);
            let xmlHttp = null;

            xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", url+'/', false );
            xmlHttp.send( null );
            let pageContent = xmlHttp.responseText;
            if (_.includes(pageContent, urlPattern))
            {
                isExist = true;
            }
            resultArray = [item[0], item[1], item[2], item[3], isExist];
            console.log(resultArray);
            result.push(resultArray);
        }
    }
    console.log("end");
    saveFile.saveCSVFile("iprice/data/301-redirect-thanh-result.csv", result);
}

const sleep = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

main();
checkExistUrl();