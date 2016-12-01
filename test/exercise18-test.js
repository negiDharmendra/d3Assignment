describe('Chart', function () {

    describe('setup svg', function () {
        beforeEach(function () {
            this.chart = new Chart({
                width: 1200,
                height: 600,
                margin: 30,
                parentElementId: 'array-methods'
            }, [1, 2, 3, 4,]);
            this.chart.setUpSvgGroup({svg: 'main-svg', group: 'main-group'});
        });
        afterEach(function () {
            d3.selectAll('.main-svg').remove();
        });
        it('should create a svg element ', function () {
            var svg = getSvgElement('main-svg');
            expect(svg.attr('width')).to.be.equal('1200');
            expect(svg.attr('height')).to.be.equal('600');
        });

        it('should create a group inside svg translated by 1140 and 540', function () {
            var svg = getSvgElement('main-group');
            expect(svg.attr('transform')).to.be.equal('translate(1140,540)');
        });
    });

    describe('initializeAxis', function () {
        beforeEach(function () {
            this.chart = new Chart({
                width: 1000,
                height: 400,
                margin: 30,
                parentElementId: 'array-methods'
            }, [1, 2, 3, 4,]);
            this.chart.setUpSvgGroup({svg: 'main-svg', group: 'main-group'});
        });
        afterEach(function () {
            d3.selectAll('.main-svg').remove();
        });
        it('should initialize axis', function () {
            var scales = {
                xScale: ()=> {
                }, yScale: ()=> {
                }
            };
            var xScale = sinon.stub(scales, 'xScale');
            var yScale = sinon.stub(scales, 'yScale');
            xScale.withArgs([1, 2, 3, 4]).returns(d3.scaleLinear().range([0, 940]).domain([0, 4]));
            yScale.withArgs([1, 2, 3, 4]).returns(d3.scaleLinear().range([340, 0]).domain([0, 4]));

            this.chart.initializeAxis(scales);
            var xAxisG = getSvgElement('main-group .xAxis');
            var xAxis = getSvgElement('main-group .xAxis path');
            var yAxisG = getSvgElement('main-group .yAxis');
            var yAxis = getSvgElement('main-group .yAxis path');

            expect(xAxisG.attr('transform')).to.be.equal('translate(0,340)');
            expect(yAxisG.attr('transform')).to.be.equal(null);
        });
    });
});

function getSvgElement(className) {
    return d3.selectAll('.' + className);
}