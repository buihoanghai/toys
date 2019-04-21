const html = require("./html.js");
describe("html", () => {
	describe("parseHTML", () => {
		it("should return correct data", () => {
			var input = "{/abc1}{abc}Một vài hình ảnh[sửa | sửa mã nguồn]{/abc}{abc}Xem thêm[sửa | sửa mã nguồn]{/abc}{abc}Chú thích[sửa | sửa mã nguồn]{/abc}{abc}Tài liệu[sửa | sửa mã nguồn]{/abc}{abc}Liên kết ngoài[sửa | sửa mã nguồn]{/abc}\n";
			var expected = "</p><h3>Một vài hình ảnh</h3><h3>Xem thêm</h3><h3>Chú thích</h3><h3>Tài liệu</h3><h3>Liên kết ngoài</h3>\n";
			expect(expected).toEqual(html.parseHTML(input));
		});
	});

});