module.exports = {

	/**
	 * Random item in range
	 * @param {int} min
	 * @param {int} max
	 * @returns {number}
	 */
	getRandomRange : function(min, max)
	{
		max += 1;
		return Math.floor(Math.random() * (max - min) + min);
	}
};