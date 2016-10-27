var http = require('http');
var express = require('express');
var fs = require('fs');

var app = express();

app.set('view engine', 'jade');

app.use(express.static('./public'));

app.get('/',function(req,res){
	res.render('index')
});


app.get(/\/random\w+Chart/,function(req,res){
	console.log(req.url);
	res.render('randomNumBarChart')
});


http.createServer(app).listen(3000,function(){console.log("listening at port 3000")});
