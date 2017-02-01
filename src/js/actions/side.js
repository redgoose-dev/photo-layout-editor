import { SIDE_VISIBLE } from './types';


export function visible(sw)
{
	return {
		type: SIDE_VISIBLE,
		value: sw,
	};
}