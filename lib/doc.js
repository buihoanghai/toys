const _ = require('lodash');
const articles = require("./articles");

function docToArray(strData, strDelimiter) {
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || "\n");

	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		(
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

			// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
		),
		"gi"
	);


	// Create an array to hold our data. Give the array9
	// a default empty first row.
	var arrData = [[]];

	// Create an array to hold our individual pattern
	// matching groups.
	var arrMatches = null;


	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec(strData)) {

		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[1];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			strMatchedDelimiter !== strDelimiter
		) {

			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push([]);

		}

		var strMatchedValue;

		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[2]) {

			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			strMatchedValue = arrMatches[2].replace(
				new RegExp("\"\"", "g"),
				"\""
			);

		} else {

			// We found a non-quoted value.
			strMatchedValue = arrMatches[3];

		}

		// console.log(strMatchedValue);
		if (strMatchedValue === "ENDFILEHERE") {
			break;
		}
		// Now that we have our value string, let's add
		// it to the data array.
		arrData[arrData.length - 1].push(strMatchedValue);
	}

	// Return the parsed data.
	return (arrData);
}

function separateFile(arr) {
	let result = [];
	let temp = [];
	let countEnter = 0;
	_.each(arr, item => {
		if (item[0] === "") {
			countEnter++;
			if (countEnter === 2) {
				result.push(temp);
				reset();
			}
			return true;
		}
		else {
			temp.push(item[0]);
		}
	});

	function reset() {
		temp = [];
		countEnter = 0;
	}

	return result;
}

function parseFiles(str) {
	let arr = docToArray(str);
	let files = separateFile(arr);
	console.log("file",files.length);
	let article = articles.createArticle(files[1]);
	return files;
}

function generateArticles(arr) {
	let result = [];
	_.each(arr, item => {
		let article = articles.createArticle(item);
		result.push(article);
	});
	return result;
}

const revealed = {
	parseFiles: parseFiles
};

module.exports = revealed;