import {
	GRID_ADD_BLOCK,
	GRID_SHUFFLE_BLOCKS,
	GRID_UPDATE_BLOCKS,
	GRID_SETTING_UPDATE,
	GRID_ACTIVE_BLOCK,
} from './types';


export function addBlock(value)
{
	return {
		type: GRID_ADD_BLOCK,
		value: value,
	};
}

export function shuffleBlocks()
{
	return {
		type: GRID_SHUFFLE_BLOCKS,
	}
}

export function updateBlocks(blocks)
{
	return {
		type: GRID_UPDATE_BLOCKS,
		value: blocks,
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