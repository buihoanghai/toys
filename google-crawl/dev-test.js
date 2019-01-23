const ifarmer= require("../lib/model/Ifarmer");
function main() {
	ifarmer.pushDevToTest().then(()=>{
		process.exit();
  });
}
main();