var weatherLocation = "11609021";

var data={"copyright":"Contents are strictly for use by timeanddate.com","units":{"temp":"°C","prec":"mm","wind":"mph","baro":"mbar"},"detail":[{"hl":true,"hls":"8 Mar - 14 Mar","date":1615248E6,"ts":"Tue, 9","ds":"Tue, 9 Mar","icon":4,"desc":"Afternoon clouds.","temp":9,"templow":0,"cf":5,"wind":9,"wd":250,"hum":71,"pc":7},{"date":16153344E5,"ts":"Wed, 10","ds":"Wed, 10 Mar","icon":19,"desc":"Rain. Overcast.","temp":11,"templow":5,"cf":6,"wind":19,"wd":207,"hum":94,"pc":81,"rain":6},{"date":16154208E5,"ts":"Thu, 11","ds":"Thu, 11 Mar","icon":33,"desc":"Light showers. Cloudy.","temp":10,"templow":4,"cf":3,"wind":23,"wd":253,"hum":73,"pc":75,"rain":2.5 },{"date":16155072E5,"ts":"Fri, 12","ds":"Fri, 12 Mar","icon":18,"desc":"Light rain. Cloudy.","temp":8,"templow":4,"cf":2,"wind":21,"wd":235,"hum":74,"pc":82,"rain":4.5 },{"date":16155936E5,"ts":"Sat, 13","ds":"Sat, 13 Mar","icon":33,"desc":"Light showers. Overcast.","temp":7,"templow":2,"cf":2,"wind":20,"wd":251,"hum":76,"pc":90,"rain":5.6 },{"date":161568E7,"ts":"Sun, 14","ds":"Sun, 14 Mar","icon":18,"desc":"Sprinkles. Cloudy.","temp":8,"templow":2,"cf":4,"wind":15,"wd":282,"hum":78,"pc":72,"rain":1.7 },{"hl":true,"hls":"15 Mar - 21 Mar","date":16157664E5,"ts":"Mon, 15","ds":"Mon, 15 Mar","icon":33,"desc":"Light showers. Overcast.","temp":11,"templow":7,"cf":9,"wind":10,"wd":290,"hum":73,"pc":68,"rain":4.4 },{"date":16158528E5,"ts":"Tue, 16","ds":"Tue, 16 Mar","icon":18,"desc":"Sprinkles. Overcast.","temp":11,"templow":8,"cf":9,"wind":8,"wd":320,"hum":90,"pc":59,"rain":2.2 },{"date":16159392E5,"ts":"Wed, 17","ds":"Wed, 17 Mar","icon":2,"desc":"Scattered clouds.","temp":12,"templow":6,"cf":10,"wind":13,"wd":320,"hum":76,"pc":6},{"date":16160256E5,"ts":"Thu, 18","ds":"Thu, 18 Mar","icon":33,"desc":"Showers late. Breaks of sun late.","temp":13,"templow":6,"cf":11,"wind":9,"wd":300,"hum":74,"pc":55,"rain":1.5 },{"date":1616112E6,"ts":"Fri, 19","ds":"Fri, 19 Mar","icon":18,"desc":"Sprinkles. Clearing skies.","temp":7,"templow":2,"cf":3,"wind":15,"wd":30,"hum":61,"pc":65,"rain":0.9 },{"date":16161984E5,"ts":"Sat, 20","ds":"Sat, 20 Mar","icon":18,"desc":"Sprinkles. Clearing skies.","temp":6,"templow":1,"cf":1,"wind":14,"wd":40,"hum":55,"pc":42,"rain":0.7 },{"date":16162848E5,"ts":"Sun, 21","ds":"Sun, 21 Mar","icon":18,"desc":"Sprinkles. Afternoon clouds.","temp":6,"templow":0,"cf":2,"wind":9,"wd":50,"hum":64,"pc":46,"rain":1.4 },{"hl":true,"hls":"22 Mar - 28 Mar","date":16163712E5,"ts":"Mon, 22","ds":"Mon, 22 Mar","icon":18,"desc":"Sprinkles. Scattered clouds.","temp":6,"templow":0,"cf":3,"wind":8,"wd":50,"hum":50,"pc":41,"rain":0.4 },{"date":16164576E5,"ts":"Tue, 23","ds":"Tue, 23 Mar","icon":6,"desc":"Broken clouds.","temp":7,"templow":-1,"cf":4,"wind":8,"wd":10,"hum":51,"pc":4}],"grid":{"temp":{"low":-1,"high":13,"range":14},"prec":{"high":6},"time":86400000,"sections":15},"conv":{"prec":{"offset":0,"scale":1},"temp":{"offset":0,"scale":1},"wind":{"offset":0,"scale":0.869},"baro":{"offset":0,"scale":1}}};


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