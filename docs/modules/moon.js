var moonData = {
	Percent:  '19.6',
	Type:     '<a href="/astronomy/moon/waning-crescent.html" title="Waning Crescent on the night between 8 March and 9 March">Waning Crescent</a>',
	Image:    'https://www.timeanddate.com/scripts/moon.php?i=0.196&p=3.633&r=0.513',
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