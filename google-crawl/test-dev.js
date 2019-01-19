const ifarmer= require("../lib/model/Ifarmer");
function main() {
	ifarmer.pushTestToDev().then(()=>{
		process.exit();
  });
}
main();