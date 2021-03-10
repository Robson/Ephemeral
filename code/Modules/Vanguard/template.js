modules.push(function vanguard() {

	var vanguardDates = {
		"Latest":      "{{DATE_LATEST}}",
		"vs Previous": "{{DATE_PREVIOUS}}",
		"vs Week":     "{{DATE_WEEK}}",
		"vs Month":    "{{DATE_MONTH}}",
		"vs Year":     "{{DATE_YEAR}}"
	}

	var vanguardValues = {
		"Latest":      "{{VALUE_LATEST}}",
		'vs Previous': "{{VALUE_PREVIOUS}}",
		'vs Week':     "{{VALUE_WEEK}}",
		'vs Month':    "{{VALUE_MONTH}}",
		'vs Year':     "{{VALUE_YEAR}}"
	};

	var box = makeBox(1, 1);
	box
		.append('div')
		.attr('class', 'title')
		.html('&#128200;<a href="https://www.vanguardinvestor.co.uk">Vanguard</a>')
	box = box
		.append('div')
		.attr('class', 'inside');		
	var inside = box
		.append('div');
	inside
		.append('p')
		.append('a')
		.attr('href', 'https://www.vanguardinvestor.co.uk/investments/vanguard-ftse-global-all-cap-index-fund-gbp-acc')
		.html('FTSE Global All Cap<br/>Index Fund - Accumulation');
	inside
		.append('p')
		.html('&nbsp;');
	var table = inside
		.append('table');	
	
	for (var item of Object.keys(vanguardValues)) {
		var row = table
			.append('tr')
			.attr('title', vanguardDates[item])
			.style('font-weight', item.startsWith("Latest") ? "bold" : "normal");
		row
			.append('td')
			.style('text-align', 'left')
			.html(item + ':&nbsp;');
		row
			.append('td')
			.style('text-align', 'right')
			.attr('class', 'code')
			.html(vanguardValues[item]);
	}
});