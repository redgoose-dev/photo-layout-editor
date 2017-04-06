import {
	GRID_ADD_BLOCK,
	GRID_SHUFFLE_BLOCK,
	GRID_SETTING_UPDATE,
	GRID_ACTIVE_BLOCK
} from './types';


export function addBlock(value)
{
	return {
		type: GRID_ADD_BLOCK,
		value: value,
	};
}

export function shuffleBlock()
{
	return {
		type: GRID_SHUFFLE_BLOCK,
	}
}

export function activeBlock(index)
{
	return {
		type: GRID_ACTIVE_BLOCK,
		value: index,
	};
}

export function updateSetting(value)
{
	return {
		type: GRID_SETTING_UPDATE,
		value: value,
	};
}