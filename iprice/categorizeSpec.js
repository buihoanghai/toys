const categorize = require("./categorize");
const csv = require("../lib/csv");
const pageTypeFile = "./iprice/condition/20190409 Page Type.csv";

describe("categorize", () => {
	describe("getTypePage", () => {
		it("should return correct data", () => {
			csv.getArrDataLowerCaseFromCSV(pageTypeFile).then(pageTypes=>{
				var url = "https://www.price.com.hk/ec-product-detail.php?ecpid=71834";
				var expected = "pdp";
				expect(expected).toEqual(categorize.getTypePage(url, pageTypes));
			});
		});
	});
});