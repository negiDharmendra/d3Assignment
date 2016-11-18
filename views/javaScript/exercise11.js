const WIDTH = 800;
const HEIGHT = 650;
const MARGIN = 100;

const INNER_WIDTH = WIDTH - (MARGIN * 2);
const INNER_HEIGHT = HEIGHT - (MARGIN * 2);

var coordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var cordXScale = d3.scaleLinear().range([0, INNER_WIDTH]).domain([0, 10]);
var cordYScale = d3.scaleLinear().range([INNER_HEIGHT, 0]).domain([0, 1]);

function setupSvg() {
    var svg = d3.select('.lineChart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')');
    return svg;
}

var line = d3.line().x(function (cord) {
    return cordXScale(cord);
}).y(function (cord) {
    return cordYScale(((Math.sin(3 * cord) + 1) / 2));
});


function d3TickFormat(tick) {
    return (tick / 10.0).toFixed(1);
}

var xAxis = d3.axisBottom(cordXScale).ticks(10);
var yAxis = d3.axisLeft(cordYScale).ticks(10).tickFormat(d3TickFormat);

function drawAxis(svg) {
    var xAxisG = svg.append('g').attr('transform', 'translate(0,' + INNER_HEIGHT + ')');
    xAxisG.call(xAxis);
    var yAxisG = svg.append('g').attr('transform', 'translate(0,0)');
    yAxisG.call(yAxis);
}

function drawLineChart(svg, line) {
    var g = svg.append('g');
    g.append('path')
        .attr('d', line(coordinates))
        .attr('class', 'line');
}

function drawCircle(svg) {
    var g = svg.append('g');
    g.selectAll('circle').data(coordinates).enter().append('circle')
        .attr('cx', function (d) {
            return cordXScale(d)
        })
        .attr('cy', function (d) {
            return cordYScale((Math.sin(3 * d) + 1) / 2);
        }).attr('r', 5);
}

var tension = d3.scaleLinear().range([-1.5,1]).domain([0,4]);
const curveArray = [
    {
        d3Curve: d3.curveCardinal,
        curveTitle: 'Curve Cardinal'
    },
    {
        d3Curve: d3.curveCardinal,
        curveTitle: 'Curve Cardinal'
    },
    {
        d3Curve: d3.curveCardinal,
        curveTitle: 'Curve Cardinal'
    },
    {
        d3Curve: d3.curveCardinal,
        curveTitle: 'Curve Cardinal'
    },
    {
        d3Curve: d3.curveCardinal,
        curveTitle: 'Curve Cardinal'
    }
];

curveArray.forEach(function (curve, index) {
    line.curve(curve.d3Curve.tension(tension(index)));
    var svg = setupSvg();
    drawAxis(svg);
    drawLineChart(svg, line);
    drawCircle(svg);
});
