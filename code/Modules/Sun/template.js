modules.push(function sun() {
	var sunData = {
		Rise:     '{{RISE}}',
		Set:      '{{SET}}',
		Location: '{{LOCATION}}'
	};

	var box = makeBox(1, 1);	
	box
		.append('div')
		.attr('class', 'title')
		.html('&#128262;<a href="https://www.timeanddate.com/sun/@' + sunData.Location + '">Sun</a>')
	box = box
		.append('div')
		.attr('class', 'inside');
	var inside = box
		.append('div');	
	var table = inside
		.append('table')
		.style('width', '150px');
	var row = table
		.append('tr')
		.style('font-size', '300%');
	row
		.append('td')
		.html('&#127748;')
	row
		.append('td')
		.html('&#127751;')
	var row = table
		.append('tr');
	row
		.append('td')
		.html('Rise')
	row
		.append('td')
		.html('Set')
var row = table
		.append('tr');
	row
		.append('td')
		.html(sunData.Rise)
	row
		.append('td')
		.html(sunData.Set)
});