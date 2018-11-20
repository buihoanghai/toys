const _ = require('lodash');

const HEADERS = ["section", "type", "title", "go-to-url", "go-to-title", "items", "name", "url", "price", "store-count", "image-url", "brand-name", "label", "store-name"];

function CSVToArray( strData, strDelimiter ){
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || ",");

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
	while (arrMatches = objPattern.exec( strData )){

		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[ 1 ];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			strMatchedDelimiter !== strDelimiter
		){

			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push( [] );

		}

		var strMatchedValue;

		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[ 2 ]){

			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			strMatchedValue = arrMatches[ 2 ].replace(
				new RegExp( "\"\"", "g" ),
				"\""
			);

		} else {

			// We found a non-quoted value.
			strMatchedValue = arrMatches[ 3 ];

		}


		// Now that we have our value string, let's add
		// it to the data array.
		arrData[ arrData.length - 1 ].push( strMatchedValue );
	}

	// Return the parsed data.
	return( arrData );
}
function arrayToJson(table) {
	var result = {};
	var heads = new Array(20);
	var items;
	var item;
	var currentRow;
	_.each(table, (row, indexRow) => {
		// console.log("row", indexRow);
		if(items){
			if(Object.keys(item).length){
				items.push(_.clone(item));
			}
		}
		_.each(row, (cell, indexCol) => {
			cell = cell.trim ? cell.trim() : "";
			if (isHeader(cell)) {
				heads[indexCol] = cell;
				// console.log("header", cell);
				switch (cell){
					case "items":
						items = [];
						item = {};
						currentRow["items"]= items;
						break;
					default:

				}

			} else {
				if (cell) {
					// console.log("cell", heads[indexCol], indexCol, cell);
					switch (heads[indexCol]){
						case "section":
							result[cell] = currentRow = {};
							items = undefined;
							item = undefined;
							break;
						default:
							if(item){
								item[heads[indexCol]] = cell;
							}else {
								currentRow[heads[indexCol]] = cell;
							}
					}

				}
			}
		})
	});
	return result;
}
function isHeader(str){

	return HEADERS.includes(str);
}
const Util = {
	CSVToArray : CSVToArray,
	arrayToJson: arrayToJson
};
module.exports = Util;