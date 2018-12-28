const fs = require('fs');
const DEFAULT = "google";

function make(path) {
	path = DEFAULT + "/" + path;
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
}

const revealed = {
	make: make,
};

module.exports = revealed;