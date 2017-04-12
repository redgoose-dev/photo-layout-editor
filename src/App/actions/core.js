import { INIT_PLE } from './types';


export function initPLE(ple)
{
	return {
		type: INIT_PLE,
		value: ple,
	};
}