var twitterData = {
	TrendsUK: '<table><tr><td style="text-align: right">1</td><td><a href="https://twitter.com/search?q=%23wednesdaythought">#wednesdaythought</a></td></tr><tr><td style="text-align: right">2</td><td><a href="https://twitter.com/search?q=Ranvir">Ranvir</a></td></tr><tr><td style="text-align: right">3</td><td><a href="https://twitter.com/search?q=%22Grant+Shapps%22">Grant Shapps</a></td></tr><tr><td style="text-align: right">4</td><td><a href="https://twitter.com/search?q=%23FFBWednesday">#FFBWednesday</a></td></tr><tr><td style="text-align: right">5</td><td><a href="https://twitter.com/search?q=%23bringbackpiers">#bringbackpiers</a></td></tr><tr><td style="text-align: right">6</td><td><a href="https://twitter.com/search?q=%23r4today">#r4today</a></td></tr><tr><td style="text-align: right">7</td><td><a href="https://twitter.com/search?q=%22NHS+Test+and+Trace%22">NHS Test and Trace</a></td></tr><tr><td style="text-align: right">8</td><td><a href="https://twitter.com/search?q=%23WednesdayMotivation">#WednesdayMotivation</a></td></tr><tr><td style="text-align: right">9</td><td><a href="https://twitter.com/search?q=%22sarah+everard%22">sarah everard</a></td></tr><tr><td style="text-align: right">10</td><td><a href="https://twitter.com/search?q=Freedom">Freedom</a></td></tr></table>',
	TrendsUS: '<table><tr><td style="text-align: right">1</td><td><a href="https://twitter.com/search?q=%23bringthetea">#bringthetea</a></td></tr><tr><td style="text-align: right">2</td><td><a href="https://twitter.com/search?q=%23antisvslarries">#antisvslarries</a></td></tr><tr><td style="text-align: right">3</td><td><a href="https://twitter.com/search?q=1team">1team</a></td></tr><tr><td style="text-align: right">4</td><td><a href="https://twitter.com/search?q=bambam">bambam</a></td></tr><tr><td style="text-align: right">5</td><td><a href="https://twitter.com/search?q=%23themoistspace">#themoistspace</a></td></tr><tr><td style="text-align: right">6</td><td><a href="https://twitter.com/search?q=%23orbitspace">#orbitspace</a></td></tr><tr><td style="text-align: right">7</td><td><a href="https://twitter.com/search?q=%23BTSpace">#BTSpace</a></td></tr><tr><td style="text-align: right">8</td><td><a href="https://twitter.com/search?q=Nate">Nate</a></td></tr><tr><td style="text-align: right">9</td><td><a href="https://twitter.com/search?q=%22WENDY+SOLO%22">WENDY SOLO</a></td></tr><tr><td style="text-align: right">10</td><td><a href="https://twitter.com/search?q=%22Sara+Jay%22">Sara Jay</a></td></tr></table>'
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