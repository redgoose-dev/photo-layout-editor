module.exports = {

	/**
	 * Random item in range
	 *
	 * @param {int} min
	 * @param {int} max
	 * @returns {number}
	 */
	getRandomRange : function(min, max)
	{
		max += 1;
		return Math.floor(Math.random() * (max - min) + min);
	},

	/**
	 * is touch device
	 *
	 * @returns {boolean}
	 */
	isTouchDevice : function ()
	{
		return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
	}
};