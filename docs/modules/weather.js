var weatherLocation = "11609021";

var data={"copyright":"Contents are strictly for use by timeanddate.com","units":{"temp":"°C","prec":"mm","wind":"mph","baro":"mbar"},"detail":[{"hl":true,"hls":"8 Mar - 14 Mar","date":1615248E6,"ts":"Tue, 9","ds":"Tue, 9 Mar","icon":4,"desc":"Increasing cloudiness.","temp":8,"templow":-1,"cf":5,"wind":9,"wd":253,"hum":71,"pc":6},{"date":16153344E5,"ts":"Wed, 10","ds":"Wed, 10 Mar","icon":18,"desc":"Light rain. Overcast.","temp":11,"templow":4,"cf":6,"wind":18,"wd":204,"hum":94,"pc":77,"rain":5},{"date":16154208E5,"ts":"Thu, 11","ds":"Thu, 11 Mar","icon":33,"desc":"Light showers. Overcast.","temp":11,"templow":4,"cf":3,"wind":23,"wd":249,"hum":73,"pc":64,"rain":2.5 },{"date":16155072E5,"ts":"Fri, 12","ds":"Fri, 12 Mar","icon":33,"desc":"Light showers. Overcast.","temp":8,"templow":4,"cf":3,"wind":19,"wd":243,"hum":73,"pc":70,"rain":3.1 },{"date":16155936E5,"ts":"Sat, 13","ds":"Sat, 13 Mar","icon":33,"desc":"Rain showers. Cloudy.","temp":8,"templow":3,"cf":2,"wind":22,"wd":254,"hum":79,"pc":74,"rain":5.7 },{"date":161568E7,"ts":"Sun, 14","ds":"Sun, 14 Mar","icon":33,"desc":"Light showers. Increasing cloudiness.","temp":9,"templow":2,"cf":6,"wind":12,"wd":260,"hum":71,"pc":66,"rain":2.5 },{"hl":true,"hls":"15 Mar - 21 Mar","date":16157664E5,"ts":"Mon, 15","ds":"Mon, 15 Mar","icon":33,"desc":"Light showers. Overcast.","temp":12,"templow":7,"cf":10,"wind":12,"wd":270,"hum":76,"pc":59,"rain":1.5 },{"date":16158528E5,"ts":"Tue, 16","ds":"Tue, 16 Mar","icon":6,"desc":"Broken clouds.","temp":14,"templow":8,"cf":11,"wind":11,"wd":270,"hum":73,"pc":6},{"date":16159392E5,"ts":"Wed, 17","ds":"Wed, 17 Mar","icon":18,"desc":"Sprinkles late. Mostly cloudy.","temp":13,"templow":8,"cf":10,"wind":11,"wd":310,"hum":77,"pc":46,"rain":0.3 },{"date":16160256E5,"ts":"Thu, 18","ds":"Thu, 18 Mar","icon":18,"desc":"Sprinkles late. Mostly cloudy.","temp":14,"templow":8,"cf":13,"wind":6,"wd":230,"hum":78,"pc":38,"rain":0.1 },{"date":1616112E6,"ts":"Fri, 19","ds":"Fri, 19 Mar","icon":1,"desc":"Sunny.","temp":14,"templow":8,"cf":13,"wind":7,"wd":270,"hum":64,"pc":4},{"date":16161984E5,"ts":"Sat, 20","ds":"Sat, 20 Mar","icon":4,"desc":"Afternoon clouds.","temp":13,"templow":7,"cf":12,"wind":7,"wd":290,"hum":73,"pc":6},{"date":16162848E5,"ts":"Sun, 21","ds":"Sun, 21 Mar","icon":6,"desc":"Mostly cloudy.","temp":13,"templow":7,"cf":11,"wind":8,"wd":270,"hum":59,"pc":6},{"hl":true,"hls":"22 Mar - 28 Mar","date":16163712E5,"ts":"Mon, 22","ds":"Mon, 22 Mar","icon":18,"desc":"Sprinkles late. Afternoon clouds.","temp":12,"templow":5,"cf":10,"wind":9,"wd":10,"hum":64,"pc":58,"rain":1.2 },{"date":16164576E5,"ts":"Tue, 23","ds":"Tue, 23 Mar","icon":6,"desc":"Broken clouds.","temp":12,"templow":5,"cf":10,"wind":12,"wd":50,"hum":77,"pc":6}],"grid":{"temp":{"low":-1,"high":14,"range":15},"prec":{"high":5.7},"time":86400000,"sections":15},"conv":{"prec":{"offset":0,"scale":1},"temp":{"offset":0,"scale":1},"wind":{"offset":0,"scale":0.869},"baro":{"offset":0,"scale":1}}};


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