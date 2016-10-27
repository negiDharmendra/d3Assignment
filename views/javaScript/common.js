const WIDTH = 1200;
const HEIGHT = 600;
const MARGIN = {TOP: 30, BOTTOM: 30, RIGHT: 30, LEFT: 30};
const innerWidth = WIDTH - MARGIN.LEFT - MARGIN.RIGHT;
const innerHeight = HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

var xScale = d3.scaleLinear().rangeRound([0, innerWidth], .5).domain([0, 10]);
var yScale = d3.scaleLinear().range([innerHeight, 0]).domain([0, 100]);

var svg = d3.select('.chart').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .classed('svg', true);

var mainGroup = svg.append('g')
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    .attr('transform', 'translate(' + MARGIN.LEFT + ',' + MARGIN.TOP + ')');


var xAxisG = mainGroup.append('g')
    .attr('transform', 'translate(0,' + innerHeight + ')');
var yAxisG = mainGroup.append('g');


var yAxis = d3.axisLeft(yScale)
    .ticks(10)
    .tickSize(5)
    .tickSizeInner(-innerWidth);


var xAxis = d3.axisBottom(xScale)
    .ticks(10)
    .tickSizeInner(-innerHeight);

xAxisG.call(xAxis)
    .selectAll('text')
    .attr('y', 10);

yAxisG.call(yAxis)
    .selectAll('text')
    .attr('x', -10);