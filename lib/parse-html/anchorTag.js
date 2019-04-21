function getUrls(str) {
	let reget = new RegExp("\\s?(f|ht)(tp)(s?)(://)([^\\.]*)[\\.|/](\\S*)", "gi");
	let matches;
	let qualities = [];
	let i = 0;
	while (i < 100 && (matches = reget.exec(str))) {
		i++;
		let url = decodeURIComponent(matches[0]);
		console.log(url);
		qualities.push(url);
	}
	return qualities;
}

let revealed = {
	getUrls
};
module.exports = revealed;
