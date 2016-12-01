class Chart {
    constructor(chartDetails, defaultData) {
        this.defaultData = defaultData;
        this.width = chartDetails.width;
        this.height = chartDetails.height;
        this.margin = chartDetails.margin;
        this.parentElementId = chartDetails.parentElementId;
    }

    setUpSvgGroup(svgDetails) {
        this.svg = d3.select('#' + this.parentElementId).append('svg')
            .attr('class', svgDetails.svg)
            .attr('width', this.width)
            .attr('height', this.height);
        var group = this.svg.append('g')
            .classed(svgDetails.group, true);
        group.attr('transform', translateByXAndY.call(this));
    }

    initializeAxis(scales) {
        var xScale = scales.xScale(this.defaultData);
        var yScale = scales.yScale(this.defaultData);
        var xAxisG = d3.select('svg > g').append('g').classed('xAxis', true).attr('transform', translateByY.apply(this));
        var yAxisG = d3.select('svg > g').append('g').classed('yAxis', true);
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

    }
}

function calculateInnerDimension(dimension) {
    return this[dimension] - this.margin * 2;
}

function translateByXAndY() {
    return 'translate(' + calculateInnerDimension.apply(this, ['width']) + ',' + calculateInnerDimension.apply(this, ['height']) + ')';
}

function translateByY() {
    return 'translate(0,' + calculateInnerDimension.apply(this, ['height']) + ')';
}