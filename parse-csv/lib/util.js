const _ = require('lodash');

const HEADERS = ["section", "type", "title", "go-to-url", "go-to-title", "items", "name", "url", "price", "store-count", "image-url", "brand-name", "label", "store-name", "main-url"];

const ORDER = ["brand" , "series", "model", "category", "gender", "color"];


function sortArr(arr, order){
	var result = [];
	for(var i = 0;i< arr.length;i++){
		let item = {
			text: arr[i],
			point:calPoint(arr[i], order)
		};
		result.push(item);
	}
	result = _.sortBy(result,"point");
	var result1= [];
	_.each(result,  item=>{
		result1.push(item.text);
	});
	return result1;

}
function calPoint(str, order) {
	for (var i = 0; i < order.length; i++) {
		if (str === order[i])
			return i;
	}
	return -1;
}
// "plp.electronics.default_gender_category_title"
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
				item = {};
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
const removeHeader = ["discount","og","blog"];
const unchangedHeader = ["heading","store", "color"];
function isExist(str, headers){
	for(var i = 0;i<headers.length;i++){
		if(str.indexOf(headers[i]) !== -1){
			return true;
		}
	}
	return false;
}
function buildMetaTag(arr) {
	let result = [];
	let unchanged = [];
	_.each(arr, item => {
		if(isExist(item[4],removeHeader)){
			return;
		}

		let cols = item[4].trim().split("_");
		let t = [];
		t.push(cols[0]);
		let unsorted = cols.splice(1, cols.length - 2);
		// console.log(unsorted.join());
		let sorted = sortArr(unsorted, ORDER);
		_.each(sorted, i => {
			t.push(i);
		});
		t.push(cols[cols.length - 1]);
		item[4] = t.join("_");
		let data = buildCol(item[4]);
		item[0] = data[0];
		item[1] = data[1];
		item[2] = data[2];
		if(isExist(item[4],unchangedHeader) || item[0]==="default" || item[1]==="default"){
			item[0]="not";
			item[1]="not";
			item[2]="not";
			unchanged.push(item);
			return;
		}
		result.push(item);
	});
	result = result.concat(unchanged);

	return result;
}
function buildCol(str){
	let result = [];
	// "plp.sports-outdoor.default_discount_brand_series_model_meta"
	var items = str.split(".");
	var items1 = str.split("_");
	let unsorted = items1.splice(1, items1.length - 2);
	result.push(items[1]);
	if(items[0]==="pdp"){
		result.push("pdp");
	}else{
		result.push(unsorted.join("_"));
	}
	result.push(items1[items1.length -1]);
	return result;
}

function isHeader(str){

	return HEADERS.includes(str);
}
const Util = {
	CSVToArray : CSVToArray,
	arrayToJson: arrayToJson,
	buildMetaTag: buildMetaTag,
	sortArr: sortArr,
	buildCol: buildCol
};
module.exports = Util;