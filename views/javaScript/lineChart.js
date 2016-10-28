var line = d3.line()
    .x(function (d, i) {
        return xScale(i)
    })
    .y(yScale)
     .curve(d3.curveBasis);

var dataGroup;

function createChart() {
    mainGroup.append('clipPath').attr('id', 'clip')
        .append('rect').attr('width', innerWidth-MARGIN.LEFT).attr('height', innerHeight);
    dataGroup = mainGroup.append('g').classed('line-data-group', true)
        .attr('clip-path', 'url(#clip)');
    dataGroup
        .append('path').datum(data)
        .classed('line-chart', true);

    setInterval(updateChart, 850);
}


function updateChart() {
    data.push(_.random(START, END));
    dataGroup.selectAll('path')
        .attr('d', line(data))
        .attr('transform', null)
        .transition()
        .duration(790)
        .ease(d3.easeLinear)
        .attr('transform', 'translate(' + xScale(-1) + ')');
    data.shift();
}

$(window).ready(createChart);