var width = 200;

var scales = {};

scales.values = d3.scaleLinear();
scales.valSquare = d3.scalePow().exponent(2);
scales.valLog = d3.scaleLog();


var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var rectPosition = d3.scaleLinear().range([50, 500]).domain([1, 10]);
var textPosition = d3.scaleLinear().range([25, 475]).domain([1, 10]);

var title = ['Title', 'N', 'N Square', 'Log N', 'Round of log N'];

var tableTitleChart = d3.selectAll('.tableChart').append('svg').style('width', 200).style('height', 600);

tableTitleChart.selectAll('rect').data(title)
    .enter().append('rect')
    .attr('width', width)
    .attr('height', 50)
    .attr('y', function (d, i) {
        return rectPosition(i);
    })
    .attr('border', 2);

tableTitleChart.selectAll('text').data(title).enter().append('text').attr('width', 200)
    .attr('width', width)
    .attr('height', 50)
    .attr('x', 10)
    .attr('y', function (d, i) {
        return textPosition(++i);
    })
    .text(function (d) {
        return d;
    });

var tableValuesChart = d3.selectAll('.tableChart').append('svg').style('width', 1400).style('height', 600);
function displayNumber(numbers, rowNumber, className, scales) {
    const HEIGHT = 50;
    const WIDTH = 140;
    var valuesGroup = tableValuesChart.append('g');
    var yScale = d3.scaleLinear().range([0, 200]).domain([0, 4]);
    var xScale = d3.scaleLinear().range([0, 1260]).domain([1,10]);
    var yScaleText = d3.scaleLinear().range([25, 225]).domain([0, 4]);
    var xScaleText = d3.scaleLinear().range([10, 1270]).domain([1, 10]);

    valuesGroup.selectAll('rect').data(numbers)
        .enter().append('rect')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .attr('border', 2)
        .attr('y', yScale(rowNumber))
        .attr('x', xScale)
        .attr('class', className)
        .attr('class', 'rect');

    valuesGroup.selectAll('text').data(numbers).enter().append('text').attr('width', 200)
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .attr('y', yScaleText(rowNumber))
        .attr('x', xScaleText)
        .text(function (d) {
            return scales(d);
        })
        .attr('class', className);
}

displayNumber(numbers, 0, 'tHead', scales.values);
displayNumber(numbers, 1, 'tBody', scales.values);
displayNumber(numbers, 2, 'tBody', scales.valSquare);
displayNumber(numbers, 3, 'tBody', scales.valLog);
displayNumber(numbers, 4, 'tBody', scales.valLog);