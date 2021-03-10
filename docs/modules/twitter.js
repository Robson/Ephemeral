var twitterData = {
	TrendsUK: '<table><tr><td style="text-align: right">1</td><td><a href="https://twitter.com/search?q=Ronaldo">Ronaldo</a></td></tr><tr><td style="text-align: right">2</td><td><a href="https://twitter.com/search?q=Porto">Porto</a></td></tr><tr><td style="text-align: right">3</td><td><a href="https://twitter.com/search?q=%23JUVPOR">#JUVPOR</a></td></tr><tr><td style="text-align: right">4</td><td><a href="https://twitter.com/search?q=%23TheCelebrityCircle">#TheCelebrityCircle</a></td></tr><tr><td style="text-align: right">5</td><td><a href="https://twitter.com/search?q=%23ChampionsLeague">#ChampionsLeague</a></td></tr><tr><td style="text-align: right">6</td><td><a href="https://twitter.com/search?q=Pirlo">Pirlo</a></td></tr><tr><td style="text-align: right">7</td><td><a href="https://twitter.com/search?q=Haaland">Haaland</a></td></tr><tr><td style="text-align: right">8</td><td><a href="https://twitter.com/search?q=Rabiot">Rabiot</a></td></tr><tr><td style="text-align: right">9</td><td><a href="https://twitter.com/search?q=Chiesa">Chiesa</a></td></tr><tr><td style="text-align: right">10</td><td><a href="https://twitter.com/search?q=%22Piers+Morgan%22">Piers Morgan</a></td></tr></table>',
	TrendsUS: '<table><tr><td style="text-align: right">1</td><td><a href="https://twitter.com/search?q=Porto">Porto</a></td></tr><tr><td style="text-align: right">2</td><td><a href="https://twitter.com/search?q=Ronaldo">Ronaldo</a></td></tr><tr><td style="text-align: right">3</td><td><a href="https://twitter.com/search?q=%22Meyers+Leonard%22">Meyers Leonard</a></td></tr><tr><td style="text-align: right">4</td><td><a href="https://twitter.com/search?q=%23dionnewarwick">#dionnewarwick</a></td></tr><tr><td style="text-align: right">5</td><td><a href="https://twitter.com/search?q=%22Cocaine+Bear%22">Cocaine Bear</a></td></tr><tr><td style="text-align: right">6</td><td><a href="https://twitter.com/search?q=%23JUVPOR">#JUVPOR</a></td></tr><tr><td style="text-align: right">7</td><td><a href="https://twitter.com/search?q=%23AskMarvel">#AskMarvel</a></td></tr><tr><td style="text-align: right">8</td><td><a href="https://twitter.com/search?q=%22Piers+Morgan%22">Piers Morgan</a></td></tr><tr><td style="text-align: right">9</td><td><a href="https://twitter.com/search?q=%22Gary+Thorne%22">Gary Thorne</a></td></tr><tr><td style="text-align: right">10</td><td><a href="https://twitter.com/search?q=%23ChampionsLeague">#ChampionsLeague</a></td></tr></table>'
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