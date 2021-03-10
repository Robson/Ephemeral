var vanguardDates = {
	"Latest":      "Tue, Mar 09, 2021",
	"vs Previous": "Mon, Mar 08, 2021",
	"vs Week":     "Tue, Mar 02, 2021",
	"vs Month":    "Mon, Feb 08, 2021",
	"vs Year":     ""
}

var vanguardValues = {
	"Latest": "£155.75/share",
	'vs Previous': "+0.72%",
	'vs Week': "-0.04%",
	'vs Month': "-2.59%",
	'vs Year': "+34.14%"
};

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