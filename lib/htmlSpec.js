const downloadImage = require("./html.js");
describe("html", () => {
	describe("parseHTML", () => {
		it("should return correct data", () => {
			var input = "{/abc1}{abc}Một vài hình ảnh[sửa | sửa mã nguồn]{/abc}{abc}Xem thêm[sửa | sửa mã nguồn]{/abc}{abc}Chú thích[sửa | sửa mã nguồn]{/abc}{abc}Tài liệu[sửa | sửa mã nguồn]{/abc}{abc}Liên kết ngoài[sửa | sửa mã nguồn]{/abc}\n";
			var expected = "1";
			expect(expected).toEqual(html.parseHTML(input));
		});
	});

});