/**
 * Random item in range
 *
 * @param {int} min
 * @param {int} max
 * @returns {number}
 */
function getRandomRange(min, max)
{
	max += 1;
	return Math.floor(Math.random() * (max - min) + min);
}

/**
 * is touch device
 *
 * @returns {boolean}
 */
function isTouchDevice()
{
	return (
		('ontouchstart' in window) ||
		(navigator.MaxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0)
	);
}

/**
 * Make props
 *
 * @param {Object} props
 * @param {Object} addProps
 */
function makeProps(props, addProps)
{
	const { root, dispatch } = props;
	return Object.assign({}, {
		root,
		dispatch,
	}, addProps);
}


export default {
	getRandomRange,
	isTouchDevice,
	makeProps,
};