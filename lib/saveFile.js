const fs = require('fs');

async function save(file, data) {
	fs.writeFile(file, data, 'utf8', function (err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log(file, 'It\'s saved!');
		}
	});
}
async function saveCSVFile(file, data) {
	let lineArray = [];
	data.forEach(function (infoArray, index) {
		let line = infoArray.join("\t");
		lineArray.push(line);
	});
	let csvContent = lineArray.join("\n");
	fs.writeFile(file, csvContent, 'utf8', function (err) {
		if (err) {
			console.log('Some error occured - file either not saved or corrupted file saved.');
		} else {
			console.log(file, 'It\'s saved!');
		}
	});
}

async function updateFile(file, data) {
	fs.readFile(file, 'utf8', function (err, currentData) {
		let result = currentData + "\n" + data;
		fs.writeFile(file, result, 'utf8', function (err) {
			if (err) {
				console.log('Some error occured - file either not saved or corrupted file saved.');
			} else {
				console.log(file, 'It\'s saved!');
			}
		});
	});
}


const revealed = {
	save: save,
	saveCSVFile: saveCSVFile,
	updateFile: updateFile
};

module.exports = revealed;