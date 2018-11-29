const _ = require('lodash');
const util = require('./lib/util');
const fs = require('fs');
function process() {
    var file = "parse-csv/data/metaTags.csv";
    fs.readFile(file, 'utf8', function (err, data) {
        var json = util.CSVToArray(data);
        var arr = util.buildMetaTags(json);
        fs.writeFile("data/metaTag.json", JSON.stringify(arr), function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
            } else {
                console.log('It\'s saved!');
            }
        });
        var lineArray = [];
        arr.forEach(function (infoArray, index) {
            var line = infoArray.join("\t");
            lineArray.push(line);
        });
        var csvContent = lineArray.join("\n");
        fs.writeFile("results/metaTags.csv", csvContent, 'utf8', function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
            } else {
                console.log('It\'s saved!');
            }
        });
    });
}
process();