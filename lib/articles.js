const _ = require('lodash');
let revealed = (() => {
		const config = require('../config/config');

		function createArticle(arr) {
			console.log(arr.length);
			arr = cleanArr(arr);
			console.log(arr.length);
			let h1 = removeNumber(arr[0]);
			let body = "";

			console.log("h1", h1);
		}

		function cleanArr(arr) {
			let result = [];
			_.each(arr, item => {
				if (item) {
					let text = removeSpecialCharacters(item);
					if (text) {
						// console.log(text);
						result.push(text);
					}
				}
			});
			return result;
		}

		function removeNumber(str) {
			return str.replace(/[0-9]/g, '');
		}

		function removeSpecialCharacters(str) {
			return str.replace(/[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u, "");
		}

		return {
			createArticle: createArticle,
		};
	}
)();
module.exports = revealed;