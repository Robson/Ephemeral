var moonData = {
	Percent:  '{{PERCENT}}',
	Type:     '{{TYPE}}',
	Image:    '{{URL}}',
	Location: '{{LOCATION}}'
}

function moon() {
	var box = makeBox(1, 1);
	box
		.append('div')
		.attr('class', 'title')
		.html('&#127769;<a href="https://www.timeanddate.com/moon/@' + sunData.Location + '">Moon</a>')
	box = box
		.append('div')
		.attr('class', 'inside');	
	var inside = box
		.append('div');
	inside
		.append('img')
		.attr('src', moonData.Image)
		.attr('width', '50%')
		.attr('height', '50%');		
	inside
		.append('p')
		.html(moonData.Type + ' (' + moonData.Percent + '%)');	
}

modules.push(moon);