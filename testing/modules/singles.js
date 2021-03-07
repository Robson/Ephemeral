var when = "05 March 2021 -  11 March 2021"

var singlesData = {
	1: { Artist: "<a href='https://www.officialcharts.com/artist/56921/olivia-rodrigo/'>olivia rodrigo</a>", Title: "<a href='https://www.officialcharts.com/search/singles/drivers-license/'>DRIVERS LICENSE</a>", Image: "https://d35iaml2i6ojwd.cloudfront.net/img/small?url=https://m.media-amazon.com/images/I/51nA4UxF15L._SL75_.jpg" },
2: { Artist: "<a href='https://www.officialcharts.com/artist/59389/nathan-evans-220kid-billen-ted/'>nathan evans/220kid/billen ted</a>", Title: "<a href='https://www.officialcharts.com/search/singles/wellerman/'>WELLERMAN</a>", Image: "https://d35iaml2i6ojwd.cloudfront.net/img/small?url=/images/artwork/5e05921d680fbd302e0a9a22fb335eea.jpg" },
3: { Artist: "<a href='https://www.officialcharts.com/artist/59540/lil-tjay-and-6lack/'>lil tjay &amp; 6lack</a>", Title: "<a href='https://www.officialcharts.com/search/singles/calling-my-phone/'>CALLING MY PHONE</a>", Image: "https://d35iaml2i6ojwd.cloudfront.net/img/small?url=https://m.media-amazon.com/images/I/41UxdcuQWaL._SL75_.jpg" },
4: { Artist: "<a href='https://www.officialcharts.com/artist/14412/tiesto/'>tiesto</a>", Title: "<a href='https://www.officialcharts.com/search/singles/the-business/'>THE BUSINESS</a>", Image: "https://d35iaml2i6ojwd.cloudfront.net/img/small?url=/images/artwork/893aaa8099c44c2ed2cbdb6abaff679c.jpg" },
5: { Artist: "<a href='https://www.officialcharts.com/artist/59350/riton-nightcrawlers-mufasa/'>riton/nightcrawlers/mufasa</a>", Title: "<a href='https://www.officialcharts.com/search/singles/friday/'>FRIDAY</a>", Image: "https://d35iaml2i6ojwd.cloudfront.net/img/small?url=https://m.media-amazon.com/images/I/61eBeFUdkgL._SL75_.jpg" },

};

function singles() {
	var box = makeBox(2, 2);
	box
		.append('div')
		.attr('class', 'title')
		.append('a')
		.attr('href', 'https://www.officialcharts.com/charts/singles-chart/')
		.html('&#x1F3B5;UK Singles Chart')
	box = box
		.append('div')
		.attr('class', 'inside');
	var inside = box
		.append('div');
	inside
		.append('p')
		.html(when + '<br/>&nbsp;');
	var table = inside
		.append('table');
	var position = 0;
	for (var item of Object.keys(singlesData)) {
		var row = table
			.append('tr');
		row
			.append('td')
			.html(++position);
		row
			.append('td')
			.append('img')
			.attr('src', singlesData[item].Image);
		row = row
			.append('td')
			.style('text-align', 'left')
		row
			.append('a')
			.attr('href', 'https://google.com/search?q=' + singlesData[item].Title + ' - ' + singlesData[item].Artist)
			.html(singlesData[item].Title)
		row
			.append('span')
			.html('<br/>' + singlesData[item].Artist);
	}
}

modules.push(singles)