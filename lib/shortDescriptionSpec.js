const shortDescription = require("./shortDescription.js"),
	_ = require('lodash');
describe("variant", () => {
	describe("generateShortDescription", () => {
		it("should return correct data", () => {
			var input = "Bánh Chưng";
			var expected = "";
			expect(expected).toEqual(_.size(shortDescription.generateShortDescription.apply(this, input)));
		});
	});
});