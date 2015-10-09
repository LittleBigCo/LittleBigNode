var url = require("url");
var ndb = require("../lib/ndb.js");
var crand = require("../lib/crand.js");

exports.onRequest = function (req, res) {
    var query = url.parse(req.url, true).query;
    if (query.action == null) {
        res.writeHead(500);
        res.end("You must include an action in the GET request!");
    } else {
        switch (query.action) {
        case "test":
            var db = ndb.loadDB("config/db.json");
            if (db.addresses == null) {
                db.addresses = [];
            }
            var toGive = crand.generateRandom();
            db.addresses[db.addresses.length] = toGive;
            ndb.saveDB(db, "config/db.json", function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });
            res.writeHead(200);
            res.end("Hello Tester!\nCreated " + toGive);
            break;
        }
    }
}
