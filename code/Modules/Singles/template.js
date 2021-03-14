modules.push(function singles() {
	var when = "{{WHEN}}"
	var singlesData = {
		{{DATA}}
	};

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
		var title = singlesData[item].Title.match(/>([^<]+)</)[1].replace(/'/g, '');
		var artist = singlesData[item].Artist.match(/>([^<]+)</)[1].replace(/'/g, '');
		var row = table
			.append('tr');
		row
			.append('td')
			.html(++position);
		row
			.append('td')
			.append('a')
			.attr('href', 'https://www.youtube.com/results?search_query=' + artist + ' - ' + title)
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
});