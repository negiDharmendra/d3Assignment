
class Chart {
    constructor(chartDetails,defaultData) {
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

    initializeAxis(){

    }
}

function calculateInnerDimension(dimension){
    return this[dimension] - this.margin*2;
}

function translateByXAndY() {
    return 'translate(' + calculateInnerDimension.apply(this, ['width']) + ',' + calculateInnerDimension.apply(this, ['height']) + ')';
}