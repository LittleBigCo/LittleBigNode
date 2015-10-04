//cRand: random card number generator

exports.generateRandom = function() {
	var str = '';
	var pin = '';
	for (i=0;i<19;i++) {
		if (i == 4 || i == 9 || i == 14) {
			num = '-';
		} else if ( i < 4 ) {
			num = 0;
		} else {
			num = exports.randomInt(0,9);
		}
		str += num
	}
	for (v=0;v<4;v++) {
		pin += exports.randomInt(0,9);
	}
	return str+";"+pin;
}

exports.randomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}