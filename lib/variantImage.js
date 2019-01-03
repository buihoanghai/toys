const fs = require('fs');
const _ = require('lodash');
const globule = require('globule');
const dir = require('../lib/dir');
const dest = "ifarmer/img/";

function generate(product, variants) {
    let files = globule.find(["google/" + product + "/*.*", "!google/**/*.json"]);
    let path = dest + product;
    dir.make(path);
    let result = [];
    _.each(variants, (variant, index) => {
        let v = _.cloneDeep(variant);
        let file = files[index];
        let newFile = path + "/" + rename(file, v.id);
        fs.copyFile(file, newFile, () => {
        });
        newFile = newFile.replace("ifarmer/","");
        v.images = [newFile];
        result.push(v);
    });
    return result;
}

function rename(file, url) {
    // google/dua-hau/dua-hau12.jpg
    let arr = file.split("/");
    let fileName = arr[arr.length - 1];
    let fileExtension = fileName.split(".")[1];
    return url + "." + fileExtension;
}

const revealed = {
    generate: generate
};

module.exports = revealed;