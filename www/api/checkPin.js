var url = require('url');

exports.onRequest = function(req, res, db){
	var query = url.parse(req.url, true).query;
	if (query.address == null || query.pin == null) {
		res.writeHead(200);
		res.end("INVALID_ARGUMENTS");
		return;
	} else if (query.address.length != 16) {
		res.writeHead(200);
		res.end("INVALID_ADDRESS");
		return;
	} else if (db.addresses[query.address] == null) {
		res.writeHead(200);
		res.end("ADDRESS_404");
		return;
	} else if (query.pin.length < 4 || query.pin.length > 64) {
		res.writeHead(200);
		res.end("INVALID_PIN_LENGTH");
		return;
	} else if (query.pin != db.addresses[query.address].pin) {
		res.writeHead(200);
		res.end("INCORRECT_PIN");
		return;
	} else {
		res.writeHead(200);
		res.end("CORRECT_PIN");
		return;
	}
}