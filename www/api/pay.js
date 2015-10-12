var url = require('url')

exports.onRequest = function(req, res, db) {
	var query = url.parse(req.url, true).query;
	query.amount = parseInt(query.amount);
	
	if (query.to == null || query.from == null || query.amount == null || query.pin == null || typeof query.amount != "number") {
		res.writeHead(200);
		res.end("INVALID_ARGUMENTS");
		return;
	} else if (query.to.length != 16 || query.from.length != 16) {
		res.writeHead(200);
		res.end("INVALID_ADDRESS");
		return;
	} else if (query.pin.length < 4 || query.pin.length > 64) {
		res.writeHead(200);
		res.end("INVALID_PIN_LENGTH");
		return;
	} else if (db.addresses[query.to] == null | db.addresses[query.from] == null) {
		res.writeHead(200);
		res.end("ADDRESS_404");
		return;
	} else if (query.amount > db.addresses[query.from].balance) {
		res.writeHead(200);
		res.end("INSUFFICIENT_FUNDS");
		return;
	} else if (query.amount == 0 || query.amount < 0) {
		res.writeHead(200);
		res.end("INVALID_AMOUNT");
		return;
	} else if (db.addresses[query.from].pin != query.pin) {
		res.writeHead(200);
		res.end("INCORRECT_PIN");
		return;
	} else if (query.amount <= db.addresses[query.from].balance) {
		res.writeHead(200);
		var txHistFrom = db.addresses[query.from].transactions;
		var txHistTo = db.addresses[query.to].transactions;
		db.transactions[db.transactions.length] = {
			to: query.to,
			from: query.from,
			amount: query.amount,
			timestamp: Date.now()
		}
		txHistFrom[txHistFrom.length] = {
			to: query.to,
			from: query.from,
			amount: query.amount,
			timestamp: Date.now()
		}
		txHistTo[txHistTo.length] = {
			to: query.to,
			from: query.from,
			amount: query.amount,
			timestamp: Date.now()
		}
		db.addresses[query.from].balance = db.addresses[query.from].balance - query.amount;
		db.addresses[query.to].balance = db.addresses[query.to].balance + query.amount;
		res.end("TRANSACTION_SUCCESSFUL");
		return;
	} else {
		res.writeHead(200);
		res.end("UNKNOWN_ERROR");
		return;
	}
}
