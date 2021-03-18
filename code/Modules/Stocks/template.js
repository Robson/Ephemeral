modules.push(function stocks() {

	var rawData = "{{DATA}}";
	var symbol = "{{SYMBOL}}";

	var box = makeBox(3, 1);
	box
		.append('div')
		.attr('class', 'title')
		.html('&#x1F3B0;Stock: ' + symbol.toUpperCase());
	box = box
		.append('div')
		.attr('class', 'inside');	
	var insideLeft = box
		.append('div')
		.style('display', 'inline')
		.style('position', 'absolute')
		.style('left', 0)
		.style('width', '37%');

	var data = [];
	for (var day of Object.keys(rawData["Time Series (Daily)"]).reverse()) {
		var value = +rawData["Time Series (Daily)"][day]['open'];
		data.push({
			"day": day,
			"number": value,
			"tooltip": day + '<br/>$' + value.toFixed(2)
		})
	}

	var insideRight = box
		.append('div')
		.style('display', 'inline')
		.style('position', 'absolute')
		.style('right', 0)
		.style('width', '66%');
	createLineChart(400, 150, insideRight, data, 1);

	var info = "";
	info += '<table style="text-align:left">';
	info += '<tr class="ttt" data-tt="' + data[data.length - 1].day + '"style="font-weight:bold"><td>Latest:&nbsp;</td><td style="text-align:right" class="code">$' + data[data.length - 1].number.toFixed(2) + '</td></tr>';

	function diff(readable, days) {
		var latest = data[data.length - 1].number;
		var then = data[data.length - (days + 1)].number;
		var difference = latest / then;
		difference = (difference >= 0 ? '+' : '-') + difference.toFixed(2) + '%';
		return '<tr class="ttt" data-tt="' + data[data.length - (days + 1)].day + '"><td>' + readable + ':&nbsp;</td><td style="text-align:right" class="code">' + difference + '</td></tr>';
	}

	info += diff('vs Day', 1);
	info += diff('vs Week', 5);
	info += diff('vs Month', 20);
	info += diff('vs 3 Months', 60);

	insideLeft
		.append('div')
		.style('color', '#000')
		.html(info);
});