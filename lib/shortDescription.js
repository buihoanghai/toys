var fs = require('fs'),
    _ = require('lodash');
const config = require('../config/config');
const phone = "LH: " + config.phone;

function generateShortDescription(product, index) {
	// let template = [
	// 	``,
	// 	``,
	// 	``,
	// 	``,
	// 	``,
	// 	``,
	// ];

	let template = [
		`Mua ${product} ngày tết, ${phone}. ${product} nhà làm nhà dùng luôn nên chất lượng giá thành bảo đảm.`,
		`Giá ${product} tết Kỷ Hợi, ${phone} để biết ngay. ${product} luôn tươi mới khi nào đặt mới làm nên không sợ chất bảo quản hư hỏng.`,
		`Bán ${product} tại tphcm, ${phone} để đặt hàng. Tết Kỷ Hợi không thể thiếu ${product}. Một món ăn truyền thống của dân tộc Việt.`,
		`Giá ${product} tết 2019, ${phone} ngay để được báo giá tốt nhất. Do ${product} mua được phân phối trực tiếp từ người làm ra đến người tiêu dùng nên có được giá tốt nhất.`,
		`Giá mua ${product} hôm nay? ${phone} ngay để nhận báo giá. Tết Kỷ Hợi sắp đến, giá cả ${product} có đắt hơn hay rẻ hơn năm trước, tình hình thị trường biến động như thế nào.`,
		`Cần mua ${product} tại Sài Gòn, ${phone} ngay để được báo giá tốt nhất. ${product} nhà làm bảo đảm chất lượng, vệ sinh, an toàn thực phẩm, ngon, bổ mà lại rẻ nữa.`,
	];
    //  let template = [
    //  	`Giá ${product} hôm nay, ${phone} để cập nhật giá cả ${product}. Mua ${product} bổ sung vào chế độ ăn hằng ngày nhằm cung cấp đầy đủ dinh dưỡng cho cả nhà.`,
    // 	`${product} bao nhiêu 1 kg, ${phone} mua ${product} giá rẻ ở sài gòn, ${product} nhà vườn chính hiệu, không dùng hóa chất, rất an toàn cho người ăn.`,
    // 	`Mua ${product} ở tphcm, ${phone} để có được giá tốt nhất của ${product}, ${product} luôn có nhiều dinh dưỡng, hãy bổ sung ${product} vào khẩu phần ăn của gia đình ngay.`,
    // 	`Bán ${product} ở tphcm, ${phone} để cập nhật giá cả ${product}, ${product} luôn tươi mới nhất có thể, ngày nay nhu cầu bổ sung vitamin của con người tăng cao nên trái cây rất được ưa chuộng.`,
    // 	`${product} giá rẻ hcm, ${phone} để nhận báo giá. Giá rẻ bởi vì bạn đang "mua ${product}" trực tiếp từ người nông dân không thông qua đại lý phân phối nào.`,
    // 	`Mua ${product} ở đâu rẻ, ${phone}, nguồn hàng trực tiếp từ người nông dân nên bảo đảm ${product} tươi, xanh, sạch khi nào đặt mới thu hoạch.`,
    // 	`Cần mua ${product} ở sài gòn ${phone} để biết bảng báo giá ${product}, đến với ifarmer.vn các bạn có thể lựa chọn cho mình loại ${product} phù hợp nhu cầu.`,
    // 	`Giá ${product} tết 2019 ${phone}, tết năm nay giá cả các mặt hàng nông sản như thế nào, xin mời vào ifarmer.vn để cập nhật hộ mình nha các bạn.`,
    // 	`Giá ${product} tết Kỷ Hợi ${phone} ngay. Niềm vui trọn vẹn với tết Kỷ Hợi an toàn với thực phẩm với giá cả phải chăng nhất. Hãy đặt ngay ${product} của ifarmer.vn là góp phần ủng hộ nông dân Việt Nam.`,
    // 	`Cần bán ${product} ${phone} ngay. Nếu ${product} của bạn thỏa các tiêu chí tươi, xanh, sạch và điều quan trọng nhất là trực tiếp tạo ra ${product}. Xin liên lạc ngay để trở thành nhà cung cấp ${product} của ifarmer.vn.`,
    // ];
    /*
    let template = [
        `Giá ${product} Tết 2019 ở tphcm ${phone} để cập nhật giá. tết này mua bánh mứt gì đây? xin mời vào đây xem, chúng tôi có các loại mứt cho bạn lựa chọn.`,
        `${product} bao nhiêu 1kg ${phone} để biết bảng báo giá ${product}. mua ${product} ở đâu rẻ, Sài Gòn năm nay giá ${product} có tăng mạnh như năm trước không? ${product} hút hàng mạnh dịp cuối năm.`,
        `Mua ${product} Tết 2019 ở tphcm ${phone}, ${product} nhà làm bảo đảm chất lượng, vệ sinh, an toàn thực phẩm, ngon, bổ mà lại rẻ nữa.`,
        `Giá ${product} hôm nay ${phone} để nhận báo giá, Tết Kỷ Hợi sắp đến, giá cả ${product} có đắt hơn hay rẻ hơn năm trước, tình hình thị trường biến động như thế nào.`,
        `Bán ${product} nhà làm Tết 2019 ${phone} ngay, bạn nào có mặt hàng muốn bán tết có thể liên hệ với chúng tôi, để đưa hàng hóa lên web hoàn toàn miễn phí.`,
    ];
    let template = [
        `Giá ${product} hôm nay, ${phone}, Tết Kỷ Hợi đã đến nhà vườn đã sẵn sàng vận chuyển các loại cây cảnh lên sài gòn bán tết, có các cây độc lạ, quý hiếm mới xuất hiện trên thị trường`,
        `Mua ${product} tết kỷ hợi, ${phone}, Các nhà vườn gần đây lai tạo được nhiều loại cây chưng tết độc đáo: Trái bưởi, cam, phật thủ, quýt, quất... trên cùng 1 cây như mâm ngủ quả thất đặc sắc`,
        `Bán ${product} ở tphcm , ${phone}, chúng tôi mong muốn mang đến cho Quý Khách ${product} đẹp mắt, phù hợp thị hiếu của từng khách hàng`,
    ];







    let template = [
        `Giá ${product} hôm nay, ${phone}, Tết Kỷ Hợi sắp đến, các bạn đã mua ${product} để bổ sung vào quả mứt nhà mình chưa? ${product} cung cấp nhiều dưỡng chất cần thiết cho cơ thể`,
        `Mua ${product} ở tphcm, ${phone}, mỗi hạt có giá trị dinh dưỡng khác nhau, chống loãng xương, kháng viêm và đẩy lùi lão hóa, tốt cho làn da`,
        `${product} bao nhiêu 1 kg, ${phone}, mua ${product} ở sài gòn, các loại hạt mùa tết luôn là món ăn vặt khoái khẩu của mọi người, nhâm nhi ly trà, tán chuyện và ăn ${product} thì hết ý`,
        `Giá ${product} tết Kỷ Hợi ${phone} ngay. Niềm vui trọn vẹn với tết Kỷ Hợi an toàn với thực phẩm với giá cả phải chăng, ngoài ra kiểm soát được trọng lượng, ngăn ngừa được các bệnh béo phì rất hiệu quả.`,
        `Mua ${product} ở đâu rẻ, ${phone}, ngoài vị béo béo , bùi bùi các hạt  còn có giá trị dinh dưỡng cao và rất tốt cho sức khỏe người tiêu dùng`,
        `Cần mua ${product} ở sài gòn ${phone}, tết ăn hạt dưa, tán gẩu cũng thường, hiện nay có nhiều loại hạt ăn ngon, dinh dưỡng mà lại rất sang trọng`,
        `Giá ${product} tết 2019 ${phone}, tết năm nay giá cả các loại hạt ăn vặt ra sao, mua về ăn, làm quà biếu bạn bè, người thân đều được`,
    ];

    */

    return template[index];
}

function generateForVariants(variants, name, product) {
    _.each(variants, (variant, index) => {
        variant.shortDescription = generateShortDescription(name, index);
        if (product.nutritionFact && product.nutritionFact.dailyNutrition) {
            let randomIndex = getRandomIndex(product.nutritionFact.dailyNutrition);

            variant.shortDescription += " " + generateNutrition(name, product.nutritionFact.dailyNutrition[randomIndex])
        }
    });
}

function getRandomIndex(arr) {
    return generateRandomNumber(0, arr.length);
}

function generateRandomNumber(min, max) {
    let random_number = Math.random() * (max - min) + min;
    return Math.floor(random_number);
}

function generateNutrition(product, nutrition) {
    if (nutrition.dailyValue) {
        return `Với 100g ${product} đã đủ cung cấp ${nutrition.dailyValue} nhu cầu ${nutrition.vnName} của cơ thể trong một ngày`;
    }
    if (nutrition.value) {
        return `Với 100g ${product} cung cấp ${nutrition.value} nhu cầu ${nutrition.vnName} của cơ thể`;
    }
}

const revealed = {
    generateShortDescription: generateShortDescription,
    generateForVariants: generateForVariants
};

module.exports = revealed;