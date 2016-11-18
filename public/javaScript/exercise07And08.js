const WIDTH = 800;
const HEIGHT = 650;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - (MARGIN * 2);
const INNER_HEIGHT = HEIGHT - (MARGIN * 2);

var coordinates = [
    {"x": 0, "y": 5},
    {"x": 1, "y": 9},
    {"x": 2, "y": 7},
    {"x": 3, "y": 5},
    {"x": 4, "y": 3},
    {"x": 6, "y": 4},
    {"x": 7, "y": 2},
    {"x": 8, "y": 3},
    {"x": 9, "y": 2}
];

var coordinatesForSine = [
    {"x": 0},
    {"x": 1},
    {"x": 2},
    {"x": 3},
    {"x": 4},
    {"x": 5},
    {"x": 6},
    {"x": 7},
    {"x": 8},
    {"x": 9}
];

var cordXScale = d3.scaleLinear().range([0, INNER_WIDTH]).domain([0, 10]);
var cordYScale = d3.scaleLinear().range([INNER_HEIGHT, 0]).domain([0, 10]);

function setupSvg() {
    d3.select('.lineChart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')');
}

var line = d3.line()
    .x(function (cord) {
        return cordXScale(cord.x);
    })
    .y(function (cord) {
        return cordYScale(cord.y);
    });

var lineWithSineValue = d3.line()
    .x(function (cord) {
        return cordXScale(cord.x);
    })
    .y(function (cord) {
        return cordYScale(Math.sin(cord.x)) - cordYScale(5);
    });


function d3TickFormat(tick) {
    return (tick / 10.0).toFixed(1);
}

var xAxis = d3.axisBottom(cordXScale).ticks(10).tickFormat(d3TickFormat);
var yAxis = d3.axisLeft(cordYScale).ticks(10).tickFormat(d3TickFormat);

function drawAxis() {
    var xAxisG = d3.select('svg g').append('g').attr('transform', 'translate(0,' + INNER_HEIGHT + ')');
    xAxisG.call(xAxis);
    var yAxisG = d3.select('svg g').append('g').attr('transform', 'translate(0,0)');
    yAxisG.call(yAxis);
}

function drawLineChart(line, coordinates) {
    var g = d3.select('svg g').append('g');
    g.append('path')
        .attr('d', line(coordinates))
        .attr('class', 'line');
}

function drawCircle(coordinates, isSineValue) {
    var g = d3.select('svg > g').append('g');
    g.selectAll('circle').data(coordinates).enter().append('circle')
        .attr('cx', function (d) {
            return cordXScale(d.x)
        })
        .attr('cy', function (d) {
            if (isSineValue) return cordYScale(Math.sin(d.x)) - cordYScale(5);
            return cordYScale(d.y)
        }).attr('r', 5);
}

setupSvg();
drawAxis();
drawLineChart(line, coordinates);
drawLineChart(lineWithSineValue, coordinatesForSine);
drawCircle(coordinates);
drawCircle(coordinatesForSine, true);
