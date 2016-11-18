const WIDTH = 800;
const HEIGHT = 650;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - (MARGIN * 2);
const INNER_HEIGHT = HEIGHT - (MARGIN * 2);

var coordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var cordXScale = d3.scaleLinear().range([0, INNER_WIDTH]).domain([0, 10]);
var cordYScale = d3.scaleLinear().range([INNER_HEIGHT, 0]).domain([0, 10]);

function setupSvg() {
    d3.select('.lineChart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')');
}

var area = d3.area()
    .x(function (cord) {
        return cordXScale(cord);
    })
    .y0(INNER_HEIGHT)
    .y1(function (cord) {
        return cordYScale(3 * Math.sin(cord) + 5);
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

function drawAreaChart(line) {
    var g = d3.select('svg g').append('g');
    g.append('path')
        .attr('d', line(coordinates))
        .attr('class', 'area');
}

function drawCircle() {
    var g = d3.select('svg > g').append('g');
    g.selectAll('circle').data(coordinates).enter().append('circle')
        .attr('cx', function (d) {
            return cordXScale(d)
        })
        .attr('cy', function (d) {
            return cordYScale(3 * Math.sin(d) + 5);
        }).attr('r', 5);
}

setupSvg();
drawAxis();
drawAreaChart(area);
drawCircle();
