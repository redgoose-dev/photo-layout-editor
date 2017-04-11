import {
	GRID_ADD_BLOCK,
	GRID_REMOVE_BLOCK,
	GRID_SHUFFLE_BLOCKS,
	GRID_DUPLICATE_BLOCK,
	GRID_UPDATE_BLOCKS,
	GRID_SETTING_UPDATE,
	GRID_ACTIVE_BLOCK,
	GRID_CHANGE_COLOR,
} from './types';


export function addBlock(value)
{
	return {
		type: GRID_ADD_BLOCK,
		value: value,
	};
}

export function removeBlock(index) {
	return {
		type: GRID_REMOVE_BLOCK,
		index,
	};
}

export function shuffleBlocks(options)
{
	return {
		type: GRID_SHUFFLE_BLOCKS,
		value: options,
	}
}

export function duplicateBlock(index)
{
	return {
		type: GRID_DUPLICATE_BLOCK,
		index,
	};
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

export function changeColorBlock(item, color)
{
	return {
		type: GRID_CHANGE_COLOR,
		item,
		color,
	}
}

export function updateSetting(value)
{
	return {
		type: GRID_SETTING_UPDATE,
		value: value,
	};
}