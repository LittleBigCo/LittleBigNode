var Recaptcha = require('recaptcha-verify');
var configr = require('../../lib/configr');
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
        } else {
            // show warning, render page, return a json, etc. 
            res.writeHead(200);
            res.end("Your query was denied. <a href=\"main.html\">Try again.</a>");
        }
    });
};