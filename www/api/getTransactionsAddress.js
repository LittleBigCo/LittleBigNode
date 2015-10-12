var url = require('url');

exports.onRequest = function(req, res, db) {
	var query = url.parse(req.url, true).query;
	
	if (query.limit == null || query.address == null || typeof query.limit != "number") {
		res.writeHead(200);
		res.end("INVALID_ARGUMENTS");
		return;
	} else if (db.addresses[query.address] == null) {
		res.writeHead(200);
		res.end("ADDRESS_404");
		return;
	} else {
		if (query.start == null || typeof query.start != "number") {
			query.start = db.addresses[query.address].transactions.length - query.limit;
		} else {
			query.start = db.addresses[query.address].transactions.length - query.start;
		}
		
		var txArr = db.addresses[query.address].transactions.splice(query.start, query.limit);
		
		res.writeHead(200);
		res.end(JSON.stringify(txArr));
		return;
	}
}