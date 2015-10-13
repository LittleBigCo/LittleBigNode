var url = require('url');

exports.onRequest = function(req, res, db) {
	var query = url.parse(req.url, true).query;
	query.limit = parseInt(query.limit);
	query.start = parseInt(query.start);
	
	if (query.limit == null || isNaN(query.limit) || query.limit > 100) {
		res.writeHead(200);
		res.end("INVALID_ARGUMENTS");
		return;
	} else {
		if (query.start == null || isNaN(query.start)) {
			query.start = db.transactions.length - query.limit;
		} else {
			query.start = db.transactions.length - query.start;
		}
		if (query.start < 0) { query.start = 0; }
		if (query.limit < 0) { query.limit = 0; }
		
		console.log("GET "+query.start+" TO "+query.limit);
		var txArr = (db.transactions.clone()).splice(query.start, query.limit);
		console.log(JSON.stringify(txArr));
		res.writeHead(200);
		res.end(JSON.stringify(txArr));
		return;
	}
}