const _ = require('lodash');

function create(json) {
	let result = {};
	let specs = [], shortSpecs = [];
	if (json.nutritionFact) {
		specs = buildSpecs(json.nutritionFact);
		shortSpecs = buildShortSpecs(json.nutritionFact);
	}
	result[json.url] = {
		content: json.wikiDoc,
		name: json.name,
		shortSpecs: shortSpecs,
		specs: specs,
		title: json.name,
		dateCreated: new Date(),
		dateModified: new Date(),
	};
	console.log(result);
	return result;
}

function buildSpecs(nutritionFact) {
	let specs = [];
	_.each(nutritionFact.dailyNutrition, nutrition => {
		specs.push({name: nutrition.vnName, value: nutrition.value, note: nutrition.dailyValue + " nhu cầu hàng ngày"})
	});
	return specs;
}

function buildShortSpecs(nutritionFact) {
	let shortSpecs = [];
	shortSpecs.push({name: "Mỗi 100g có:"});
	shortSpecs.push({name: "Calo: " + nutritionFact.calories});
	_.each(nutritionFact.dailyNutrition, (nutrition, index) => {
		if(index === 3){
			return false;
		}
		shortSpecs.push({name: nutrition.vnName, value: nutrition.value})
	});
	return shortSpecs;
}

const revealed = {
	create: create
};

module.exports = revealed;