/**
 * Random item in range
 *
 * @param {int} min
 * @param {int} max
 * @returns {number}
 */
export function getRandomRange(min, max)
{
	max += 1;
	return Math.floor(Math.random() * (max - min) + min);
}

/**
 * is touch device
 *
 * @returns {boolean}
 */
export function isTouchDevice()
{
	return (
		('ontouchstart' in window) ||
		(navigator.MaxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0)
	);
}


/**
 * Sleep
 *
 * @param {Number} time
 * @param {String} id
 * @return {Promise}
 */
export function sleep(time, id='pleTimer')
{
	return new Promise((resolve) => {
		window[id] = setTimeout(resolve, time);
	});
}