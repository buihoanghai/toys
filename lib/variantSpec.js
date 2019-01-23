const variant = require("./variant.js"),
	_ = require('lodash');
describe("variant", () => {
	// describe("createVariant", () => {
	// 	it("should return correct data", () => {
	// 		var input = ["banh-chung","loai|dac-biet||so-luong|1-cai"];
	// 		var expected = {
	// 			"banh-chung-loai-dac-biet-so-luong-1-cai": {
	// 				extraTittle: 'Loại Đặc Biệt Số lượng 1 Cái',
	// 				product: 'banh-chung',
	// 				variantTypes:
	// 					{
	// 						"loai":
	// 							"dac-biet",
	// 						"so-luong":
	// 							"1-cai"
	// 					}
	// 			}
	// 		};
	// 		expect(expected).toEqual(variant.createVariant.apply(this, input));
	// 	});
	//
	// });
	// describe("getURLVariant", () => {
	// 	it("should return correct data", () => {
	// 		var input = ["banh-chung", "loai|dac-biet||so-luong|1-cai"];
	// 		var expected = "banh-chung-loai-dac-biet-so-luong-1-cai";
	// 		expect(expected).toEqual(variant.getURLVariant.apply(this, input));
	// 	});
	// });
	// describe("getExtraTittle", () => {
	// 	it("should return correct data", () => {
	// 		var input = ["loai|dac-biet"];
	// 		var expected = "Loại Đặc Biệt";
	// 		expect(expected).toEqual(variant.getExtraTittle.apply(this, input));
	// 	});
	// });
	describe("create", () => {
		it("should return correct data", () => {
			var input = ["banh-chung", "so-luong|1-cai|1-cap|2-cap||loai|dac-biet|truyen-thong"];
			var expected = 6;
			expect(expected).toEqual(_.size(variant.create.apply(this, input)));
		});
	});
	describe("generateShortDescription", () => {
		it("should return correct data", () => {
			var input = "Bánh Chưng";
			var expected = "";
			expect(expected).toEqual(_.size(variant.gererateShortDescription.apply(this, input)));
		});
	});
});