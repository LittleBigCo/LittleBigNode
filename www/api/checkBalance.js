var url = require('url');

exports.onRequest = function(req, res, db) {
	var query = url.parse(req.url, true).query;
	if (query.address == null) {
		res.writeHead(500);
		res.end("INVALID_ARGUMENTS");
		return;
	} else if (query.address.length != 16) {
		res.writeHead(500);
		res.end("INVALID_ADDRESS");
		return;
	} else if (db.addresses[query.address] == null) {
		res.writeHead(500);
		res.end("ADDRESS_404");
		return;
	} else {
		res.writeHead(200);
		res.end(db.addresses[query.address].balance.toString());
		return;
	}
}