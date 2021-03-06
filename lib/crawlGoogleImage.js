const puppeteer = require('puppeteer');

async function crawlGoogleImage(url) {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/google-chrome'
    });
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.evaluate(async () => {
        const sleep = (time) => {
            return new Promise(function (resolve) {
                setTimeout(resolve, time)
            });
        };
        await sleep(1000);
        var targetElements = document.querySelectorAll("#search a.rg_l");
        var result = [];
        for (var i = 0, j = 0; j < 20; i++) {
            if (i > 10000) {
                return [];
            }
            let item = targetElements[i];
            let imageUrl = item.href;
            if (imageUrl.split('imgurl=')[1] && imageUrl.indexOf(".jpg") > 0 &&imageUrl.indexOf(")") === -1) {
                imageUrl = imageUrl.split('imgurl=')[1].split('&')[0];
                result.push(decodeURIComponent(imageUrl));
                j++;
            } else {
                // alert(imageUrl);
            }
        }

        return result;
    });
    await browser.close();
    return data;
}

const sleep = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const revealed = {
    crawl: crawlGoogleImage
};

module.exports = revealed;