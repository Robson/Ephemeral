var wordData = {
	Word:       'pivot',
	Definition: '<p><strong>1 :</strong> a shaft or pin on which something turns</p><p><strong>2 a :</strong> a person, thing, or factor having a major or central role, function, or effect</p><p><strong>b :</strong> a key player or position; <em>specifically</em>  an offensive position of a basketball player standing usually with back to the basket to relay passes, shoot, or provide a screen for teammates</p>'
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