const url = require("./url");
describe("url", () => {
	describe("getUrls", () => {
		it("should return correct data", () => {
			var input = `<div class="menu">
  <a class="menu-option" href="https://jasmine.github.io/pages/getting_started.html">Get Started</a>
  <a class="menu-option" href="https://jasmine.github.io/pages/docs_home.html"> Docs</a>
  <a class="menu-option" href="https://jasmine.github.io/pages/support.html"> Support</a>
  <a class="menu-option" href="https://github.com/jasmine/jasmine/releases"> Releases</a>
  <a class="menu-option" href="https://github.com/jasmine/jasmine"> Github</a>
</div>`;
			let result = url.getUrls(input);
			// console.log(result);
			expect("https://jasmine.github.io/pages/getting_started.html").toEqual(result[0]);
			expect(5).toEqual(result.length);

		});
	});

});