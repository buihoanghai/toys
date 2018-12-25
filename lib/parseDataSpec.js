const parseData = require("./parseData");
describe("parseData", () => {
	describe("parse", () => {
		it("should return correct data", () => {
			var input = "abc\n\Descriptionnot a nut. Wikipedia";
			var expected = {description: "not a nut. Wikipedia"};
			expect(expected).toEqual(parseData.parse(input));
		});
	});
	describe("processArr", () => {
		it("should return correct data", () => {
			var input = ["Nutrition Facts",
				"Coconut",
				"Amount Per 100 grams",
				"Calories 354"
				];
			var expected = {nutritionFact: { calories: '354' }};
			expect(expected).toEqual(parseData.processArr(input));
		});
		it("should return correct data", () => {
			var input = [ "DescriptionThe coconut tree is a member of the palm tree family and the only living species of the genus Cocos. The term \"coconut\" can refer to the whole coconut palm, the seed, or the fruit, which botanically is a drupe, not a nut. Wikipedia",
				"Nutrition Facts",
				"Coconut",
				"Amount Per 100 grams",
				"Calories 354",
				"% Daily Value*",
				"Total Fat 33 g\t50%",
				"Saturated fat 30 g\t150%",
				"Polyunsaturated fat 0.4 g\t",
				"Monounsaturated fat 1.4 g\t",
				"Cholesterol 0 mg\t0%",
				"Sodium 20 mg\t0%",
				"Potassium 356 mg\t10%",
				"Total Carbohydrate 15 g\t5%",
				"Dietary fiber 9 g\t36%",
				"Sugar 6 g\t",
				"Protein 3.3 g\t6%",
				"Vitamin A\t0%\tVitamin C\t5%",
				"Calcium\t1%\tIron\t13%",
				"Vitamin D\t0%\tVitamin B-6\t5%",
				"Cobalamin\t0%\tMagnesium\t8%",
				"*Per cent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.",
				"People also search for",
				"View 15+"
			];
			var expected = 14;
			console.log(JSON.stringify(parseData.processArr(input)));
			expect(expected).toEqual(parseData.processArr(input).nutritionFact.dailyNutrition.length);
		});
	});
	describe("parseDailyNutrition", () => {
		it("should return correct data", () => {
			var input = "Total Fat 33 g\t50%";
			var expected = {
				name: 'Total Fat',
				vnName: 'Tong chat beo',
				value: '33 g',
				dailyValue: '50%'
			};
			expect(expected).toEqual(parseData.parseDailyNutrition(input));
		});
		it("should return correct data", () => {
			var input = "Totasd 33 g\t50%";
			var expected = undefined;
			expect(expected).toEqual(parseData.parseDailyNutrition(input));
		});
	});
	describe("parseDailyVitamin", () => {
		it("should return correct data", () => {
			var input = "Vitamin A\t0%\tVitamin C\t5%";
			var expected = [
				{name: 'Vitamin A', vnName: 'Vitamin A', dailyValue: '0%'},
				{name: 'Vitamin C', vnName: 'Vitamin C', dailyValue: '5%'}
			];
			expect(expected).toEqual(parseData.parseDailyVitamin(input));
		});
	});
});