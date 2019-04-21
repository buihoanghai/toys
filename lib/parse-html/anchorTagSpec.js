const anchorTag = require("./anchorTag");
describe("anchorTag", () => {
	describe("getUrls", () => {
		it("should return correct data", () => {
			var input = `<div class="menu">
  <a class="menu-option" href="https://jasmine.github.io/pages/getting_started.html">Get Started</a>
  <a class="menu-option" href="https://jasmine.github.io/pages/docs_home.html"> Docs</a>
  <a class="menu-option" href="https://jasmine.github.io/pages/support.html"> Support</a>
  <a class="menu-option" href="https://github.com/jasmine/jasmine/releases"> Releases</a>
  <a class="menu-option" href="https://github.com/jasmine/jasmine"> Github</a>
</div>`;
			let result = anchorTag.getUrls(input);

			expect(5).toEqual(result.length);
			expect("https://jasmine.github.io/pages/getting_started.html").toEqual(result[0]);

		});
	});

});