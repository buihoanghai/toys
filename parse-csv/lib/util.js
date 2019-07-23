const _ = require('lodash');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = new XMLHttpRequest();
const HEADERS = ["section", "type", "title", "go-to-url", "go-to-title", "items", "items1", "name", "url", "price", "store-count", "image-url", "brand-name", "label", "store-name", "main-url"];

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
	var items1;
	var item;
	var item1;
	var currentRow;
	var addItem1, addItem;
	var indexColTemp1 = 999;
	_.each(table, (row, indexRow) => {
		// console.log("row", indexRow);
		if (items1) {
			if (Object.keys(item1).length) {
				items1.push(_.clone(item1));
				item1 = {};
			}
		}
		if (items) {
			if (Object.keys(item).length) {
				items.push(_.clone(item));
				item = {};
				item1 = {};
			}
		}

		_.each(row, (cell, indexCol) => {
			cell = cell.trim ? cell.trim() : "";
			if (isHeader(cell)) {
				heads[indexCol] = cell;
				// console.log("header", cell);
				switch (cell) {
					case "items":
						items = [];
						item = {};
						currentRow["items"] = items;
						addItem = true;
						addItem1 = false;
						break;
					case "items1":
						indexColTemp1 = indexCol;
						items1 = [];
						item1 = {};
						item["items"] = items1;
						addItem1 = true;
						break;
					default:

				}

			} else {
				if (cell) {
					// console.log("cell", heads[indexCol], indexCol, cell);
					switch (heads[indexCol]) {
						case "section":
							result[cell] = currentRow = {};
							items = undefined;
							items1 = undefined;
							item = undefined;
							item1 = undefined;
							addItem1 = false;
							indexColTemp1 = 999;
							break;
						case "items":
							items1 = undefined;
							item1 = undefined;
							addItem1 = false;
							break;
						default:
							if (item) {
								if (item1) {
									if (indexColTemp1 <= indexCol) {
										item1[heads[indexCol]] = cell;
									} else {
										item[heads[indexCol]] = cell;
									}
								} else {
									item[heads[indexCol]] = cell;
								}
							} else {
								if(!currentRow){
									console.log("te",heads[indexCol]);
								}
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
const unchangedHeader = ["heading","store", "color", "search"];
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
			item[0]="z-please-not-change";
			item[1]="z-please-not-change";
			item[2]="z-please-not-change";
			unchanged.push(item);
			return;
		}
		result.push(item);
	});
	result = result.concat(unchanged);
    result = headingReplaceH1(result);

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

function sortFinal(arr){
    return _.sortBy(arr, [0], [1]);
}
function UrlExists(url) {
	http.open('HEAD', url, false);
	http.send();
	if (http.status === 404) {
		console.log("404");
		return false;
	}
	console.log(http.status);
	//  do something
	return true;
}
function buildInternationalArr(arr){
	var result = [];
	for (var i = 1; i < arr.length; i++) {
		let url = arr[i][0];
		 let item=[];
		 item.push(url);
		 item.push(true);
		// item.push(UrlExists(url));
		if(UrlExists(url))
		{
			result.push(item);
		}
	}
	return result;
}
function headingReplaceH1(array){
	var result = [];
	for (var i = 0; i < array.length; i++) {
		if (array[i][3].indexOf("[[heading]]") !== -1 && array[i][4].indexOf("h1") !== -1 && array[i][0] !== "z-please-not-change") {
			var key = array[i][4].replace("h1", "heading");
            for (var j = 0; j < array.length; j++) {
				if (array[j][4] == key) {
                    var str = array[i][3].replace("[[heading]]", array[j][3]);
					array[i][3] = str;
                    break;
				}
			}
		}
        result.push(array[i]);
	}
    result = sortFinal(result);
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
	buildCol: buildCol,
    headingReplaceH1: headingReplaceH1,
	buildInternationalArr: buildInternationalArr
};
module.exports = Util;