const _ = require("lodash");

const NUTRITION_NAME = [
	{
		name: "Total Fat",
		vnName: "Tong chat beo"
	},
	{
		name: "Cholesterol",
		vnName: "Cholesterol"
	},
	{
		name: "Sodium",
		vnName: "Kem"
	},
	{
		name: "Potassium",
		vnName: "Potassium"
	},
	{
		name: "Total Carbohydrate",
		vnName: "Total Carbohydrate"
	},
	{
		name: "Protein",
		vnName: "Protein"
	}
];

function parse(str) {
	var arr = str.split('\n');
	return processArr(arr);
}

function processArr(arr) {
	var isStartDailyValue = false;
	var nutritionFact = {};
	var dailyNutrition = [];
	let result = {};
	_.each(arr, item => {
		if (item.indexOf("Description") === 0) {
			result.description = item.replace("Description", "");
			return true;
		}
		if (item.indexOf("Nutrition Facts") === 0) {
			nutritionFact = {};
			result.nutritionFact = nutritionFact;
			return true;
		}
		if (item.indexOf("Calories ") === 0) {
			nutritionFact.calories = item.replace("Calories ", "");
			return true;
		}
		if (item.indexOf("% Daily Value*") === 0) {
			isStartDailyValue = true;
			nutritionFact.dailyNutrition = dailyNutrition;
			return true;
		}
		if (item.indexOf("*Per cent Daily Values") === 0) {
			return false;
		}
		if (isStartDailyValue && item.split("\t").length < 3) {
			let nutrition = parseDailyNutrition(item);
			if(nutrition){
				dailyNutrition.push(nutrition);
			}
			return true;
		}
		if (isStartDailyValue && item.split("\t").length === 4) {
			let vitamins = parseDailyVitamin(item);
			dailyNutrition.push(...vitamins);
			return true;
		}



	});
	return result;
}

function parseDailyNutrition(str) {
	var result = {};
	let existNutrition = false;
	_.each(NUTRITION_NAME, nutrition => {
		if (str.indexOf(nutrition.name) === 0) {
			result.name = nutrition.name;
			result.vnName = nutrition.vnName;
			existNutrition = true;
			str = str.replace(nutrition.name, "").trim();
		}
	});
	if (!existNutrition) {
		console.warn("cannot find this nutrition:", str);
		return;
	}
	let arr = str.split("\t");
	result.value = arr[0];
	result.dailyValue = arr[1];
	return result;
}

function parseDailyVitamin(str) {
	var result = [];
	var arr = str.split("\t");
	let item1 = {
		name: arr[0],
		vnName: arr[0],
		dailyValue: arr[1]
	};
	let item2 = {
		name: arr[2],
		vnName: arr[2],
		dailyValue: arr[3]
	};
	result.push(item1);
	result.push(item2);
	return result;
}

const revealed = {
	parse: parse,
	processArr: processArr,
	parseDailyVitamin: parseDailyVitamin,
	parseDailyNutrition: parseDailyNutrition,
};

module.exports = revealed;