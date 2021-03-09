var natureData = {
	Source: 'https://cdn2.outdoorphotographer.com/2021/03/Winter-Grooves-By-Peter-Ensrud.jpg'
}

function nature() {
	if (natureData.Source.length > 0) {
		var box = makeBox(2, 2);
		box
			.append('div')
			.attr('class', 'title')
			.html('&#x26FA;<a href="https://www.outdoorphotographer.com/blog/category/photo-of-the-day/">Outdoor Photo of the Day</a>')
		box = box
			.append('div')
			.attr('class', 'inside');
		var inside = box
			.append('div');
		inside
			.append('p')
			.append('a')
			.attr('href', natureData.Source)
			.append('img')
			.style('width', 'auto')
			.style('height', 'auto')
			.style('max-width', '400px')
			.style('max-height', '320px')
			.attr('src', natureData.Source);
	}
}

modules.push(nature);