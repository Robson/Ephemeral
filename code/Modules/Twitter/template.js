modules.push(function twitter() {
	var html =  '{{TRENDS}}';
	var title = '{{TITLE}}';
	var box = makeBox(1, 1);
	box
		.append('div')
		.attr('class', 'title')
		.html('&#x1F426;<a href="https://twitter.com/explore/tabs/trending">Twitter Trending</a>')
	box = box
		.append('div')
		.attr('class', 'inside');
	var inside = box
		.append('div')
		.attr('class', 'condensed')
		.style('text-align', 'left');
	inside
		.append('p')
		.style('font-weight', 'bold')
		.style('text-align', 'center')
		.html(title);
	inside
		.append('div')
		.style('text-align', 'left')
		.html(html);
});