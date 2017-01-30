/**
 * deep-assign
 *
 * https://github.com/sindresorhus/deep-assign/blob/master/index.js
 */

const isObj = function (x) {
	const type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const propIsEnumerable = Object.prototype.propertyIsEnumerable;


function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Cannot convert undefined or null to object');
	}

	return Object(val);
}


function assignKey(to, from, key) {
	const val = from[key];

	if (val === undefined || val === null) {
		return;
	}

	if (hasOwnProperty.call(to, key)) {
		if (to[key] === undefined || to[key] === null) {
			throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
		}
	}

	if (!hasOwnProperty.call(to, key) || !isObj(val)) {
		to[key] = val;
	} else {
		to[key] = assign(Object(to[key]), from[key]);
	}
}


function assign(to, from) {
	if (to === from) {
		return to;
	}

	from = Object(from);

	for (let key in from) {
		if (hasOwnProperty.call(from, key)) {
			assignKey(to, from, key);
		}
	}

	if (Object.getOwnPropertySymbols) {
		const symbols = Object.getOwnPropertySymbols(from);

		for (let i = 0; i < symbols.length; i++) {
			if (propIsEnumerable.call(from, symbols[i])) {
				assignKey(to, from, symbols[i]);
			}
		}
	}

	return to;
}


export default function(target) {
	target = toObject(target);

	for (let s = 1; s < arguments.length; s++) {
		assign(target, arguments[s]);
	}

	return target;
};