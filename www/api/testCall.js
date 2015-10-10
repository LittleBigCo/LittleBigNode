exports.onRequest = function(req, res, db){
	console.log("ECHO "+req.url);
	res.writeHead(200);
	res.end("ECHO "+req.url);
}

exports.onLoad = function() {
	console.log("testCall.js loaded!");
}