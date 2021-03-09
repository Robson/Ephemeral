var twitterData = {
	TrendsUK: '<table><tr><td style="text-align: right">1</td><td><a href="https://twitter.com/search?q=%22Piers+Morgan%22">Piers Morgan</a></td></tr><tr><td style="text-align: right">2</td><td><a href="https://twitter.com/search?q=%22GB+News%22">GB News</a></td></tr><tr><td style="text-align: right">3</td><td><a href="https://twitter.com/search?q=%22Good+Morning+Britain%22">Good Morning Britain</a></td></tr><tr><td style="text-align: right">4</td><td><a href="https://twitter.com/search?q=%23SackChrisWhitty">#SackChrisWhitty</a></td></tr><tr><td style="text-align: right">5</td><td><a href="https://twitter.com/search?q=%22Andrew+Neil%22">Andrew Neil</a></td></tr><tr><td style="text-align: right">6</td><td><a href="https://twitter.com/search?q=Ofcom">Ofcom</a></td></tr><tr><td style="text-align: right">7</td><td><a href="https://twitter.com/search?q=Susanna">Susanna</a></td></tr><tr><td style="text-align: right">8</td><td><a href="https://twitter.com/search?q=%23GrahamLinehanIsABigot">#GrahamLinehanIsABigot</a></td></tr><tr><td style="text-align: right">9</td><td><a href="https://twitter.com/search?q=GMTV">GMTV</a></td></tr><tr><td style="text-align: right">10</td><td><a href="https://twitter.com/search?q=%22Good+Riddance%22">Good Riddance</a></td></tr></table>',
	TrendsUS: '<table><tr><td style="text-align: right">1</td><td><a href="https://twitter.com/search?q=%23LaurenBoebert4Prison">#LaurenBoebert4Prison</a></td></tr><tr><td style="text-align: right">2</td><td><a href="https://twitter.com/search?q=Golladay">Golladay</a></td></tr><tr><td style="text-align: right">3</td><td><a href="https://twitter.com/search?q=Betty">Betty</a></td></tr><tr><td style="text-align: right">4</td><td><a href="https://twitter.com/search?q=%22Piers+Morgan%22">Piers Morgan</a></td></tr><tr><td style="text-align: right">5</td><td><a href="https://twitter.com/search?q=HuffPost">HuffPost</a></td></tr><tr><td style="text-align: right">6</td><td><a href="https://twitter.com/search?q=%22Hunter+Henry%22">Hunter Henry</a></td></tr><tr><td style="text-align: right">7</td><td><a href="https://twitter.com/search?q=Bethesda">Bethesda</a></td></tr><tr><td style="text-align: right">8</td><td><a href="https://twitter.com/search?q=%22The+Phantom+Tollbooth%22">The Phantom Tollbooth</a></td></tr><tr><td style="text-align: right">9</td><td><a href="https://twitter.com/search?q=%23tuesdaymotivations">#tuesdaymotivations</a></td></tr><tr><td style="text-align: right">10</td><td><a href="https://twitter.com/search?q=%23Cyborg">#Cyborg</a></td></tr></table>'
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