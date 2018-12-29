
const translate = require("./");

describe("test translate API", () => {
    it("should return correct data", () => {
        let input = 'good';
        let expected = 'tốt';

        // response
        /**
         * let resultObject = {
            text: '',
            metrics: {
                text: {
                    value: '',
                    autoCorrected: false,
                    didYouMean: false
                }
            }
        };
         */
        translate(input)
            .then(resp => {
                expect(expected).toEqual(resp.text);
                expect('').toEqual(resp.metrics.text.value);
                expect(false).toEqual(resp.metrics.text.autoCorrected);
                expect(false).toEqual(resp.metrics.text.didYouMean);
            }).catch(console.error);
    });

    it("should return incorrect data - didYouMean", () => {
        let input = 'guidl';
        let expected = 'hướng dẫn';
        translate(input)
            .then(resp => {
                const didYouMean = 'guild';
                expect(expected).toEqual(resp.text);
                expect(didYouMean).toEqual(resp.metrics.text.value);
                expect(true).toEqual(resp.metrics.text.didYouMean);
            }).catch(console.error);
    });
});
