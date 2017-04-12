/**
 * Random range
 * min~max 사이의 랜덤 정수를 반환한다.
 *
 * @param {Number} min
 * @param {Number} max
 * @param {Boolean} useDecimal
 * @return {Number}
 */
export function randomRange(min, max, useDecimal=false)
{
	if (useDecimal)
	{
		return Math.random() * (max - min) + min;
	}
	else
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}