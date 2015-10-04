var crand = require('../../lib/crand');

exports.onLoad = function(){
	//if(ndb != null){
		//console.log("newAddress.js: NDB is required for this plugin to run.")
	//} else {
		exports.onRequest = function(req, res) {
			//TODO: add creating a ndb entry
			var generatedNumber = crand.generateRandom();
			console.log("NEW "+generatedNumber);
			res.writeHead(200);
			res.end(generatedNumber);
		}
	//}
}