var Recaptcha = require('recaptcha-verify');
var configr = require('../lib/configr');
var recaptcha = new Recaptcha({
    secret: configr.config.secret,
    verbose: true
});

exports.onRequest = function (req, res, db) {
    var userResponse = req.query['g-recaptcha-response'];
    
    recaptcha.checkResponse(userResponse, function (error, response) {
        if (error) {
            // an internal error? 
            res.writeHead(400);
            res.end(error.toString());
            return;
        }
 
        if (response.success) {
            // save session.. create user.. save form data.. render page, return json.. etc. 
			if (req.query.address == null) {
				res.writeHead(500);
				res.end("You didn't supply an address.");
			} else if (db.addresses[req.query.address] == null) {
				res.writeHead(500);
				res.end("Address was not found.");
			} else {
				console.log("Test 1");
				var txHistTo = db.addresses[req.query.address].transactions;
				console.log("Test 2");
				db.transactions[db.transactions.length] = {
					to: req.query.address,
					from: "9999999999999999",
					amount: 25,
					timestamp: Date.now()
				}
				console.log("Test 3");
				txHistTo[txHistTo.length] = {
					to: req.query.address,
					from: "9999999999999999",
					amount: 25,
					timestamp: Date.now()
				}
				console.log("Test 4");
				db.addresses[req.query.address].balance = db.addresses[req.query.address].balance + Number(25);
				console.log("Test 5");
				res.writeHead(200);
				res.end("Success. +25 LBC");
				console.log("Faucet +25 LBC to "+req.query.address);
			}
        } else {
            // show warning, render page, return a json, etc. 
            res.writeHead(200);
            res.end("Your query was denied. <a href=\"main.html\">Try again.</a>");
			return;
        }
    });
};