var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var width = d3.scaleQuantize().range([70, 150]).domain([9, 10]);
var fontSize = d3.scaleLinear().range(["italic bold 12px/30px Georgia, serif", "italic bold 120px/180px Georgia, serif"]).domain([0, 10]);
var numberCards = d3.selectAll('.numberCards').append('div').style('width', 1200).style('height', 200);

numberCards.selectAll('div').data(numbers)
    .enter()
    .append('div')
    .style('width', width)
    .attr('class', 'numberCard')
    .text(function (number) {
        return number
    })
    .style('font', fontSize);
