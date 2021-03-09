var moonData = {
	Percent:  '13.5',
	Type:     '<a href="/astronomy/moon/waning-crescent.html" title="Waning Crescent on the night between 9 March and 10 March">Waning Crescent</a>',
	Image:    'https://www.timeanddate.com/scripts/moon.php?i=0.135&p=2.272&r=5.472',
	Location: '11609021'
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