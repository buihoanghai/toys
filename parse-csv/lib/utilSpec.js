const util = require("./util");
describe("util", () => {
	// describe("sortArr", () => {
	// 	it("should return correct data", () => {
	// 		var input= ["category","gender"];
	// 		var expected=  ["gender","category"];
	// 		var order= ["gender","category"];
	// 		expect(expected).toEqual(util.sortArr(input,order));
	// 	});
	// });
	// describe("buildMetaTag", () => {
	// 	it("should return correct data", () => {
	// 		var input=  [[
	// 			"",
	// 			"",
	// 			"",
	// 			"[[brand]] [[series]] [[category]]",
	// 			"plp.sports-outdoor.default_brand_category_series_heading"
	// 		]];
	// 		var expected=  [[
	// 			"please-not-change",
	// 			"please-not-change",
	// 			"please-not-change",
	// 			"[[brand]] [[series]] [[category]]",
	// 			"plp.sports-outdoor.default_brand_series_category_heading",
	// 		]];
	// 		expect(expected).toEqual(util.buildMetaTag(input));
	// 	});
	// });
	// describe("buildCol", () => {
	// 	it("should return correct data", () => {
	// 		var input=  "plp.sports-outdoor.default_discount_brand_series_model_meta";
	// 		var expected=  [
	// 			"sports-outdoor",
	// 			"discount_brand_series_model",
	// 			"meta"
	// 		];
	// 		expect(expected).toEqual(util.buildCol(input));
	// 	});
	// });
    describe("headingReplaceH1", () => {
        it("should return correct data", () => {
            var input = [
            	["","","","[[heading]]","plp.electronics.default_category_h1"],
                ["","","","[[month]] [[year]] [[category]] Price [[country]] | iPrice HK","plp.electronics.default_category_heading"]
			];
            var expected = [
            	["","","","[[month]] [[year]] [[category]] Price [[country]] | iPrice HK","plp.electronics.default_category_h1"],
                ["","","","[[month]] [[year]] [[category]] Price [[country]] | iPrice HK","plp.electronics.default_category_heading"]
			];
            expect(expected).toEqual(util.headingReplaceH1(input));
        });
        it("should return correct data", () => {
            var input = [
                ["","","","[[heading]] Online","plp.electronics.default_category_h1"],
                ["","","","[[month]] [[year]] [[category]] Price [[country]] | iPrice HK","plp.electronics.default_category_heading"]
            ];
            var expected = [
                ["","","","[[month]] [[year]] [[category]] Price [[country]] | iPrice HK Online","plp.electronics.default_category_h1"],
                ["","","","[[month]] [[year]] [[category]] Price [[country]] | iPrice HK","plp.electronics.default_category_heading"]
            ];
            expect(expected).toEqual(util.headingReplaceH1(input));
        });
        it("should return correct data", () => {
            var input = [
                ["","","","Online [[heading]]","plp.electronics.default_category_h1"],
                ["","","","[[month]] [[year]] [[category]] Price [[country]] | iPrice HK","plp.electronics.default_category_heading"]
            ];
            var expected = [
                ["","","","Online [[month]] [[year]] [[category]] Price [[country]] | iPrice HK","plp.electronics.default_category_h1"],
                ["","","","[[month]] [[year]] [[category]] Price [[country]] | iPrice HK","plp.electronics.default_category_heading"]
            ];
            expect(expected).toEqual(util.headingReplaceH1(input));
        });
    });
});