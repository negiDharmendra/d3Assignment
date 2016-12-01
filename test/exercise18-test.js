describe('Chart', function () {
    before(function () {
        this.chart = new Chart({width: 1200, height: 600, margin: 30, parentElementId: 'array-methods'});
        this.chart.setUpSvgGroup({svg: 'main-svg', group: 'main-group'});
    });

    describe('setup svg', function () {
        it('should create a svg element ', function () {
            var svg = getAllAttributes('main-svg');
            expect(svg.attr('width')).to.be.equal('1200');
            expect(svg.attr('height')).to.be.equal('600');
        });

        it('should create a group inside svg translated by 1140 and 540', function () {
            var svg = getAllAttributes('main-group');
            expect(svg.attr('transform')).to.be.equal('translate(1140,540)');
        });
    });

    describe('initializeAxis', function () {

    });
});

function getAllAttributes(className) {
    return d3.selectAll('.' + className);
}