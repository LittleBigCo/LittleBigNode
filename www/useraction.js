var url = require("url");

exports.onRequest = function(req, res) {
  var query = url.parse(req.url, true).query;
  if (query.action == null) {
    res.writeHead(500);
    res.end("You must include an action in the GET request!");
  } else {
    switch (query.action) {
      case "test":
        res.writeHead(200);
        res.end("Hello Tester!");
        break;
    }
  }
}
