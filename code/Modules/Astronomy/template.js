modules.push(function astronomy() {
	var imageData = {
		Source:    '{{SOURCE}}',
		Title:     '{{TITLE}}',
		LinkImage: '{{LINK_IMAGE}}',
		LinkPage:  '{{LINK_PAGE}}'
	}

	if (!imageData.Source.endsWith('/')) {
		var box = makeBox(2, 2);
		box
			.append('div')
			.attr('class', 'title')
			.html('&#x1F6F8;<a href="https://apod.nasa.gov/apod/astropix.html">Astronomy Picture of the Day</a>')
		box = box
			.append('div')
			.attr('class', 'inside');
		var inside = box
			.append('div');
		inside
			.append('p')
			.append('a')
			.attr('href', imageData.LinkImage)
			.append('img')
			.style('width', 'auto')
			.style('height', 'auto')
			.style('max-width', '400px')
			.style('max-height', '320px')
			.attr('src', imageData.Source);
		inside
			.append('p')
			.html('&nbsp;');
		inside
			.append('p')
			.append('a')
			.attr('href', imageData.LinkPage)
			.html(imageData.Title);
	}
});