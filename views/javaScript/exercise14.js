const WIDTH = 600;
const HEIGHT = 600;
const RADIUS = Math.min(WIDTH, HEIGHT) / 2;
const INNER_RADIUS = 0;
const INNER_WIDTH = WIDTH / 2;
const INNER_HEIGHT = HEIGHT / 2;

var data = [1, 1, 2, 2, 1, 2, 1];
var color = d3.schemeCategory20;

function setUpSvg() {
    var svg = d3.select('.pieChart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', 'translate(' + INNER_WIDTH + ',' + INNER_HEIGHT + ')');
    return svg;
}

var arc = d3.arc()
    .innerRadius(INNER_RADIUS)
    .outerRadius(RADIUS);

var pie = d3.pie()
    .value(function (d) {
        return d;
    })
    .sort(null);

function generatePieChart(svg, data) {
    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return color[i];
        });
}

function generateChartForExercise14() {
    var svg = setUpSvg();
    generatePieChart(svg, data)
}

function generateChartForExercise15() {
    var startAngleInRadian = 0;
    var endAngleInRadian = 180 * (Math.PI / 180);
    pie
        .startAngle(startAngleInRadian)
        .endAngle(endAngleInRadian);
    var svg = setUpSvg();
    generatePieChart(svg, data)
}