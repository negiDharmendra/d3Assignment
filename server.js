var http = require('http');
var express = require('express');
var fs = require('fs');

var app = express();

app.set('view engine', 'jade');

app.use(express.static('./views'));

app.get('/', function (req, res) {
    res.render('randomNumLineChart')
});

app.get('/barChartWithDiv', function (req, res) {
    res.render('barChartWithDiv')
});

http.createServer(app).listen(3000, function () {
    console.log("listening at port 3000")
});
