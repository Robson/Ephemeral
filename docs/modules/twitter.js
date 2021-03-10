var twitterData = {
	TrendsUK: '<table><tr><td style="text-align: right">1</td><td><a href="https://twitter.com/search?q=%23PMQs">#PMQs</a></td></tr><tr><td style="text-align: right">2</td><td><a href="https://twitter.com/search?q=%23bringbackpiers">#bringbackpiers</a></td></tr><tr><td style="text-align: right">3</td><td><a href="https://twitter.com/search?q=%23WhatDoYouBelieveIn">#WhatDoYouBelieveIn</a></td></tr><tr><td style="text-align: right">4</td><td><a href="https://twitter.com/search?q=%23NoSmokingDay">#NoSmokingDay</a></td></tr><tr><td style="text-align: right">5</td><td><a href="https://twitter.com/search?q=%22Sarah+Everard%22">Sarah Everard</a></td></tr><tr><td style="text-align: right">6</td><td><a href="https://twitter.com/search?q=%22Matt+Judge%22">Matt Judge</a></td></tr><tr><td style="text-align: right">7</td><td><a href="https://twitter.com/search?q=%23wednesdaythought">#wednesdaythought</a></td></tr><tr><td style="text-align: right">8</td><td><a href="https://twitter.com/search?q=bighit">bighit</a></td></tr><tr><td style="text-align: right">9</td><td><a href="https://twitter.com/search?q=%22John+Murtough%22">John Murtough</a></td></tr><tr><td style="text-align: right">10</td><td><a href="https://twitter.com/search?q=Woodward">Woodward</a></td></tr></table>',
	TrendsUS: '<table><tr><td style="text-align: right">1</td><td><a href="https://twitter.com/search?q=%23WhatDoYouBelieveIn">#WhatDoYouBelieveIn</a></td></tr><tr><td style="text-align: right">2</td><td><a href="https://twitter.com/search?q=%23wednesdaythought">#wednesdaythought</a></td></tr><tr><td style="text-align: right">3</td><td><a href="https://twitter.com/search?q=%23Mar10Day">#Mar10Day</a></td></tr><tr><td style="text-align: right">4</td><td><a href="https://twitter.com/search?q=%23%E5%A4%95%E5%88%BB%E3%83%AD%E3%83%99%E3%83%AB3D">#夕刻ロベル3D</a></td></tr><tr><td style="text-align: right">5</td><td><a href="https://twitter.com/search?q=%23ROGUNBOX">#ROGUNBOX</a></td></tr><tr><td style="text-align: right">6</td><td><a href="https://twitter.com/search?q=HYBE">HYBE</a></td></tr><tr><td style="text-align: right">7</td><td><a href="https://twitter.com/search?q=SHOTARO">SHOTARO</a></td></tr><tr><td style="text-align: right">8</td><td><a href="https://twitter.com/search?q=bighit">bighit</a></td></tr><tr><td style="text-align: right">9</td><td><a href="https://twitter.com/search?q=%22Hump+Day%22">Hump Day</a></td></tr><tr><td style="text-align: right">10</td><td><a href="https://twitter.com/search?q=1team">1team</a></td></tr></table>'
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