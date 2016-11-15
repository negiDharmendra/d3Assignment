const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = 30;

var xPoints = [0, 1, 2, 3, 4, 6, 7, 8, 9];
var yPoints = [5, 9, 7, 5, 3, 4, 2, 3, 2];

function generateCord(xPoints, yPoints) {
    return xPoints.map(function (cord, index) {
        return {x: cord, y: yPoints[index]};
    })
}

var cordXScale = d3.scaleLinear().range([0, 400]).domain([0, 9]);
var cordYScale = d3.scaleLinear().range([400, 0]).domain([0, 9]);

function setupSvg() {
    d3.select('.lineChart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')');
}

var line = d3.line().x(function (cord) {
    return cordXScale(cord.x);
}).y(function (cord) {
    return cordYScale(cord.y);
});

var line2 = d3.line().x(function (cord) {
    return cordXScale(cord.x);
}).y(function (cord) {
    return cordYScale(Math.sin(cord.x));
});


function d3TickFormat(d) {
    return d / 10
}

var xAxis = d3.axisBottom(cordXScale).ticks(10).tickFormat(d3TickFormat);
var yAxis = d3.axisLeft(cordYScale).ticks(10).tickFormat(d3TickFormat);

function drawAxis() {
    var xAxisG = d3.select('svg g').append('g').attr('transform', 'translate(0,' + 400 + ')');
    xAxisG.call(xAxis);
    var yAxisG = d3.select('svg g').append('g').attr('transform', 'translate(0,0)');
    yAxisG.call(yAxis);
}

function drawLineChart(line) {
    var g = d3.select('svg g').append('g');
    g.append('path')
        .attr('d', line(generateCord(xPoints, yPoints)))
        .attr('stroke', 'steelblue')
        .attr('fill', 'none');
}

setupSvg();
drawAxis();
drawLineChart(line);
drawLineChart(line2);