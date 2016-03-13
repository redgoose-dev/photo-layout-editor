module.exports = {

	/**
	 * Shuffle items
	 *
	 * @param o
	 * @returns {*}
	 */
	// TODO : 인수 타입 확인해보고 주석에 있는 타입 변경하기
	shuffle : function(o)
	{
		for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	},

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