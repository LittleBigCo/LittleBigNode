// nDB (node DB): simple db specifically made for LBN (shhh its just json)
var fs = require('fs');

exports.loadDB = function(filename) {
	var dat = fs.readFileSync(filename);
	var dat = JSON.parse(dat);
	return dat;
}

exports.saveDB = function(db, filename) {
	return fs.writeFile(filename, JSON.stringify(db));
}