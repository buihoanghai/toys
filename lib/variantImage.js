const fs = require('fs');
const _ = require('lodash');
const globule = require('globule');
const dir = require('../lib/dir');
const dest = "ifarmer/img/";
const image = require("./image");
function generate(productId, variants) {
    let files = globule.find("google/" + productId + "/*.jpg");
    let path = dest + productId;
    dir.make(path);
    let result = [];
    _.each(files, async file => {
        await image.checkFile(file);
    });
    files = globule.find("google/" + productId + "/*.jpg");
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
    if(!file){
        console.log(url);
    }
    if(!file){
        console.log(url);
    }
    let arr = file.split("/");
    let fileName = arr[arr.length - 1];
    let fileExtension = fileName.split(".")[1];
    return url + "." + fileExtension;
}
function addImageForContent(product) {
    let productId = product.id;
    let path = dest + productId;

    dir.make(path);
    let files = globule.find(["google/" + productId + "/*.*", "!google/**/*.json"]);
    let file = files[10];
    let newFile = path + "/" + rename(file, product.id);
    fs.copyFile(file, newFile, () => {
    });
    // https://firebasestorage.googleapis.com/v0/b/ifarmer-e25f1.appspot.com/o/img%2Ftrai-binh-bat%2Ftrai-binh-bat-loai-dac-biet-trong-luong-1-kg.jpg?alt=media&token=6008e893-c74b-4bf0-be37-c1de0495202e
    // https://firebasestorage.googleapis.com/v0/b/ifarmer-e25f1.appspot.com/o/img/trai-bon-bon/trai-bon-bon.jpg?alt=media&token=6008e893-c74b-4bf0-be37-c1de0495202e
    newFile = newFile.replace("ifarmer/","")
        .replace(/\//g,"%2F");
    let imageURL=`https://firebasestorage.googleapis.com/v0/b/ifarmer-e25f1.appspot.com/o/${newFile}?alt=media&token=6008e893-c74b-4bf0-be37-c1de0495202e`;
    let imageElement =  `<amp-img width="16" height="9" layout="responsive" src="${imageURL}"></amp-img>`;
    product.content = `<p>Hình ảnh của ${product.name}:</p>${imageElement}` + product.content;
}
const revealed = {
    generate: generate,
    addImageForContent: addImageForContent
};

module.exports = revealed;