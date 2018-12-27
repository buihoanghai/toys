const downloadImage = require("./html.js");
describe("html", () => {
	describe("getFileName", () => {
		it("should return correct data", () => {
			var input = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Banh_chung_vuong.jpg/1200px-Banh_chung_vuong.jpg";
			var expected = "banhchung1.jpg";
			expect(expected).toEqual(html.getFileName(input,"banhchung",1));
		});
	});

});