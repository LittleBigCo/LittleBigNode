var crand = require('../../lib/crand');

exports.onLoad = function(){
	//if(ndb != null){
		//console.log("newAddress.js: NDB is required for this plugin to run.")
	//} else {
		exports.onRequest = function(req, res, db) {
			//TODO: add creating a ndb entry
			var generatedNumber = crand.generateRandom();
			var addr = generatedNumber.split(";")[0];
			var pin = generatedNumber.split(";")[1];
			if (db.addresses == null) {
				db.addresses = {};
			}
			db.addresses[addr] = {
				pin: pin,
				balance: 0
			}
			console.log("NEW "+generatedNumber);
			res.writeHead(200);
			res.end(generatedNumber);
		}
	//}
}