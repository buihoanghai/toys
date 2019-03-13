const fs = require('fs');
const _ = require('lodash');
fs.readFile("links.txt", 'utf8', function (err, data) {
	let items= data.split('\n');
	var results= [];
	_.each(items, item =>{
		if(!item)
			return;
		let country = item.split('\t')[0];
		let url = item.split('\t')[1];

		switch (country){
			case "MY": 		results.push("https://iprice.my"+url+"/"); break;
			case "TH": 		results.push("https://ipricethailand.com"+url+"/"); break;
			case "VN": 		results.push("https://iprice.vn"+url+"/"); break;
			case "ID": 		results.push("https://iprice.co.id"+url+"/"); break;
			case "SG": 		results.push("https://iprice.sg"+url+"/"); break;
			case "PH": 		results.push("https://iprice.ph"+url+"/"); break;
			case "HK": 		results.push("https://iprice.hk"+url+"/"); break;
			break;
		}
	});
	console.log(results.length);
	fs.writeFile("result.txt",results.join('\n'), 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log('It\'s saved!');
		}
	});
});
