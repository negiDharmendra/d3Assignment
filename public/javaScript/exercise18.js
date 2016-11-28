const WIDTH = 1200;
const HEIGHT = 500;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - (MARGIN * 4);
const INNER_HEIGHT = HEIGHT - (MARGIN * 2);
var numbers = [12, 22, 53, 64, 15, 69, 22, 60, 30, 40];

var xScale = d3.scaleBand().range([0, INNER_WIDTH]).domain(numbers).padding(10);
var yScale = d3.scaleLinear().range([INNER_HEIGHT, 0]).domain([0, d3.max(numbers, function (d) {
    return d
})]);

var colors = d3.scaleOrdinal(d3.schemeCategory20);

function createCheckBox() {
    var allMethod = ['Min', 'Max', 'Extent', 'Sum', 'Mean', 'Median', 'Quantile', 'Variance', 'Deviation', 'Scan', 'Bisect', 'Bisector', 'Ascending', 'Descending'];
    $('.all-method').css('width',WIDTH);
    allMethod.forEach(function (element) {
        var color = colors(element);
        var div = document.createElement('div');
        $(div).attr('class', 'check-box');
        $(div).css('background', color);

        var input = document.createElement('input');
        $(input).attr('id', element.toLowerCase());
        $(input).attr('type', 'checkbox');
        $(input).attr('name', color);
        $(input).attr('onclick', 'invokeD3StaticalMethod(this)');

        var span = document.createElement('span');
        $(span).attr('class', 'label');
        $(span).append(document.createTextNode(element));

        $(div).append(input);
        $(div).append(span);
        $('.all-method').append(div);
    });
}

function resetCheckBox() {
    $('.check-box input').attr('checked', false);
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
    xScale.domain(numbers);
    yScale.domain([0, d3.max(numbers, function (d) {
        return d;
    })]);
}

function createAxis() {
    var xAxisG = d3.select('.main-group').append('g').attr('class', 'x-axis').attr('transform', 'translate(0,' + INNER_HEIGHT + ')');
    var yAxisG = d3.select('.main-group').append('g').attr('class', 'y-axis');
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale).ticks(20).tickSizeInner(-INNER_WIDTH);

    xAxisG.call(xAxis).selectAll('text').remove();
    yAxisG.call(yAxis);
}

function updateAxis() {
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale).ticks(20).tickSizeInner(-INNER_WIDTH);
    d3.selectAll('.x-axis').call(xAxis).selectAll('text').remove();
    d3.selectAll('.y-axis').call(yAxis);
}

function d3UsageArraysStatisticalMethods(data) {

    var collection = d3.select('.main-group').selectAll('rect').data(data)
        .attr('height', function (d) {
            return INNER_HEIGHT - yScale(d);
        })
        .attr('x', xScale)
        .attr('y', yScale);

    collection
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', 30)
        .attr('height', function (d) {
            return INNER_HEIGHT - yScale(d);
        })
        .attr('x', xScale)
        .attr('y', yScale)
        .attr('fill', 'steelblue')

    collection.exit().remove();
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


function setUpSubGraphScaleAndAxis(INNER_SUB_WIDTH, numbers, INNER_SUB_HEIGHT, variance, subGraph, SUB_WIDTH) {
    var xSubScale = d3.scaleBand().range([0, INNER_SUB_WIDTH]).domain(numbers);
    var ySubScale = d3.scaleLinear().range([INNER_SUB_HEIGHT, 0]).domain([0, variance]);

    var xSubAxis = d3.axisBottom(xSubScale);
    var ySubAxis = d3.axisLeft(ySubScale).ticks(20);

    var group = subGraph.append('g').attr('transform', 'translate(' + (INNER_WIDTH - SUB_WIDTH) + ',30)');

    var xSubAxisG = group.append('g').attr('class', 'axis').attr('transform', 'translate(0,' + INNER_SUB_HEIGHT + ')');
    var ySubAxisG = group.append('g').attr('class', 'axis');

    xSubAxisG.call(xSubAxis).selectAll('text').remove();
    ySubAxisG.call(ySubAxis);
    return {xSubScale: xSubScale, ySubScale: ySubScale, group: group};
}


function drawSubGraph(numbers, staticalValue) {
    var SUB_HEIGHT = 300;
    var SUB_WIDTH = 500;
    var MARGIN = 30;
    var INNER_SUB_WIDTH = SUB_WIDTH - MARGIN * 2;
    var INNER_SUB_HEIGHT = SUB_HEIGHT - MARGIN * 2;


    var subGraph = d3.select('.main-group').append('g').attr('class', 'sub-graph');
    subGraph.append('rect')
        .attr('width', SUB_WIDTH)
        .attr('transform', 'translate(' + (INNER_WIDTH - SUB_WIDTH - MARGIN) + ')')
        .attr('height', SUB_HEIGHT)
        .attr('fill', 'white');

    var __ret = setUpSubGraphScaleAndAxis(INNER_SUB_WIDTH, numbers, INNER_SUB_HEIGHT, staticalValue, subGraph, SUB_WIDTH);

    var xSubScale = __ret.xSubScale;
    var ySubScale = __ret.ySubScale;
    var group = __ret.group;
    group.selectAll('rect').data(numbers).enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', 10);
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

    var data = [{x: 0, y: staticalValue}, {x: INNER_SUB_WIDTH, y: staticalValue}];

    var lineGroup = group.append('g').attr('class', 'lines').classed(value, true);
    lineGroup.append('path')
        .attr('d', line(data))
        .attr('stroke', value)
        .attr('stroke-width', 2)

}

//==================================================D3 Statical Methods ================================================

function drawMarker(values, elementDetail) {
    generateCords(values).forEach(function (cords) {
        if (elementDetail.isChecked)
            drawLine(cords, elementDetail.color, elementDetail.id);
        else
            d3.select('g .' + elementDetail.id).remove();
    })
}

function displayPopupFor(elements, title) {
    removePopup();
    elements.forEach(function (element) {
        var newElement = d3.select('#dialog').append(element.el);
        for (var attr in element.attrs)
            newElement.attr(attr, element.attrs[attr]);
        newElement.text(element.attrs.text)
    });
    $('#dialog').attr('title', title || '')
        .dialog();
}


function d3Variance(numbers, elementDetail) {
    var variance = d3.variance(numbers, function (d) {
        return d
    });
    if (!elementDetail.isChecked) {
        d3.select('#' + elementDetail.id).attr('checked', false);
        d3.select('.sub-graph').remove();
    }
    else
        drawSubGraph(numbers, variance);
}

function d3Sum(numbers, elementDetail) {
    var sum = d3.sum(numbers, function (d) {
        return d
    });
    if (!elementDetail.isChecked) {
        d3.select('#' + elementDetail.id).attr('checked', false);
        d3.select('.sub-graph').remove();
    }
    else
        drawSubGraph(numbers, sum);
}


function d3Min(numbers, elementDetail) {
    var min = d3.min(numbers, function (d) {
        return d
    });
    drawMarker([min], elementDetail);

}


function d3Max(numbers, elementDetail) {
    var max = d3.max(numbers, function (d) {
        return d
    });
    drawMarker([max], elementDetail);

}


function d3Extent(numbers, elementDetail) {
    var extent = d3.extent(numbers, function (d) {
        return d
    });
    drawMarker(extent, elementDetail);

}


function d3Mean(numbers, elementDetail) {
    var mean = d3.mean(numbers, function (d) {
        return d
    });
    drawMarker([mean], elementDetail);

}

function d3Median(numbers, elementDetail) {
    var median = d3.median(numbers, function (d) {
        return d
    });
    drawMarker([median], elementDetail);

}

function removePopup() {
    d3.select("#dialog").selectAll("*").remove();
    $('.ui-dialog').remove();
}

function quantile(numbers, elementDetail) {

    var elements = [
        {el: 'input', attrs: {id: 'quantile-input', type: 'text'}},
        {el: 'input', attrs: {id: 'quantile-submit-button', type: 'button', value: 'Submit'}}
    ];

    var p = 0.5;
    if (elementDetail.isChecked)
        displayPopupFor(elements, 'Enter form 0 to 1');
    else {
        removePopup();
        d3.select('g .' + elementDetail.id).remove();
    }

    $('#quantile-submit-button').click(function () {
        p = $('#quantile-input').val();
        var pQuantile = d3.quantile(numbers, p);
        drawMarker([pQuantile], elementDetail);
        removePopup();
    });
}

function d3Deviation(numbers, elementDetail) {
    var deviation = d3.deviation(numbers, function (d) {
        return d
    });
    drawMarker([deviation], elementDetail);

}

function d3Scan(numbers, elementDetail) {
    var elements = [
        {el: 'input', attrs: {class: 'scan-radio-input', type: 'radio', name: 'scan-option', value: 'ascending'}},
        {el: 'span', attrs: {text: 'Ascending'}},
        {el: 'input', attrs: {class: 'scan-radio-input', type: 'radio', name: 'scan-option', value: 'descending'}},
        {el: 'span', attrs: {text: 'Descending'}},
        {el: 'input', attrs: {id: 'scan-radio-submit', type: 'button', value: 'Submit'}}
    ];

    if (elementDetail.isChecked)
        displayPopupFor(elements, 'Select a scanner method');
    else {
        removePopup();
        d3.selectAll('.bar').attr('fill', 'steelblue');
    }

    $('#scan-radio-submit').click(function () {
        var selectedScanner = d3[$('input[name=scan-option]:checked').val()];
        var index = d3.scan(numbers, selectedScanner);
        d3.selectAll('.bar').filter(function (d, i) {
            return i == index
        }).attr('fill', elementDetail.color)
        removePopup();
    });

}


function d3Bisect(numbers, elementDetail) {
    var elements = [
        {el: 'input', attrs: {id: 'bisect-input', type: 'text'}},
        {el: 'input', attrs: {id: 'bisect-submit-button', type: 'button', value: 'Submit'}}
    ];

    if (elementDetail.isChecked)
        displayPopupFor(elements, 'Enter a number');
    else {
        removePopup();
        d3.select('g .' + elementDetail.id).remove();
    }

    $('#bisect-submit-button').click(function () {
        var number = $('#bisect-input').val();
        var insertionPoint = d3.bisect(numbers, number);
        removePopup();
        var text = '<text>Insertion index for ' + number + ' is ' + insertionPoint + '</text>';
        $('#dialog').attr('title', '').append(text)
            .dialog();
    });
}


function d3Bisector(numbers, elementDetail) {
    var elements = [
        {el: 'input', attrs: {class: 'bisector-radio-input', type: 'radio', name: 'bisector-option', value: 'left'}},
        {el: 'span', attrs: {text: 'Left'}},
        {el: 'input', attrs: {class: 'bisector-radio-input', type: 'radio', name: 'bisector-option', value: 'right'}},
        {el: 'span', attrs: {text: 'Right'}},
        {el: 'br', attrs: {}},
        {el: 'input', attrs: {class: 'bisector-radio-input', type: 'text', name: 'bisect'}},
        {el: 'input', attrs: {id: 'bisector-radio-submit', type: 'button', value: 'Submit'}}
    ];

    if (elementDetail.isChecked)
        displayPopupFor(elements, 'Select a bisector');
    else {
        removePopup();
        d3.selectAll('.bar').attr('fill', 'steelblue');
    }

    $('#bisector-radio-submit').click(function () {
        var bisector = $('input[name=bisector-option]:checked').val();
        var number = $('input[name=bisect]').val();
        var bisectorFunc = d3.bisector(function (d) {
            return d
        })[bisector];
        var insertionPoint = bisectorFunc(numbers, number);
        removePopup();
        var text = '<text>Insertion index for ' + number + ' is ' + insertionPoint + '</text>';
        $('#dialog').attr('title', '').append(text)
            .dialog();
    });
}

function d3Descending(numbers, elementDetail) {
    var newNumbers = JSON.parse(JSON.stringify(numbers));
    var sortedNumber = newNumbers.sort(function (firstValue, secondValue) {
        return d3.descending(firstValue, secondValue);
    });
    if (!elementDetail.isChecked)
        sortedNumber = numbers;
    defineDomain(sortedNumber);
    updateAxis(sortedNumber);
    d3UsageArraysStatisticalMethods(sortedNumber)

}

function d3Ascending(numbers, elementDetail) {
    var newNumbers = JSON.parse(JSON.stringify(numbers));
    var sortedNumber = newNumbers.sort(function (firstValue, secondValue) {
        return d3.ascending(firstValue, secondValue);
    });
    if (!elementDetail.isChecked)
        sortedNumber = numbers;
    defineDomain(sortedNumber);
    updateAxis(sortedNumber);
    d3UsageArraysStatisticalMethods(sortedNumber);

}

var allMethods = {
    min: d3Min,
    max: d3Max,
    extent: d3Extent,
    sum: d3Sum,
    mean: d3Mean,
    median: d3Median,
    quantile: quantile,
    variance: d3Variance,
    deviation: d3Deviation,
    scan: d3Scan,
    bisect: d3Bisect,
    bisector: d3Bisector,
    ascending: d3Ascending,
    descending: d3Descending
};

//======================================================================================================================

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

function invokeD3StaticalMethod(element) {

    var elementDetails = {};
    elementDetails.isChecked = $(element).is(':checked');
    elementDetails.color = d3.select(element).attr('name');
    elementDetails.id = d3.select(element).attr('id');
    allMethods[element.id](numbers, elementDetails);

}
createCheckBox();
setUpSvg();
createAxis();
d3UsageArraysStatisticalMethods(numbers);
function setData() {
    reset();
    resetCheckBox();
    numbers = getInputNumbers();
    defineDomain(numbers);
    updateAxis(numbers);
    d3UsageArraysStatisticalMethods(numbers)
}