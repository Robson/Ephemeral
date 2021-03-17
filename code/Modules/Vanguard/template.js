modules.push(function vanguard() {

	var data = "{{DATA}}";

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

	var box = makeBox(3, 1);
	box
		.append('div')
		.attr('class', 'title')
		.html('&#128200;<a href="https://www.vanguardinvestor.co.uk">Vanguard</a>')
	box = box
		.append('div')
		.attr('class', 'inside');		
	var insideLeft = box
		.append('div')
		.style('display', 'inline')
		.style('position', 'absolute')
		.style('left', 0)
		.style('width', '37%');
	insideLeft
		.append('p')
		.append('a')
		.attr('href', 'https://www.vanguardinvestor.co.uk/investments/vanguard-ftse-global-all-cap-index-fund-gbp-acc')
		.html('FTSE Global All Cap<br/>Index Fund - Acc');
	insideLeft
		.append('p')
		.html('&nbsp;');
	var table = insideLeft
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

	var insideRight = box
		.append('div')
		.style('display', 'inline')
		.style('position', 'absolute')
		.style('right', 0)
		.style('width', '66%');
	var chart = createLineChart(400, 150, insideRight, data, 1);
});