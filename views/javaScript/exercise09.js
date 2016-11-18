const WIDTH = 800;
const HEIGHT = 650;
const MARGIN = 40;

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

var line = d3.line().x(function (cord) {
    return cordXScale(cord.x);
}).y(function (cord) {
    return cordYScale(cord.y);
});

var lineWithSineValue = d3.line().x(function (cord) {
    return cordXScale(cord.x);
}).y(function (cord) {
    return cordYScale(Math.sin(cord.x)) - cordYScale(5);
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

function drawLineChart(curve, svg, line, color) {
    line.curve(curve.d3Curve);
    var g = svg.append('g');
    var title = svg.append('g').attr('transform', 'translate(300)');
    g.append('path')
        .attr('d', line(coordinates))
        .classed('line', true)
        .attr('stroke', color);
    title.append('text')
        .text(curve.curveTitle)
        .attr('class','curveTitle')
}

function drawCircle(svg, strokeColor, isSineValue) {
    var g = svg.append('g');
    g.selectAll('circle').data(coordinates).enter().append('circle')
        .attr('cx', function (d) {
            return cordXScale(d.x)
        })
        .attr('cy', function (d) {
            if (isSineValue) return cordYScale(Math.sin(d.x)) - cordYScale(5);
            return cordYScale(d.y)
        }).attr('r', 5)
        .attr('stroke', strokeColor);
}


const curveArray = [
    {
        d3Curve: d3.curveLinear,
        curveTitle: 'Curve Linear'
    },
    {
        d3Curve: d3.curveLinearClosed,
        curveTitle: 'Curve Linear Closed'
    },
    {
        d3Curve: d3.curveStepAfter,
        curveTitle: 'Curve Step After'
    },
    {
        d3Curve: d3.curveBasis,
        curveTitle: 'Curve Basis Open'
    },
    {
        d3Curve: d3.curveBundle,
        curveTitle: 'Curve Bundle'
    },
    {
        d3Curve: d3.curveCardinalClosed,
        curveTitle: 'Curve Cardinal Closed'
    },
    {
        d3Curve: d3.curveCatmullRom,
        curveTitle: 'Curve Catmull Rom'
    },
    {
        d3Curve: d3.curveMonotoneX,
        curveTitle: 'Curve MonotoneX'
    }
];

curveArray.forEach(function (curve) {

    var svg = setupSvg();
    drawAxis(svg);
    drawLineChart(curve, svg, line, 'maroon');
    drawLineChart(curve, svg, lineWithSineValue, 'darkblue');
    drawCircle(svg, 'maroon');
    drawCircle(svg, 'darkblue', true);
});