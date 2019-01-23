const image = require("../lib/image");
const dir = require("../lib/dir");

function main() {
	dir.make("cropped");
	image.downloadAll("img");
}

main();