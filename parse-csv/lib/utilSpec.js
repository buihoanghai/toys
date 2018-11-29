const util = require('./util');

describe("util", function() {

    //demonstrates use of expected exceptions
    describe("#calPoint", function() {
        it("should throw an exception if song is already playing", function() {
            let input = ["category", "series"];
            let orders = ["brand", "series", "model", "category", "gender", "color"];
            let expected = [{"text": "category", "point": 4}, {"text": "series", "point": 2}];
            expect(expected).toEqual(util.calPoint(input, orders));
        });
    });

    describe("#sortArr", function() {
        it("should throw an exception if song is already playing", function() {
            let input = ["category", "series"];
            let orders = ["brand", "series", "model", "category", "gender", "color"];
            let expected = ["series", "category"];
            expect(expected).toEqual(util.sortArr(input, orders));
        });
    });

    describe("#buildData", function() {
        it("should throw an exception if song is already playing", function() {
            let input = "plp.electronics.default_brand_gender_category_title";
            let expected = [
                "electronics",
                "brand_gender_category",
                "title"
            ];
            expect(expected).toEqual(util.buildData(input));
        });
    });

    describe("#buildMetaTags", function() {
        it("should throw an exception if song is already playing", function() {
            let input = [["","","", "xxx", "plp.electronics.default_brand_gender_category_title"]];
            let expected = [[
                "electronics",
                "brand_category_gender",
                "title",
                "xxx",
                "plp.electronics.default_brand_category_gender_title"

            ]]
            expect(expected).toEqual(util.buildMetaTags(input));
        });
    });
});
