const arts = require('./result/articles');
const articles = require('../lib/model/Articles');

function run(){
	articles.saveArticles(arts);
}
run();