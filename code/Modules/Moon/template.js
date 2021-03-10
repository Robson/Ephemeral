modules.push(function moon() {
	var moonData = {
		Percent:  '{{PERCENT}}',
		Type:     '{{TYPE}}',
		Image:    '{{URL}}',
		Location: '{{LOCATION}}'
	}

	var box = makeBox(1, 1);
	box
		.append('div')
		.attr('class', 'title')
		.html('&#127769;<a href="https://www.timeanddate.com/moon/@' + moonData.Location + '">Moon</a>')
	box = box
		.append('div')
		.attr('class', 'inside');	
	var inside = box
		.append('div');
	inside
		.append('img')
		.attr('src', moonData.Image)
		.attr('width', '75%')
		.attr('height', '75%');		
	inside
		.append('p')
		.html(moonData.Type + ' (' + moonData.Percent + '%)');	
});