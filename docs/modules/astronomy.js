var imageData = {
	Title:     ' Perseverance 360: Unusual Rocks and the Search for Life on Mars ',
	Source:    'https://apod.nasa.gov/apod/',
	LinkImage: 'https://apod.nasa.gov/apod/',
	LinkPage:  'https://apod.nasa.gov/apod/ap210309.html'
}

function word() {
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

modules.push(word);