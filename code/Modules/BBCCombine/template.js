modules.push(function bbcCombine() {
	var html = '{{NEWS}}';
	var box = makeBox(3, {{AMOUNT}});
	box
		.append('div')
		.attr('class', 'title')
		.html('&#x1F4F0;<a href="https://www.bbc.co.uk/news">BBC News</a>')
	box = box
		.append('div')
		.attr('class', 'inside');
	var inside = box
		.append('div')
		.attr('class', 'condensed')
		.style('text-align', 'left');
	inside
		.append('div')
		.style('text-align', 'left')
		.html(html);
});