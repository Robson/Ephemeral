modules.push(function bbc() {
	var html =  '{{NEWS}}';
	var title = '{{TITLE}}';
	var box = makeBox(2, 1);
	box
		.append('div')
		.attr('class', 'title')
		.html('&#x1F4F0;<a href="https://www.bbc.co.uk/news">BBC News</a>: ' + title)
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