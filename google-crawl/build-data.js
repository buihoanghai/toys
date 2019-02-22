const _ = require('lodash');
const fs = require('fs');
const globule = require('globule');
const product = require("../lib/product");
const variantImage = require("../lib/variantImage");
const libVar = require("../lib/variant");
const shortDescription = require("../lib/shortDescription");
const saveFile = require("../lib/saveFile");
const dir = require('../lib/dir');
const path = "google/*/*.json";
let variant;
const sleep = (time) => {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	});
}
async function process() {
	let files = globule.find(path);
	let products = [];
	let variants = [];
	variant = await libVar.then(res => {
		return res;
	});
	dir.make("ifarmer/");
	dir.make("ifarmer/img/");
	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		await fs.readFile(file, 'utf8', function (err, data) {
			let json = JSON.parse(data);
			let prod = product.create(json);
			products.push(prod);

			let vars = variant.create(prod.id, prod.variants, prod.price);
			vars = variantImage.generate(prod.id, vars);
			variantImage.addImageForContent(prod);
			shortDescription.generateForVariants(vars, prod.name, json);
			_.each(vars, v => {
				variants.push(v);
			});
		});
		await sleep(20);
	}
	setTimeout(() => {
		saveFile.save("ifarmer/products.json", JSON.stringify(products));
		saveFile.save("ifarmer/variants.json", JSON.stringify(variants));
	}, 5000);


}

process();