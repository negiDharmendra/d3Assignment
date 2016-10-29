var start = 10;
var end = 20;
// var colorRange = ['#4876FF', '#436EEE', '#3A5FCD', '#27408B', '#4997D0', '#002395', '#273BE2', '#5D8AA8', '#436B95', '#39B7CD'];
// colorRange = ["#F0F8FF", "#E6E6FA", "#B0E0E6", "#ADD8E6", "#87CEFA", "#87CEEB", "#00BFFF", "#B0C4DE", "#1E90FF", "#6495ED", "#4682B4", "#5F9EA0", "#7B68EE", "#6A5ACD", "#483D8B", "#4169E1", "#0000FF", "#0000CD", "#00008B", "#000080", "#191970", "#8A2BE2", "#4B0082"];


var Sequence = function (startAt) {
    this.start = startAt;
    this.next = function () {
        return startAt++;
    }
};

var sequence = new Sequence(1);

var data = generateRandomNumber(10, start, end);


function generateRandomNumber(range) {
    var values = [];
    for (var i = 0; i < range; i++) {
        var valueObject = {};
        valueObject.value = Math.round(Math.random() * 100);
        valueObject.seq = sequence.next();
        values.push(valueObject);
    }
    return values;
}


var xScale = d3.scaleLinear().range([0, 100]).domain([1, 20]);

var colorScale = d3.scaleLinear().range(["#E0FFFF", '#0000FF']).domain([0, 100]);


var chart = d3.selectAll('.chart');

function createBarChart(data) {
    var bars = chart.selectAll('div').data(data, function (d) {
        return d.seq
    });
    bars.enter().append('div')
        .style('height', 20)
        .attr('class', 'bar');

    d3.selectAll('div.bar')
        .style('width', function (d) {
            return xScale(d.value)
        })
        .style('background', function (d) {
            return colorScale(d.value)
        })
        .text(function (d) {
            return d.value
        });

    d3.selectAll('div.bar').data(data,function(d){return d.seq})
        .exit().remove();

    data.shift()
}

var intr = setInterval(function () {
    createBarChart(data);
    data.push({value: (Math.round(Math.random() * 100)), seq: sequence.next()});
}, 1000);


$(window).ready(function () {
    createBarChart(data);

});
