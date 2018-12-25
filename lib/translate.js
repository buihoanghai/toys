// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'YOUR_PROJECT_ID';

// Instantiates a client
const translate = new Translate({
	projectId: projectId,
});

function go(text) {

	return translate.translate(text,"vi").then(res => {
		return res[0];
	}).catch(err => {
		console.error(err);
	});
}

const revealed = {
	go: go
};

module.exports = revealed;