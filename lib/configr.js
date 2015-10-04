// SIMPLE JSON CONFIG LOADING LIBRARY
var fs = require('fs');

exports.loadConfigSync = function(filePath) {
	var conf = fs.readFileSync(filePath);
	return JSON.parse(conf);
};

exports.loadConfig = function(filePath, cb) {
	fs.readFile(filePath, function(err, data){
		cb(err, JSON.parse(data));
	});
};

exports.defaults = exports.loadConfigSync(__dirname + "/../config/default.json");