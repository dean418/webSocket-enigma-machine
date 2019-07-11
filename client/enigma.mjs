class BiMap {
	constructor(map) {
		this.map = map;
		this.keysToValues = new Map();
		this.valuesToKeys = new Map();
		this.setValues();
	}

	setValues() {
		for (let i = 0; i < this.map.length; i++) {
			this.valuesToKeys.set(this.map[i], i);
			this.keysToValues.set(i, this.map[i]);
		}
	}

	getKeyToValue(key) {
		return this.keysToValues.get(key);
	}

	getValueToKey(value) {
		return this.valuesToKeys.get(value);
	}
}

class Rotor {
	constructor(map) {
		this.map = new BiMap(map);
		this.offset = 0;
		this.length = map.length;
	}

	tick() {
		this.offset++;
		if (this.offset === 26) {
			this.offset = 0;
		}
	}
}

class EnigmaMachine {
	constructor() {
		this.alphabet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
		this.reflectorMapping = [24, 17, 20, 7, 16, 18, 11, 3, 15, 23, 13, 6, 14, 10, 12, 8, 4, 1, 5, 25, 2, 22, 21, 9, 0, 19];
		this.rotorI = [4, 10, 12, 5, 11, 6, 3, 16, 21, 25, 13, 19, 14, 22, 24, 7, 23, 20, 18, 15, 0, 8, 1, 17, 2, 9];
		this.rotorII = [0, 9, 3, 10, 18, 8, 17, 20, 23, 1, 11, 7, 22, 19, 12, 2, 16, 6, 25, 13, 15, 24, 5, 21, 14, 4];
		this.rotor = new Rotor(this.rotorI);
		this.reflector = new Map();

		for (let i = 0; i < 26; i++) {
			this.reflector.set(i, this.reflectorMapping[i]);
		}
	}

	input(input) {
		console.log('----------------------------');
		console.log('initial input = ' + input);

		let rotorOut = this.rotor.map.getValueToKey(input);
		rotorOut += this.rotor.offset;

		if (rotorOut > 25) {
			rotorOut -= 25;
		}

		console.log('input = ' + input);
		console.log('offset = ' + (this.rotor.offset));
		console.log('rotor out = ' + rotorOut);

		let reflectorOut = this.reflector.get(rotorOut);

		console.log('reflector out = ' + reflectorOut)

		let rotorBack = this.rotor.map.getKeyToValue(reflectorOut - this.rotor.offset);

		this.rotor.tick();
		return rotorBack;
	}
}

let thing = new EnigmaMachine();

console.log(thing.input(6));
console.log(thing.input(2));
console.log(thing.input(4));
console.log(thing.input(15));
console.log(thing.input(20));