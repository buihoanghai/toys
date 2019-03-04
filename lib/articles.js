const _ = require('lodash');
const keywordGen = require("../lib/keyword");
let revealed = (() => {
		const config = require('../config/config');

		function createArticle(arr) {
			console.log(arr.length);
			arr = cleanArr(arr);
			console.log(arr.length);
			let h1 = removeNumber(arr[0]);
			let shortDescription = arr[1];
			arr = arr.slice(2, arr.length);
			let body = createBody(arr);
			// console.log("h1", h1);
			// console.log("shortDescription", shortDescription);
			console.log("body", body);
			h1 = capitalizeFirstLetter(h1.trim());
			let id = keywordGen.create(h1).toLowerCase();
			return {id, h1, shortDescription, body, title: h1, ten: h1, author: "Ông Tư Tóc Bạc", hide: true};
		}

		function capitalizeFirstLetter(string) {
			return string.toLowerCase()
				.split(' ')
				.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
				.join(' ');
		}


		function createBody(arr) {
			let result = [];
			_.each(arr, item => {
				item = item.trim();
				let text;
				if (isHeading(item)) {
					text = `<h2>${item}</h2>`;
				} else {
					text = `<p>${item}</p>`;
				}
				result.push(text);
			});
			return result.join(" ");
		}

		function isHeading(str) {
			return !!str.match(/[A-Z]-/g);
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