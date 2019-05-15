const _ = require('lodash');
const fs = require('fs');
const globule = require('globule');
const util = require('../lib/util');

const dir = require('../lib/dir');
const path = "../projects/web/frontend/resources/icons/**/*@2x.*";


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

async function process() {
    let iClass = generateClassFromImage();
    let pageUrls = [
        'https://iprice.my/',
        'https://iprice.my/huawei/phones-tablets/smartphones/',
        'https://iprice.my/compare/apple-iphone-8-plus/',
        'https://iprice.my/coupons/',
        'https://iprice.my/coupons/lazada/',
        'https://iprice.my/trends/',
        'https://iprice.my/trends/technology/oneplus-is-launching-their-first-ever-pro-smartphone-and-its-hdr10-certified/',
    ];
    let result = checkNotUsingClass(pageUrls, iClass);
}

function generateClassFromImage() {
    let files = globule.find(path);
    let iClass = [];
    for (let i = 0; i < files.length; i++) {
        var imageName = 'i-' + files[i].split('/').pop().replace('@2x.png', '');
        iClass.push(imageName);
    }

    return iClass;
}

function checkNotUsingClass(pageUrls, iClass) {
    let pageContent = allPageContent(pageUrls);
    let result = [];
    for (let i = 0; i < iClass.length; i++) {
        pageContent = pageContent.replace("." + iClass[i], "");
        if (pageContent.indexOf(iClass[i]) === -1) {
            result.push(iClass[i]);
        }
    }
    console.log(result);
    return result;
}

function allPageContent(pageUrls) {
    let allContent = '';
    for (let i = 0; i < pageUrls.length; i++) {
        let pageContent = util.getResponse(pageUrls[i]);
        allContent += pageContent;
    }

    return allContent;
}

process();