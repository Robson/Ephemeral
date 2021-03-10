var wordData = {
	Word:       'felicitate',
	Definition: '<p><strong>1</strong> <em>archaic</em>  to make happy</p><p><strong>2 a:</strong> to consider happy or fortunate</p><p><strong>b:</strong> to offer congratulations to</p>'
}

function word() {
	var box = makeBox(wordData.Definition.length > 250 ? 2 : 1, 1);
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