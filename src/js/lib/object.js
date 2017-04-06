/**
 * Shuffles array in place.
 *
 * @param {Array} input items The array containing the items.
 * @return {Array}
 */
export function shuffle(input)
{
	for (let i = input.length-1; i >=0; i--)
	{
		const randomIndex = Math.floor(Math.random()*(i+1));
		const itemAtIndex = input[randomIndex];
		input[randomIndex] = input[i];
		input[i] = itemAtIndex;
	}
	return input;
}