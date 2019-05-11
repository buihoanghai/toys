function getUrls(text) {
	let reget = new RegExp("\\s?(href=\")(f|ht)(tp)(s?)(://)([^\\.]*)[\\.|/](\\S*)", "gm");
	let matches;
	let qualities = [];
	while ((matches = reget.exec(text))) {
		let url = decodeURIComponent(matches[0]);
		// console.log(url);
		url = getURLFromStr(url);
		qualities.push(url);
	}
	return qualities;
}

function getURLFromStr(str) {
	return str.split("\"")[1];
}

let revealed = {
	getUrls
};
module.exports = revealed;
