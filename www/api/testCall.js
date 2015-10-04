exports.onRequest = function(req,res){
	console.log("ECHO "+req.url);
	res.writeHead(200);
	res.end(req.url);
}

exports.onLoad = function() {
	console.log("testCall.js loaded!");
}