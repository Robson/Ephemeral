var vanguardValues = {
	"Latest":      "£155.08/share",
	'vs Previous': "+1.89%",
	'vs Week':     "+1.29%",
	'vs Month':    "-2.25%",
	'vs Year':     "+23.39%"
};

var vanguardDates = {
	"Latest":      "Fri, Mar 05, 2021",
	"vs Previous": "Thu, Mar 04, 2021",
	"vs Week":     "Fri, Feb 26, 2021",
	"vs Month":    "Fri, Feb 05, 2021",
	"vs Year":     ""
}

function vanguard() {
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
}

modules.push(vanguard);