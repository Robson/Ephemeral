var twitterData = {
	TrendsUK: '{{TRENDS_UK}}',
	TrendsUS: '{{TRENDS_US}}'
}

function twitter() {
	var box = makeBox(1, 2);
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
		.html('UK');
	inside
		.append('div')
		.style('text-align', 'left')
		.html(twitterData.TrendsUK);
	inside
		.append('p')
		.style('font-weight', 'bold')
		.style('text-align', 'center')
		.html('US');
	inside
		.append('div')
		.style('text-align', 'left')
		.html(twitterData.TrendsUS);
}

modules.push(twitter);