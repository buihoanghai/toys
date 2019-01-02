const _ = require('lodash');
const util = require('./lib/util');
const fs = require('fs');
var globule = require('globule');
function process() {
    var path = "parse-csv/data/homepage/*.csv";
    let files = globule.find(path);
    _.each(files, file => {
        fs.readFile(file, 'utf8', function (err, data) {
            var json = util.CSVToArray(data);
            var arr = util.arrayToJson(json);
            fs.writeFile("data/homepage/" + file.split("/")[file.split("/").length - 1] + ".json", JSON.stringify(arr), function (err) {
                if (err) {
                    console.log('Some error occured - file either not saved or corrupted file saved.');
                } else {
                    console.log('It\'s saved!');
                }
            });
        });
    });


}

process();
