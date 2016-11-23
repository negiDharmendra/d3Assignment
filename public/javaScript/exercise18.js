const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - (MARGIN * 2);
const INNER_HEIGHT = HEIGHT - (MARGIN * 2);
var numbers = [12, 22, 53, 64, 15, 69, 100, 22, 12, 60, 30, 40];
var xScale = d3.scaleBand().range([0, INNER_WIDTH]).domain(numbers);
var yScale = d3.scaleLinear().range([INNER_HEIGHT, 0]).domain([0, d3.sum(numbers, function (d) {
    return d
})]);

var colors = d3.scaleOrdinal(d3.schemeCategory20);

function createButton() {
    var allMethod = ['Min', 'Max', 'Extent', 'Sum', 'Mean', 'Median', 'Quantile', 'Variance', 'Deviation'];

    allMethod.forEach(function (element) {
        var color = colors(element);
        var div = document.createElement('div');
        $(div).attr('class', 'check-box');
        $(div).css('background', color);

        var input = document.createElement('input');
        $(input).attr('id', element.toLowerCase());
        $(input).attr('type', 'checkbox');
        $(input).attr('name', color);
        $(input).attr('onclick', 'myFunction(this)');

        var span = document.createElement('span');
        $(span).attr('class', 'label');
        $(span).append(document.createTextNode(element));

        $(div).append(input);
        $(div).append(span);
        $('.all-method').append(div);
    });
}


function setUpSvg() {
    document.querySelector('.numbers-input input').value = numbers.join(' ');
    var svg = d3.select('.d3ArraysStatisticalMethods').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .style('border', 'solid 1px lightgray')
        .append('g')
        .attr('class', 'main-group')
        .attr('transform', 'translate(' + MARGIN + ',' + MARGIN + ')');
    return svg;
}

function defineDomain(numbers) {
    var sum = numbers.reduce(function (prev, val) {
        return Number(prev) + Number(val);
    });
    xScale.domain(numbers.concat([sum]));
    yScale.domain([0, sum]);
}

function createAxis() {
    var xAxisG = d3.select('.main-group').append('g').attr('class', 'axis').attr('transform', 'translate(0,' + INNER_HEIGHT + ')');
    var yAxisG = d3.select('.main-group').append('g').attr('class', 'axis');
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
}

function d3UsageArraysStatisticalMethods(data, text) {

    var group = d3.select('.main-group');

    group.selectAll('rect').data(data).enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', 30)
        .attr('height', function (d) {
            return INNER_HEIGHT - yScale(d);
        })
        .attr('x', xScale)
        .attr('y', yScale)
        .attr('fill', 'steelblue');

    group.selectAll('rect').exit().remove();
}


function drawLine(data, color,className) {
    var line = d3.line()
        .x(function (d) {
            return d.x
        })
        .y(function (d) {
            return yScale(d.y)
        });

    var lineGroup = d3.select('.main-group').append('g').attr('class', 'lines');
    lineGroup.append('path')
        .attr('d', line(data))
        .attr('class',className)
        .attr('stroke', color)
        .attr('stroke-width', 2)
}

function quantile(numbers) {
    var quantile = +document.querySelector('.quantile-input input').value;
    return d3.quantile(numbers, quantile);
}

function getInputNumbers() {
    var numbers = document.querySelector('.numbers-input input').value.trim().split(/\s+/);
    numbers = numbers.map(function (num) {
        return Number(num);
    });
    return numbers;
}

var allMethods = {
    min: d3.min,
    max: d3.max,
    extent: d3.extent,
    sum: d3.sum,
    mean: d3.mean,
    median: d3.median,
    quantile: quantile,
    variance: d3.variance,
    deviation: d3.deviation
};

function reset() {
    d3.selectAll('.d3ArraysStatisticalMethods svg .lines').remove()
    d3.selectAll('.axis').remove()
}

function generateCords(selectedNumbers) {
    return selectedNumbers.map(function (num) {
        return [{x: 0, y: num}, {x: INNER_WIDTH, y: num}];
    })
}

function myFunction(element) {
    var isChecked = $(element).is(':checked');
    var color = d3.select(element).attr('name');
    var id = d3.select(element).attr('id');
    var selectedNumbers = allMethods[element.id.toLowerCase()](numbers, function (d) {
        return d;
    });
    if (!(selectedNumbers instanceof Array))
        selectedNumbers = [selectedNumbers];
    generateCords(selectedNumbers).forEach(function (cords) {
        if(isChecked)
            drawLine(cords, color,id);
        else
            d3.select('.lines .'+id).remove();
    })
}
createButton();
setUpSvg();
createAxis();
d3UsageArraysStatisticalMethods(numbers)
function setData() {
    reset();
    numbers = getInputNumbers();
    defineDomain(numbers);
    createAxis();
    d3UsageArraysStatisticalMethods(numbers)
}