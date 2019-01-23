const fs = require('fs');
async function save(file, data) {
	fs.writeFile(file,data, 'utf8', function(err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log(file, 'It\'s saved!');
		}
	});
}


const revealed = {
	save: save
};

module.exports = revealed;