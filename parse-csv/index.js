const _ = require('lodash');
const util = require('./lib/util');
const fs = require('fs');
function process() {
	var file = "parse-csv/data/homepage/Homepage - ID1.csv";
	fs.readFile(file, 'utf8', function (err, data) {
		var json = util.CSVToArray(data);
		var arr = util.arrayToJson(json);
		fs.writeFile("data/Homepage - MY.json", JSON.stringify(arr), function(err) {
			if (err) {
				console.log('Some error occured - file either not saved or corrupted file saved.');
			} else {
				console.log('It\'s saved!');
			}
		});
	});

}

process();
// PLP-EL-Brand-Carousel.js:18:27
// PLP-FA-Brand-Carousel.js:16:14
// PLP-EL-BrandCategory-Carousel.js:17:27
//PDP-HB-Carousel.js:18:27

// PLP-FA-Category-Carousel.js:19:28
// PDP-EL-SeeMore.js:18:27
// PLP-FA-BrandCategory-Men-Carousel.js:19:27
// PLP-FA-BrandCategory-Women-Carousel.js:19:27

// PDP-EL-Carousel.
// 	PLP-FA-Brand-Carousel.js:17:27
// PLP-HB-Category-Carousel.js:19:28
