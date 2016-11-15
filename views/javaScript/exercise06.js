const HEIGHT = 100;
const WIDTH = 100;
const MARGIN = 50;


function setupSvg() {
    d3.select('.svgShapes').append('svg')
        .attr('width', 560)
        .attr('height', 120)
        .attr()
}


function appendGroup(translate) {
    return d3.select('svg').append('g').attr('transform', translate);
}

function createLine(group) {
    group.append('line')
        .attr('x1', 0)
        .attr('y1', HEIGHT)
        .attr('x2', WIDTH)
        .attr('y2', 0)
        .attr('fill', 'none')
        .attr('stroke', 'gray')
}

function createCircle(group) {
    group.append('circle')
        .attr('r', WIDTH / 2)
        .attr('cx', WIDTH / 2)
        .attr('cy', HEIGHT / 2);
}

function createSquare(group) {
    group.append('rect')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .attr('class', 'square')
        .attr('rx',5)
        .attr('ry',5);
}


function translateBy(count) {
    return 'translate(' + (WIDTH * count + MARGIN * count) + ',10)'
}
setupSvg();

var shapes = [createLine, createCircle, createSquare];
shapes.forEach(function (shape, index) {
    shape(appendGroup(translateBy(index)));
});

