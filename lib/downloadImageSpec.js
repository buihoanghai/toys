const downloadImage = require("./downloadImage.js");
describe("downloadImage", () => {
	describe("getFileName", () => {
		it("should return correct data", () => {
			var input = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Banh_chung_vuong.jpg/1200px-Banh_chung_vuong.jpg";
			var expected = "banhchung1.jpg";
			expect(expected).toEqual(downloadImage.getFileName(input,"banhchung",1));
		});
	});

});