const HEIGHT = 100;
const WIDTH = 100;
const MARGIN = 50;
const STARTING_POINT = 0;

var shapes = [createLine, createCircle, createSquare, createTriangle];


function setupSvg() {
    d3.select('.svgShapes').append('svg')
        .attr('width', 560)
        .attr('height', 120)
        .attr();
}


function appendGroup(translateBy) {
    return d3.select('svg').append('g').attr('transform', translateBy);
}

function createLine(group) {
    group.append('line')
        .attr('x1', STARTING_POINT)
        .attr('y1', HEIGHT)
        .attr('x2', WIDTH)
        .attr('y2', STARTING_POINT)
        .attr('fill', 'none')
        .attr('stroke', 'gray');
}

function createCircle(group) {
    group.append('circle')
        .attr('r', WIDTH / 2)
        .attr('cx', WIDTH / 2)
        .attr('cy', HEIGHT / 2);
}

function createSquare(group) {
    var borderRadius = 5;
    group.append('rect')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .attr('class', 'square')
        .attr('rx', borderRadius)
        .attr('ry', borderRadius);
}


function createTriangle(group) {
    var points = '0,100 50,0 100,100';
    group.append('polygon')
        .attr('points', points)
        .attr('class', 'triangle');
}

var translatorScale = d3.scaleLinear().range(['translate(0,10)', 'translate(450,10)']).domain([0, shapes.length - 1]);

setupSvg();
shapes.forEach(function (shape, index) {
    shape(appendGroup(translatorScale(index)));
});