//cRand: random card number generator

exports.generateRandom = function(prefix) {
	if (prefix == null) prefix = '0000';
	var str = '';
	var pin = '';
	for (i=0;i<17;i++) {
		if ( i == 1 ) {
			str += prefix;
		} else if (i<17 && i>4) {
			str += exports.randomInt(0,9);
		}
	}
	for (v=0;v<4;v++) {
		pin += exports.randomInt(0,9);
	}
	return str+";"+pin;
}

exports.randomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}