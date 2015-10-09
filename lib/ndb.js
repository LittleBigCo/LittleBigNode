// nDB (node DB): simple db specifically made for LBN (shhh its just json)
var fs = require('fs');

exports.loadDB = function(filename) {
	fs.readFile(filename,function(err, dat) {
		if (err) {
			fs.writeFile(filename, "{}");
			return JSON.parse("{}");
		}
		return JSON.parse(dat);
	});
	return null;
}

exports.saveDB = function(db, filename) {
	return fs.writeFile(filename, JSON.stringify(db));
}
