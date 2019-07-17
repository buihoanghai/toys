const _ = require('lodash');

function categorizePageType(arr, pageTypes) {
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		let item = arr[i];
		let data = _.cloneDeep(item);
		if (!data) {
			console.log("test", i);
		}
		let url = data[5];
		if (data.length) {
			data.unshift(getTypePage(url, pageTypes));
			result.push(data);
		}
	}
	return result;
}

function getTypePage(str, arr) {
	let result = "PLP";
	 //console.log("start", arr.length);
	_.each(arr, item => {
		if (isMatchPattern(str, item[1], item[2])) {
			result = item[3];
			return false;
		}
	});
	 //console.log(result);
	if (isArticle(str)) {
		result = "article";
	}
	if (result === "Homepage" || result === "homepage") {
		if (!isHomePage(str)) {
			if (isPDP(str)) {
				result = "pdp";
			} else {
				result = "plp";
			}
		}

	}
	// if (result === "Homepage") {
	// 	// //console.log(str, result);
	// }
	return result;
}

function isArticle(str) {
	if (str.indexOf("productnation.co") >= 0) {
		return true;
	}
	return false;
}

function isPDP(str) {
	if (str.indexOf("priceprice.com") >= 0 && str.indexOf("/?") === -1) {
		return true;
	}
	if (str.indexOf("www.tokopedia.com") >= 0 && !str.endsWith('/')) {
		return true;
	}
	return str.indexOf(".html") >= 0;
}

function isHomePage(str) {
	return !!str.match(/^http(s)?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*?(:[0-9]+)?(\/)?$/i);
}

function isMatchPattern(str, patern1, patern2) {
	// //console.log("isMatchPattern",patern1, patern2);
	if (!str || !patern2 || !patern1) {
		return false;
	}
	// str = str.toLowerCase();
	// patern1 = patern1.toLowerCase();
	// patern2 = patern2.toLowerCase();
	// var rx = new RegExp(expression, 'i');
	// return !!str.match(rx);
	// var expression = `(${patern1}${patern2})`;
	// var stri = `${patern1}${patern2}`;
	var stri = patern1 + patern2;

	if (stri.indexOf("www.price.com.hk/ec-product-detail.php") >= 0) {
		//console.log(str);
		//console.log("aaaaaaaaaaaaa", str.indexOf(stri) > 0);
	}
	return str.indexOf(stri) > 0;
}

let revealed = {
	categorizePageType,
	getTypePage,
	isArticle,
	isPDP,
	isHomePage,
};
module.exports = revealed;