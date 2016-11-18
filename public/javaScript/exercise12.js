const WIDTH = 800;
const HEIGHT = 650;
const MARGIN = 100;

const INNER_WIDTH = WIDTH - (MARGIN * 2);
const INNER_HEIGHT = HEIGHT - (MARGIN * 2);

var coordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var cordXScale = d3.scaleLinear().range([0, INNER_WIDTH]).domain([0, 10]);
var cordYScale = d3.scaleLinear().range([INNER_HEIGHT, 0]).domain([0, 10]);

function setupSvg() {
    var svg = d3.select('.lineChart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')');
    return svg;
}

var area = d3.area()
    .x(function (cord) {
        return cordXScale(cord);
    })
    .y0(INNER_HEIGHT)
    .y1(function (cord) {
        return cordYScale(3 * Math.sin(cord) + 5);
    });

var line = d3.line()
    .x(function (cord) {
        return cordXScale(cord);
    })
    .y(function (cord) {
        return cordYScale(3 * Math.sin(cord) + 5);
    });

function d3TickFormat(tick) {
    return (tick / 10.0).toFixed(1);
}

var xAxis = d3.axisBottom(cordXScale).ticks(10).tickFormat(d3TickFormat);
var yAxis = d3.axisLeft(cordYScale).ticks(10).tickFormat(d3TickFormat);

function drawAxis(svg) {
    var xAxisG = svg.append('g').attr('transform', 'translate(0,' + INNER_HEIGHT + ')');
    xAxisG.call(xAxis);
    var yAxisG = svg.append('g').attr('transform', 'translate(0,0)');
    yAxisG.call(yAxis);
}

function drawAreaChart(svg, chartGenerator, className, curve) {
    if (curve) {
        addTitle(svg, curve);
        chartGenerator.curve(curve.d3Curve);
    }
    var g = svg.append('g');
    g.append('path')
        .attr('d', chartGenerator(coordinates))
        .attr('class', className);


}

function addTitle(svg, curve) {
    var title = svg.append('g').attr('transform', 'translate(200)');
    title.append('text')
        .text(curve.curveTitle)
        .attr('class', 'curveTitle')
}

function drawCircle(svg) {
    var g = svg.append('g');
    g.selectAll('circle').data(coordinates).enter().append('circle')
        .attr('cx', function (d) {
            return cordXScale(d)
        })
        .attr('cy', function (d) {
            return cordYScale(3 * Math.sin(d) + 5);
        }).attr('r', 5);
}

function drawExercise12Charts() {
    var svg = setupSvg();
    drawAxis(svg);
    drawAreaChart(svg, area, 'area');
    drawAreaChart(svg, line, 'line');
    drawCircle(svg);
}

const curveArray = [
    {
        d3Curve: d3.curveLinearClosed,
        curveTitle: 'Curve Linear Closed'
    },
    {
        d3Curve: d3.curveStepAfter,
        curveTitle: 'Curve Step After'
    },
    {
        d3Curve: d3.curveBasisOpen,
        curveTitle: 'Curve Basis Open'
    },
    {
        d3Curve: d3.curveCardinalClosed,
        curveTitle: 'Curve Cardinal Closed'
    },
    {
        d3Curve: d3.curveBundle.beta(1),
        curveTitle: 'Curve Bundle#beta(1)'
    }
];


function drawExercise13Charts() {
    curveArray.forEach(function (curve) {
        var svg = setupSvg();
        drawAxis(svg);
        drawAreaChart(svg, area, 'area', curve);
        drawAreaChart(svg, line, 'line', curve);
        drawCircle(svg);
    });
}