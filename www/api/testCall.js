exports.onRequest = function(req, res, db){
	console.log("ECHO "+req.url);
	console.log(db);
	res.writeHead(200);
	res.end(JSON.stringify(db));
}

exports.onLoad = function() {
	console.log("testCall.js loaded!");
}