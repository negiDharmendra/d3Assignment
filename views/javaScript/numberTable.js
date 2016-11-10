var scales = [
    {scale: d3.scaleLinear(), row: 'tHead'},
    {scale: d3.scaleLinear(), row: 'tBody'},
    {scale: d3.scalePow().exponent(2), row: 'tBody'},
    {scale: d3.scaleLog(), row: 'tBody'},
    {scale: d3.scaleLog().interpolate(d3.interpolateRound), row: 'tBody'}
];


var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var title = ['Title', 'n', 'n square', 'log(n)', 'log(n) rounded'];

var tableValuesChart = d3.selectAll('.tableChart').append('table').style('width', 1400).style('height', 250);
function displayNumber(numbers, rowNumber, scales, className) {
    const HEIGHT = 50;
    const WIDTH = 150;
    var valuesGroup = tableValuesChart.append('tr');
    numbers = [title[rowNumber]].concat(numbers);
    valuesGroup.selectAll('td').data(numbers)
        .enter().append('td')
        .style('width', WIDTH)
        .style('height', HEIGHT)
        .style('border', 2)
        .attr('class', className)
        .text(function (value) {
            return isNaN(scales(value)) ? value : scales(value);
        });

}

scales.forEach(function (value, index) {
    displayNumber(numbers, index, value.scale, value.row);
});

var newNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var width = d3.scaleQuantize().range([70, 150]).domain([9, 10]);
var fontSize = d3.scaleLinear().range(["italic bold 12px/30px Georgia, serif", "italic bold 120px/180px Georgia, serif"]).domain([0, 10]);
var numberCards = d3.selectAll('.numberCards').append('div').style('width', 1200).style('height', 200);

numberCards.selectAll('div').data(newNumbers)
    .enter()
    .append('div')
    .style('width', width)
    .attr('class', 'numberCard')
    .text(function (number) {
        return number
    })
    .style('font', fontSize);
