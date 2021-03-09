var wordData = {
	Word:       'luminary',
	Definition: '<p><strong>1 :</strong> a person of prominence or brilliant achievement</p><p><strong>2 :</strong> a body that gives light; <em>especially</em>  one of the celestial bodies</p>'
}

function word() {
	var box = makeBox(2, 1);
	box
		.append('div')
		.attr('class', 'title')
		.html('&#x1F4DC;<a href="https://www.merriam-webster.com/word-of-the-day">Word of the Day</a>')
	box = box
		.append('div')
		.attr('class', 'inside');	
	var inside = box
		.append('div');
	inside
		.append('p')
		.style('font-weight', 'bold')
		.append('a')
		.attr('href', 'https://www.merriam-webster.com/dictionary/' + wordData.Word)
		.text(wordData.Word);
	inside
		.append('div')
		.style('padding', '5px')
		.html(wordData.Definition);	
}

modules.push(word);