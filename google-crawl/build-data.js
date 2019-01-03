const _ = require('lodash');
const fs = require('fs');
const globule = require('globule');
const product = require("../lib/product");
const variantImage = require("../lib/variantImage");
const variant = require("../lib/variant");
const shortDescription = require("../lib/shortDescription");
const saveFile = require("../lib/saveFile");
const path = "google/*/*.json";
function process(){
	let files = globule.find(path);
	let products = [];
	let variants = [];
	_.each(files, async file => {
		await fs.readFile(file, 'utf8', function (err, data) {
			let json = JSON.parse(data);
			let prod = product.create(json);
			products.push(prod);
			let vars = variant.create(prod.id, prod.variants);
			vars = variantImage.generate(prod.id,vars);
			shortDescription.generateForVariants(vars, prod.name);
			_.each(vars, v => {
				variants.push(v);
			});
		});
	});
	setTimeout(()=>{
		saveFile.save("ifarmer/products.json", JSON.stringify(products));
		saveFile.save("ifarmer/variants.json", JSON.stringify(variants));
	},5000);


}
process();