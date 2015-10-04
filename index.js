var fs = require('fs');
var http = require('http');
var url = require('url') ;

http.createServer(function (req, res) {
	var queryObject = url.parse(req.url,true).query;
	console.log(req.url);
	console.log(queryObject);
	res.writeHead(200);
	res.end('Hello from Node.js! //LittleBigNode');
}).listen(80);