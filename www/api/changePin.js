var url = require('url');

exports.onRequest = function(req, res, db){
	var query = url.parse(req.url, true).query;
	if (query.address == null || query.oldPin == null || query.newPin == null) {
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
	} else if (query.newPin.length < 4 || query.newPin.length > 64 || query.oldPin.length > 64 || query.oldPin.length < 4) {
		res.writeHead(200);
		res.end("INVALID_PIN_LENGTH");
		return;
	} else if (query.oldPin != db.addresses[query.address].pin) {
		res.writeHead(200);
		res.end("INCORRECT_PIN");
		return;
	} else {
		db.addresses[query.address].pin = query.newPin;
		res.writeHead(200);
		res.end("SUCCESS_PIN_CHANGED");
		return;
	}
}