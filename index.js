var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var configr = require('./lib/configr');
var plugins = {};
var cdn = {};
var config = configr.defaults

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk(config.rootDir, function(err, files) {
	if (err) return;
	files.forEach(function(f) {
		if (fs.lstatSync(f).isDirectory()) return;
		pluginName = f.replace('.js','');
		console.log('Loading ' + pluginName + ": " + f);
		plugins[pluginName] = require("./"+f);
		//console.log(plugins[pluginName]);
		if (plugins[pluginName].onLoad != null){plugins[pluginName].onLoad();}
	});
});

walk(config.cdnDir, function(err, files) {
	if (err) return;
	files.forEach(function(f) {
		if (fs.lstatSync(f).isDirectory()) return;
		console.log('Loading ' + f);
		cdn[f] = fs.readFileSync(f);
		console.log(cdn[f]);
		//console.log(plugins[pluginName]);
	});
});

http.createServer(function (req, res) {
	var queryObject = url.parse(req.url,true).query;
	var furl = req.url.split("?")[0]
	if (furl == "/" || furl == "") {furl = "/index"}
	console.log(req.url);
	console.log(queryObject);
	if(plugins[config.rootDir+furl] != null) {
		var pluginName = config.rootDir+furl
		if (plugins[pluginName].onRequest != null) { plugins[pluginName].onRequest(req,res) };
	} else if (cdn[config.cdnDir+furl] != null) {
		res.writeHead(200);
		res.end(cdn[config.cdnDir+furl]);
	} else {
		res.writeHead(404);
		res.end("404 "+furl);
	}
}).listen(config.port);