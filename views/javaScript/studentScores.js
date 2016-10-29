var data = [
    {name: 'ramesh', subject: 'maths', score: 87},
    {name: 'suresh', subject: 'maths', score: 45},
    {name: 'pokemon', subject: 'english', score: 65},
    {name: 'mary', subject: 'kannada', score: 44},
    {name: 'riya', subject: 'science', score: 72},
    {name: 'katie', subject: 'social studies', score: 82},
    {name: 'katie', subject: 'maths', score: 98},
    {name: 'ramesh', subject: 'bengali', score: 25},
    {name: 'suresh', subject: 'science', score: 55},
    {name: 'riya', subject: 'tamil', score: 75},
    {name: 'pokemon', subject: 'sports', score: 95},
    {name: 'pokemon', subject: 'social studies', score: 32}
];


var xScale = d3.scaleLinear().range([0, 600]).domain([1, 100]);

var colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain([0, 100]);


var chart = d3.selectAll('.chart');
var legend = d3.selectAll('.legendsValue');

function createBarChart(data) {
    var bars = chart.selectAll('div').data(data, function (d) {
        return d.name + d.subject;
    });
    bars.enter().append('div')
        .style('height', 20)
        .attr('class', 'scoresBar');

    d3.selectAll('.scoresBar')
        .style('width', function (d) {
            return xScale(d.score)
        })
        .style('background', function (d) {
            return colorScale(d.subject)
        })
        .text(function (d) {
            return d.name + " " + d.score;
        });


    d3.selectAll('.scoresBar').data(data, function (d) {
        return d.name + d.subject
    })
        .exit().remove();

}


function displaySubject(data){

    var legends = legend.selectAll('div').data(data, function (d) {
        return d.subject;
    });

    legends.enter().append('div')
        .attr('class', 'subjectName')
        .style('width', 80)
        .style('background', function (d) {
            return colorScale(d.subject)
        })
        .text(function (d) {
            return d.subject;
        });

    d3.selectAll('.subjectName').data(data, function (d) {
        return d.subject;
    }).exit().remove();

}
$(window).ready(function () {
    createBarChart(data);
    displaySubject(data);

});
