var bitcoinData = {
	"Today's Open": "£37,707.62",
	'vs Yesterday': "NA",
	'vs Week':      "+1.1%",
	'vs Month':     "+1.1%",
	'vs Year':      "+6.1%"
};

function bitcoin() {
	var box = makeBox(1, 1);
	box
		.append('div')
		.attr('class', 'title')
		.html('&#x1F4B1;<a href="https://finance.yahoo.com/quote/BTC-GBP/history">Bitcoin</a>')
	box = box
		.append('div')
		.attr('class', 'inside');		
	var inside = box
		.append('div');
	var table = inside
		.append('table');	
	
	for (var item of Object.keys(bitcoinData)) {
		var row = table
			.append('tr')
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
}

modules.push(bitcoin);