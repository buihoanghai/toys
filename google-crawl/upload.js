const _ = require('lodash');
const prods = require('../ifarmer/products');
const vars = require('../ifarmer/variants');
const products = require('../lib/model/Products');
const variants = require('../lib/model/Variants');
const uploadImage = require('../lib/uploadImage');

function process(){
	products.saveProducts(prods);
	variants.saveVariants(vars);
	uploadImage.getFiles("ifarmer/img/*/*.*");
}
process();