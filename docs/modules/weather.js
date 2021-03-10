var weatherLocation = "11609021";

var data={"copyright":"Contents are strictly for use by timeanddate.com","units":{"temp":"°C","prec":"mm","wind":"mph","baro":"mbar"},"detail":[{"hl":true,"hls":"8 Mar - 14 Mar","date":16153344E5,"ts":"Wed, 10","ds":"Wed, 10 Mar","icon":18,"desc":"Sprinkles. Overcast.","temp":11,"templow":5,"cf":6,"wind":19,"wd":204,"hum":93,"pc":83,"rain":3.4 },{"date":16154208E5,"ts":"Thu, 11","ds":"Thu, 11 Mar","icon":33,"desc":"Light showers. Cloudy.","temp":10,"templow":4,"cf":3,"wind":22,"wd":253,"hum":74,"pc":79,"rain":3},{"date":16155072E5,"ts":"Fri, 12","ds":"Fri, 12 Mar","icon":33,"desc":"Light showers. Cloudy.","temp":8,"templow":4,"cf":3,"wind":19,"wd":238,"hum":68,"pc":76,"rain":2.7 },{"date":16155936E5,"ts":"Sat, 13","ds":"Sat, 13 Mar","icon":33,"desc":"Light showers. Cloudy.","temp":8,"templow":3,"cf":2,"wind":21,"wd":259,"hum":67,"pc":72,"rain":4.8 },{"date":161568E7,"ts":"Sun, 14","ds":"Sun, 14 Mar","icon":33,"desc":"Light showers. Cloudy.","temp":9,"templow":2,"cf":5,"wind":16,"wd":290,"hum":68,"pc":81,"rain":2.7 },{"hl":true,"hls":"15 Mar - 21 Mar","date":16157664E5,"ts":"Mon, 15","ds":"Mon, 15 Mar","icon":2,"desc":"Mostly sunny.","temp":8,"templow":3,"cf":3,"wind":14,"wd":325,"hum":65,"pc":6},{"date":16158528E5,"ts":"Tue, 16","ds":"Tue, 16 Mar","icon":4,"desc":"Afternoon clouds.","temp":9,"templow":3,"cf":8,"wind":4,"wd":350,"hum":66,"pc":6},{"date":16159392E5,"ts":"Wed, 17","ds":"Wed, 17 Mar","icon":33,"desc":"Showers late. Clearing skies.","temp":9,"templow":3,"cf":5,"wind":14,"wd":10,"hum":69,"pc":50,"rain":0.6 },{"date":16160256E5,"ts":"Thu, 18","ds":"Thu, 18 Mar","icon":18,"desc":"Sprinkles. Cloudy.","temp":7,"templow":3,"cf":4,"wind":10,"wd":20,"hum":74,"pc":50,"rain":0.5 },{"date":1616112E6,"ts":"Fri, 19","ds":"Fri, 19 Mar","icon":18,"desc":"Sprinkles late. Scattered clouds.","temp":8,"templow":0,"cf":5,"wind":8,"wd":70,"hum":66,"pc":49,"rain":0.4 },{"date":16161984E5,"ts":"Sat, 20","ds":"Sat, 20 Mar","icon":18,"desc":"Sprinkles late. Afternoon clouds.","temp":8,"templow":0,"cf":7,"wind":4,"wd":250,"hum":41,"pc":59,"rain":0.3 },{"date":16162848E5,"ts":"Sun, 21","ds":"Sun, 21 Mar","icon":28,"desc":"Snow changing to rain. Breaks of sun late.","temp":8,"templow":1,"cf":5,"wind":13,"wd":30,"hum":59,"pc":58,"rain":2.4 ,"snow":2},{"hl":true,"hls":"22 Mar - 28 Mar","date":16163712E5,"ts":"Mon, 22","ds":"Mon, 22 Mar","icon":4,"desc":"Afternoon clouds.","temp":8,"templow":1,"cf":7,"wind":4,"wd":290,"hum":51,"pc":6},{"date":16164576E5,"ts":"Tue, 23","ds":"Tue, 23 Mar","icon":18,"desc":"Sprinkles. Partly cloudy.","temp":8,"templow":2,"cf":4,"wind":14,"wd":290,"hum":72,"pc":67,"rain":1.3 },{"date":1616544E6,"ts":"Wed, 24","ds":"Wed, 24 Mar","icon":4,"desc":"Increasing cloudiness.","temp":8,"templow":1,"cf":3,"wind":13,"wd":320,"hum":44,"pc":6}],"grid":{"temp":{"low":0,"high":11,"range":11},"prec":{"high":4.8},"time":86400000,"sections":15},"conv":{"prec":{"offset":0,"scale":1},"temp":{"offset":0,"scale":1},"wind":{"offset":0,"scale":0.869},"baro":{"offset":0,"scale":1}}};


function weather() {
    var box = makeBox(2, 2);
    box
        .append('div')
        .attr('class', 'title')
        .html('&#127746;<a href="https://www.timeanddate.com/weather/@' + weatherLocation + '/ext">Weather</a>')
    box = box
        .append('div')
        .attr('class', 'inside');
    var inside = box
        .append('div');
    var table = inside
        .append('table');

    for (var day of data.detail.slice(0, 7)) {
        var row = table
            .append('tr');
        row
            .append('td')
            .style('text-align', 'right')
            .style('font-weight', 'bold')
            .html(day.ds.split(',')[0] + ':&nbsp;');
        row
            .append('td')
            .style('text-align', 'right')
            .attr('class', 'code')
            .html(day.templow + '&#xb0;');
        row
            .append('td')
            .style('text-align', 'right')
            .attr('class', 'code')
            .html('to');
        row
            .append('td')
            .style('text-align', 'right')
            .attr('class', 'code')
            .html(day.temp + '&#xb0;');
        row
            .append('td')
            .style('text-align', 'center')
            .append('img')
            .attr('src', 'https://c.tadst.com/gfx/w/svg/wt-' + day.icon + '.svg')
            .attr('width', '32px')
            .attr('height', '32px');
        row
            .append('td')
            .style('text-align', 'left')
            .html(day.desc)
    }
}

modules.push(weather)