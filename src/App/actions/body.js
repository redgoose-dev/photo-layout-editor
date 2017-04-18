import * as types from './types';


export function addBlock(value)
{
	return {
		type: types.GRID_ADD_BLOCK,
		value: value,
	};
}

export function removeBlock(index) {
	return {
		type: types.GRID_REMOVE_BLOCK,
		index,
	};
}

export function shuffleBlocks(options)
{
	return {
		type: types.GRID_SHUFFLE_BLOCKS,
		value: options,
	}
}

export function duplicateBlock(index)
{
	return {
		type: types.GRID_DUPLICATE_BLOCK,
		index,
	};
}

export function updateBlocks(blocks)
{
	return {
		type: types.GRID_UPDATE_BLOCKS,
		value: blocks,
	}
}

export function activeBlock(index)
{
	return {
		type: types.GRID_ACTIVE_BLOCK,
		value: index,
	};
}

export function changeColorBlock(item, color)
{
	return {
		type: types.GRID_CHANGE_COLOR,
		item,
		color,
	}
}

export function updateSetting(value)
{
	return {
		type: types.GRID_SETTING_UPDATE,
		value: value,
	};
}

export function attachImages(images, cols)
{
	return {
		type: types.ATTACH_IMAGES,
		value: images,
		columns: cols,
	}
}

export function removeImages(ids)
{
	return {
		type: types.REMOVE_IMAGES,
		value: ids,
	}
}