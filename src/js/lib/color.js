/**
 * rgba to hex
 *
 * @param {String} color
 * @return {String}
 */
export function rgbToHex(color)
{
	function trim (str)
	{
		return str.replace(/^\s+|\s+$/gm,'');
	}

	let parts = color.substring(color.indexOf("(")).split(",");
	let r = parseInt(trim(parts[0].substring(1)), 10);
	let g = parseInt(trim(parts[1]), 10);
	let b = parseInt(trim(parts[2]), 10);
	let a = parseFloat(trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2);

	return (`#${r.toString(16)}${g.toString(16)}${b.toString(16)}${(a * 255).toString(16).substring(0,2)}`);
}