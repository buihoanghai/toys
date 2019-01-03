var fs = require('fs'),
	_ = require('lodash');
const phone = "LH: 091 832 7819";

function generateShortDescription(product, index) {
	let template = [
		`Giá ${product} hôm nay, ${phone}`,
		`Giá ${product} hôm nay, ${phone}`,
		`Giá ${product} hôm nay, ${phone}`,
		`Giá ${product} hôm nay, ${phone}`,
		`Giá ${product} hôm nay, ${phone}`,
		`Giá ${product} hôm nay, ${phone}`,
		`Giá ${product} hôm nay, ${phone}`,
		`Giá ${product} hôm nay, ${phone}`,
		`Giá ${product} hôm nay, ${phone}`,
		`Giá ${product} hôm nay, ${phone}`,
	];
	return template[index];
}

function generateForVariants(variants, name) {
	_.each(variants, (variant, index) => {
		variant.shortDescription = generateShortDescription(name, index);
		if (variant.nutritionFact) {
			let randomIndex = getRandomIndex(variant.nutritionFact.dailyValue);
			variant.shortDescription += " " + generateNutrition(variant.name, variant.nutritionFact[randomIndex])
		}
	});
}

function getRandomIndex(arr) {
	return generateRandomNumber(0, arr.length);
}

function generateRandomNumber(min, max) {
	let random_number = Math.random() * (max - min) + min;
	return Math.floor(random_number);
}

function generateNutrition(product, nutrition) {
	return `Với 100g ${product} đã đủ cung cấp ${nutrition.dailyValue} nhu cầu ${nutrition.vnName} của cơ thể trong một ngày`;
}

const revealed = {
	generateShortDescription: generateShortDescription,
	generateForVariants: generateForVariants
};

module.exports = revealed;