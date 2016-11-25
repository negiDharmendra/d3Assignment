const WIDTH = 1200;
const HEIGHT = 600;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - (MARGIN * 4);
const INNER_HEIGHT = HEIGHT - (MARGIN * 2);
var numbers = [12, 22, 53, 64, 15, 69, 100, 22, 12, 60, 30, 40];

var xScale = d3.scaleBand().range([0, INNER_WIDTH]).domain(numbers).padding(10);
var sumOfNumbers = d3.sum(numbers, function (d) {
    return d
});

var yScale = d3.scaleLinear().range([INNER_HEIGHT, 0]).domain([0, sumOfNumbers]);

var colors = d3.scaleOrdinal(d3.schemeCategory20);

function createCheckBox() {
    var allMethod = ['Min', 'Max', 'Extent', 'Sum', 'Mean', 'Median', 'Quantile', 'Variance', 'Deviation', 'Scan', 'Bisect', 'Bisector', 'Ascending', 'Descending'];

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

function resetCheckBox(){
    $('.check-box input').attr('checked',false);
}


function setUpSvg() {
    document.querySelector('.numbers-input input').value = numbers.join(' ');
    var svg = d3.select('.d3ArraysStatisticalMethods').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .style('border', 'solid 1px lightgray')
        .append('g')
        .attr('class', 'main-group')
        .attr('transform', 'translate(' + (MARGIN * 2) + ',' + MARGIN + ')');
    return svg;
}

function defineDomain(numbers) {
    var sum = d3.sum(numbers, function (num) {
        return num;
    });
    xScale.domain(numbers.concat([sum]));
    yScale.domain([0, sum]);
}

function createAxis() {
    var xAxisG = d3.select('.main-group').append('g').attr('class', 'axis').attr('transform', 'translate(0,' + INNER_HEIGHT + ')');
    var yAxisG = d3.select('.main-group').append('g').attr('class', 'axis');
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale).ticks(20).tickSizeInner(-INNER_WIDTH);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
    xAxisG.selectAll('text').remove();
}

function d3UsageArraysStatisticalMethods(data, text) {

    var group = d3.select('.main-group');

    group.selectAll('rect').data(data).enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', 30)
    group.selectAll('rect')
        .attr('height', function (d) {
            return INNER_HEIGHT - yScale(d);
        })
        .attr('x', xScale)
        .attr('y', yScale)
        .attr('fill', 'steelblue');

    group.selectAll('rect').exit().remove();
}


function drawLine(data, color, className) {
    var line = d3.line()
        .x(function (d) {
            return d.x
        })
        .y(function (d) {
            return yScale(d.y)
        });

    var lineGroup = d3.select('.main-group').append('g').attr('class', 'lines').classed(className, true);
    lineGroup.append('path')
        .attr('d', line(data))
        .attr('stroke', color)
        .attr('stroke-width', 2)
}


function getInputNumbers() {
    var numbers = document.querySelector('.numbers-input input').value.trim().split(/\s+/);
    numbers = numbers.map(function (num) {
        return Number(num);
    });
    return numbers;
}


function drawVariance(numbers) {
    var SUB_HEIGHT = 300;
    var SUB_WIDTH = 500;
    var MARGIN = 30;
    var INNER_SUB_WIDTH = SUB_WIDTH - MARGIN * 2;
    var INNER_SUB_HEIGHT = SUB_HEIGHT - MARGIN * 2;

    var variance = d3.variance(numbers, function (d) {
        return d
    });
    var xSubScale = d3.scaleBand().range([0, INNER_SUB_WIDTH]).domain(numbers);
    var ySubScale = d3.scaleLinear().range([INNER_SUB_HEIGHT, 0]).domain([0, variance]);

    var xSubAxis = d3.axisBottom(xSubScale);
    var ySubAxis = d3.axisLeft(ySubScale).ticks(20);

    var subGraph = d3.select('.main-group').append('g').attr('class', 'sub-graph');
    subGraph.append('rect').attr('width', SUB_WIDTH).attr('transform', 'translate(' + (INNER_WIDTH - SUB_WIDTH - MARGIN) + ')').attr('height', SUB_HEIGHT).attr('fill', 'rgba(128, 128, 128, 0.34)');

    var group = subGraph.append('g').attr('transform', 'translate(' + (INNER_WIDTH - SUB_WIDTH) + ',30)');

    var xSubAxisG = group.append('g').attr('class', 'axis').attr('transform', 'translate(0,' + INNER_SUB_HEIGHT + ')');
    var ySubAxisG = group.append('g').attr('class', 'axis');

    xSubAxisG.call(xSubAxis).selectAll('text').remove();
    ySubAxisG.call(ySubAxis)
    group.selectAll('rect').data(numbers).enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', 10)
    group.selectAll('rect')
        .attr('height', function (d) {
            return INNER_SUB_HEIGHT - ySubScale(d);
        })
        .attr('x', xSubScale)
        .attr('y', ySubScale)
        .attr('fill', 'steelblue');

    group.selectAll('rect').exit().remove();


    var line = d3.line()
        .x(function (d) {
            return d.x
        })
        .y(function (d) {
            return ySubScale(d.y)
        });

    var value = d3.select('#variance').attr('name');

    var data = [{x: 0, y: variance}, {x: INNER_SUB_WIDTH, y: variance}];

    var lineGroup = group.append('g').attr('class', 'lines').classed(value, true);
    lineGroup.append('path')
        .attr('d', line(data))
        .attr('stroke', value)
        .attr('stroke-width', 2)

}

function d3Variance(numbers) {
    if (!$('#variance').is(':checked')) {
        $('#variance').attr('checked', false)
        d3.select('.sub-graph').remove();
    }
    else
        drawVariance(numbers);
}

function quantile(numbers) {
    var quantile = +document.querySelector('.quantile-input input').value;
    return d3.quantile(numbers, quantile);
}


function d3Scan(numbers) {
    var retVal = prompt("Enter your name : ", "your name here");

}
var allMethods = {
    min: d3.min,
    max: d3.max,
    extent: d3.extent,
    sum: d3.sum,
    mean: d3.mean,
    median: d3.median,
    quantile: quantile,
    variance: d3Variance,
    deviation: d3.deviation,
};

function reset() {
    d3.selectAll('.d3ArraysStatisticalMethods svg .lines').remove()
    d3.selectAll('.axis').remove()
    d3.selectAll('.sub-graph').remove()
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
        if (isChecked && id !== 'variance')
            drawLine(cords, color, id);
        else
            d3.select('g .' + id).remove();
    })
}
createCheckBox();
setUpSvg();
createAxis();
d3UsageArraysStatisticalMethods(numbers)
function setData() {
    reset();
    resetCheckBox();
    numbers = getInputNumbers();
    defineDomain(numbers);
    createAxis();
    d3UsageArraysStatisticalMethods(numbers)
}