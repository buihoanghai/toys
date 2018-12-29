
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

    it("should return long phrases", () => {
        let input = `Crabs are generally covered with a thick exoskeleton, composed primarily of highly mineralized chitin,[4][5] and armed with a single pair of chelae (claws). Crabs are found in all of the world's oceans, while many crabs live in fresh water and on land, particularly in tropical regions. Crabs vary in size from the pea crab, a few millimetres wide, to the Japanese spider crab, with a leg span of up to 4 metres (13 ft).[6] About 850 species of crab are freshwater, terrestrial or semi-terrestrial species;[7] they are found throughout the world's tropical and semi-tropical regions. They were previously thought to be a monophyletic group, but are now believed to represent at least two distinct lineages, one in the Old World and one in the New World.[8] The earliest unambiguous crab fossils date from the Jurassic,[9] although Carboniferous Imocaris, known only from its carapace, may be a primitive crab.[10] The radiation of crabs in the Cretaceous and afterward may be linked either to the break-up of Gondwana or to the concurrent radiation of bony fish, crabs' main predators`;
        let expected = `Cua thường được bao phủ bởi một lớp vỏ dày, bao gồm chủ yếu là chitin khoáng hóa cao, [4] [5] và được trang bị một cặp chelae (móng vuốt). Cua được tìm thấy ở tất cả các đại dương trên thế giới, trong khi nhiều loài cua sống ở nước ngọt và trên đất liền, đặc biệt là ở các vùng nhiệt đới. Cua có kích thước khác nhau từ cua đậu, rộng vài mm, đến cua nhện Nhật Bản, với sải chân dài tới 4 mét (13 ft). [6] Khoảng 850 loài cua là các loài nước ngọt, trên cạn hoặc bán trên cạn; [7] chúng được tìm thấy trên khắp các vùng nhiệt đới và bán nhiệt đới trên thế giới. Trước đây họ được cho là một nhóm độc quyền, nhưng bây giờ được cho là đại diện cho ít nhất hai dòng dõi riêng biệt, một ở Thế giới cũ và một ở Thế giới mới. [8] Hóa thạch cua không rõ ràng sớm nhất có niên đại từ kỷ Jura, [9] mặc dù Carboniferous Imocaris, chỉ được biết đến từ thân của nó, có thể là một loài cua nguyên thủy. [10] Bức xạ của cua trong kỷ Phấn trắng và sau đó có thể được liên kết với sự phá vỡ của Gondwana hoặc với bức xạ đồng thời của cá xương, động vật ăn thịt chính của cua`;
        translate(input)
            .then(resp => {
                expect(expected).toEqual(resp.text);
            }).catch(console.error);
    });
});
