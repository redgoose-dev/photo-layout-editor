import { GRID_ADD_BLOCK } from './types';


export function addBlock(values)
{
	return {
		type: GRID_ADD_BLOCK,
		values: values,
	};
}