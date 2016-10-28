var start = 10;
var end = 20;

var data = generateRandomNumber(10, start, end);

var inter

function generateRandomNumber(range, start, end) {
    var values = [];
    for (var i = 0; i < range; i++) {
        values.push(Math.round(Math.random() * 100))
    }
    return values;
}

function createElementDimension(value, multiplier = 1) {
    return (value * multiplier) + 'px';
}

function insertNewDiv(value, position) {
    $('.chart').append('<div class="bar">' + value + '</div>');
    var uniqueBarSelector = '.bar:nth-child(' + position + ')';
    $(uniqueBarSelector).css('width', createElementDimension(value, 10));
    $(uniqueBarSelector).css('height', createElementDimension(23));
}

function createBarChart(data) {
    data.forEach(function(value, index) {
        var divPosition = index + 1;
        insertNewDiv(value, divPosition);
    })
    inter = setInterval(function() {
        data.shift();
        updateBarChart(data);
    }, 1000);
}

function updateBarChart(data) {
    data.push(Math.round(Math.random() * 100));

    $('.bar:nth-child(1)').remove();
    var lastIndex = data.length - 1;
    insertNewDiv(data[lastIndex], data.length);
}

$(window).ready(function() {
    createBarChart(data)
});
