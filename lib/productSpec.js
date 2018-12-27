const product = require("./product.js"),
	data = require('../google/cay+dua');
describe("product", () => {
	describe("create", () => {
		it("should return correct data", () => {
			var input = [data];
			var expected = 6;

			expect(expected).toEqual(product.create.apply(this, input));
		});
	});
});