modules.push(function youtube() {

    var data = {{DATA}};

    var box = makeBox(2, 2);
    box
        .append('div')
        .attr('class', 'title')
        .html('&#x1F4FC;<a href="https://www.youtube.com/feed/trending">YouTube Trending</a>')
    box = box
        .append('div')
        .attr('class', 'inside');
    var inside = box
        .append('div');
    var table = inside
        .append('table')
        .style('width', '80%')
        .style('margin', '0 auto');

    var count = 0;
    for (var video of data) {
        var row = table
            .append('tr');
        row
            .append('td')
            .append('img')
            .attr('src', 'https://i.ytimg.com/vi/' + video.id + '/hqdefault.jpg')
            .style('width', (480 / 4) + 'px')
            .style('height', (360 / 4) + 'px')
            .style('text-align', 'right')
            .attr('title', video.label);
        row
            .append('td')
            .style('text-align', 'left')
            .html(++count + '<br/><a href="https://www.youtube.com/watch?v=' + video.id + '">' + video.title + '</a>');
    }
});