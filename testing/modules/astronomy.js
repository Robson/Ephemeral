var imageData = {
	Title:  ' Pillars of the Eagle Nebula in Infrared ',
	Source: 'https://apod.nasa.gov/apod/image/2103/M16Ir_HubbleRomero_960.jpg'
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
		.append('img')
		.style('width', 'auto')
		.style('height', 'auto')
		.style('max-width', '400px')
		.style('max-height', '320px')
		.attr('src', imageData.Source);
	inside
		.append('p')
		.html('&nbsp;<br/>' + imageData.Title);
}

modules.push(word);