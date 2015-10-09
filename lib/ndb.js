// nDB (node DB): simple db specifically made for LBN (shhh its just json)
var fs = require('fs');

exports.loadDB = function(filename) {
	try {
		var dat = fs.readFileSync(filename);
	} catch (e) {
		console.log(filename+" does not exists. Creating...");
		fs.writeFile(filename, JSON.stringify({}));
		return JSON.stringify({});
	}
	var dat = JSON.parse(dat);
	return dat;
}

exports.saveDB = function(db, filename) {
	return fs.writeFile(filename, JSON.stringify(db));
}