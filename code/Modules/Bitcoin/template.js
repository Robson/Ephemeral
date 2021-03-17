modules.push(function bitcoin() {

	var data = "{{DATA}}";

	var bitcoinDates = {
		"Today's Open": "{{DATE_LATEST}}",
		"vs Day":       "{{DATE_PREVIOUS}}",
		"vs Week":      "{{DATE_WEEK}}",
		"vs Month":     "{{DATE_MONTH}}",
		"vs Year":      "{{DATE_YEAR}}"
	}

	var bitcoinData = {
		"Today's Open": "{{VALUE_LATEST}}",
		'vs Day':       "{{VALUE_PREVIOUS}}",
		'vs Week':      "{{VALUE_WEEK}}",
		'vs Month':     "{{VALUE_MONTH}}",
		'vs Year':      "{{VALUE_YEAR}}"
	};

	var box = makeBox(2, 1);
	box
		.append('div')
		.attr('class', 'title')
		.html('&#x1F4B1;<a href="https://finance.yahoo.com/quote/BTC-GBP/history">Bitcoin</a>')
	box = box
		.append('div')
		.attr('class', 'inside');		
	var inside = box
		.append('div')
		.style('text-align', 'center')
		.style('margin-top', '6px');

	createLineChart(400, 150, inside, data, 1);

	var table = inside
		.append('div')
		.style('color', '#000')
		.style('background', 'rgba(255, 255, 255, 0.75)')
		.style('display', 'inline')
		.style('position', 'absolute')
		.style('top', '50px')
		.style('left', '19px')
		.style('padding', '3px')
		.append('table');
	
	for (var item of Object.keys(bitcoinData)) {
		var row = table
			.append('tr')
			.attr('class', 'ttt')
			.attr('data-tt', bitcoinDates[item])
			.style('font-weight', item.startsWith("Today") ? "bold" : "normal")
			.style('border-bottom', '1px solid #000');
		row
			.append('td')
			.style('text-align', 'left')
			.html(item + ':&nbsp;');
		row
			.append('td')
			.style('text-align', 'right')
			.attr('class', 'code')
			.html(bitcoinData[item]);
	}
});