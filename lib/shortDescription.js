var fs = require('fs'),
	_ = require('lodash');
const config = require('../config/config');
const phone = "LH: "+ config.phone;

function generateShortDescription(product, index) {
	let template = [
		`Giá ${product} hôm nay, ${phone} để cập nhật giá cả ${product}. Mua ${product} bổ sung vào chế độ ăn hằng ngày nhằm cung cấp đầy đủ dinh dưỡng cho cả nhà.`,
		`${product} bao nhiêu 1 kg, ${phone} mua sp giá rẻ ở sài gòn, sp nhà vườn chính hiệu, không dùng hóa chất, rất an toàn cho người sử dụng.`,
		`Mua ${product} ở tphcm, ${phone} để có được giá tốt nhất của ${product}, ${product} uôn có nhiều dinh dưỡng, hãy bổ sung ${product} vào khẩu phần ăn của gia đình ngay.`,
		`Bán ${product} ở tphcm, ${phone} để cập nhật giá cả ${product}, ${product} luôn tươi mới nhất có thể, ngày nay nhu cầu bổ sung vitamin của con người tăng cao nên trái cây rất được ưa chuộng.`,
		`${product} giá rẻ hcm, ${phone} để nhận báo giá. Giá rẻ bởi vì bạn đang "mua ${product}" trực tiếp từ người nông dân không thông qua đại lý phân phối nào.`,
		`Mua ${product} ở đâu rẻ, ${phone}, nguồn hàng trực tiếp từ người nông dân nên bảo đảm ${product} tươi, xanh, sạch khi nào đặt mới thu hoạch.`,
		`Cần mua ${product} ở sài gòn ${phone} để biết bảng báo giá ${product}, đến với ifarmer.vn các bạn có thể lựa chọn cho mình loại ${product} phù hợp nhu cầu.`,
		`Giá ${product} tết 2019 ${phone}, tết năm nay giá cả các mặt hàng nông sản như thế nào, xin mời vào ifarmer.vn để cập nhật hộ mình nha các bạn.`,
		`Giá ${product} tết Kỷ Hợi ${phone} ngay. Niềm vui trọn vẹn với tết Kỷ Hợi an toàn với thực phẩm với giá cả phải chăng nhất. Hãy đặt ngay ${product} của ifarmer.vn là góp phần ủng hộ nông dân Việt Nam.`,
		`Cần bán ${product} ${phone} ngay. Nếu ${product} của bạn thỏa các tiêu chí tươi, xanh, sạch và điều quan trọng nhất là trực tiếp tạo ra ${product}. Xin liên lạc ngay để trở thành nhà cung cấp ${product} của ifarmer.vn.`,
	];
	return template[index];
}

function generateForVariants(variants, name,product) {
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
	if(nutrition.dailyValue){
		return `Với 100g ${product} đã đủ cung cấp ${nutrition.dailyValue} nhu cầu ${nutrition.vnName} của cơ thể trong một ngày`;
	}
	if(nutrition.value){
		return `Với 100g ${product} cung cấp ${nutrition.value} nhu cầu ${nutrition.vnName} của cơ thể`;
	}
}

const revealed = {
	generateShortDescription: generateShortDescription,
	generateForVariants: generateForVariants
};

module.exports = revealed;