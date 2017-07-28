describe("the nav bar", function(){
	var request = element(by.linkText('Make A Request'));
	var list = element(by.linkText('Karaoke Waiting List'));

	it("should go to the request page from the list display page", function(){
		browser.get("http://localhost:3000/");
		request.click(function(){
			browser.wait(function(){
				return element(by.id('requestform')).isPresent();
			}, 2000, 'routing time out');
		});
		expect(element(by.id('requestform')).isPresent()).toBe(true);
	});

	it("should go to the list display page from the request page", function(){
		browser.get("http://localhost:3000/#!/request");
		list.click(function(){
			browser.wait(function(){
				return element(by.id('singerlist')).isPresent();
			}, 2000, 'routing time out');
		});
		expect(element(by.id('singerlist')).isPresent()).toBe(true);
	});
});

describe("the list display page", function(){
	var singerlist = element.all(by.repeater('x in display'));
	var hiddenSongLists = element.all(by.css('.songlist.ng-hide'));

	beforeEach(function(){
		browser.get("http://localhost:3000/");
	});

	it("should display the list of five singers in the demo file", function(){
		expect(singerlist.count()).toEqual(5)
	});

	it("should have a hidden songlist for each singer", function(){
		expect(element.all(by.css('.songlist.ng-hide')).count()).toEqual(singerlist.count())
	});

	it("should un-hide each song list as each singer is clicked", function(){
		singerlist.each(function(element,index){
			element.click(function(){
				expect(hiddenSongLists.count()).toEqual(singerlist.count()-index);
			});
		});
	});

	it("should re-hide each song list as each singer is clicked again", function(){
		singerlist.each(function(element,index){
			element.click();
		}).then(function(){
			singerlist.each(function(element,index){
				element.click(function(){
					expect(hiddenSongLists.count()+index).toEqual(singerlist.count());
				});
			})
		});
	});
});

describe("requests page", function(){
	var name = element(by.id('name'));
	var song = element(by.id('song'));
	var submit = element(by.id('submitButton'));
	var thanks = element(by.id('thanks'));
	var sorry = element(by.id('sorry'));

	beforeEach(function(){
		browser.get("http://localhost:3000/#!/request");
	});

	it("should not initially display the thank you or fail message", function(){
		expect(thanks.isPresent()).toBe(false);
		expect(sorry.isPresent()).toBe(false);
	});

	it("should display the sorry message after a request is sent, (since the email client isn't set up in test environment)", function(){
		name.sendKeys("Steve");
		song.sendKeys("Polka Your Eyes Out")
		submit.click();
		expect(sorry.isPresent()).toBe(true);
		expect(thanks.isPresent()).toBe(false);
	});
});

