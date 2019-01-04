var fs = require('fs'),
	_ = require('lodash'),
	variantTypes = require('../data/variantTypes');
const config = require('../config/config');
const DEFAULT_VARIANT_TYPES = config.variantTypes;

function createVariant(product, str) {
	// var input = ["banh-chung","loai|dac-biet||so-luong|1-cai"];
	let urlName = getURLVariant(product, str);
	let variant =  {};
	let variants = str.split("||");
	variant.extraTittle = getExtraTittle(variants[0]) + " " + getExtraTittle(variants[1]);
	variant.product = product;
	variant.name = product;
	variant.id = urlName;
	variant.dateCreated = new Date();
	variant.dateModified = new Date();
	let variantTypes = variant.variantTypes = {};
	variantTypes[variants[0].split('|')[0]] = variants[0].split('|')[1];
	variantTypes[variants[1].split('|')[0]] = variants[1].split('|')[1];
	return variant;
}

function getExtraTittle(str) {
	let types = str.split("|");
	let variantType = variantTypes[types[0]];
	let result = [];
	result.push(variantType.name);
	let child = variantType.children[types[1]];
	if(!child){
		console.log(str);
	}
	result.push(child.name);
	return result.join(" ");
}

function getURLVariant(product, str) {
	let result = [];
	result.push(product);
	result.push(str.replace(/\|\|/g, '-').replace(/\|/g, '-'));
	return result.join("-");
}

function create(product, str) {
	// var input = ["banh-chung", "so-luong|1-cai|1-cap|2-cap||loai|dac-biet|truyen-thong"];
	str = str ? str : DEFAULT_VARIANT_TYPES;
	let result = [];
	let variantType1 = str.split("||")[0];
	let variantType2 = str.split("||")[1];
	let variant1 = variantType1.split('|');
	let variant2 = variantType2.split('|');
	for (let i = 1; i < variant1.length; i++) {
		for (let j = 1; j < variant2.length; j++) {
			let strName = variant1[0] + "|" + variant1[i] + "||" + variant2[0] + "|" + variant2[j];
			let variant = createVariant(product, strName);
			result.push(variant);
		}
	}
	return result;
}

const revealed = {
	createVariant: createVariant,
	create: create,
	getURLVariant: getURLVariant,
	getExtraTittle: getExtraTittle
};

module.exports = revealed;