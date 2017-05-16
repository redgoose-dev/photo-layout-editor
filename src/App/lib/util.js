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


/**
 * Get image size
 *
 * @param {String} src
 * @return {Promise}
 */
export function getImageSize(src)
{
	return new Promise((resolve, reject) => {
		if (!(src && typeof src === 'string')) reject();

		let img = document.createElement('img');

		img.onload = function()
		{
			resolve({
				width: img.naturalWidth,
				height: img.naturalHeight,
				ratio: img.naturalHeight / img.naturalWidth,
			});
		};

		img.onerror = function()
		{
			reject();
		};

		img.src = src;
	});
}