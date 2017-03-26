import {
	SIDE_VISIBLE,
	ADD_FILES,
	REMOVE_FILES,
	CHANGE_ACTIVE_FILE,
	SIDE_TOGGLE,
} from './types';


// control visible side bar
export function visible(sw)
{
	return {
		type: SIDE_VISIBLE,
		value: sw,
	};
}

// toggle side bar
export function toggle()
{
	return {
		type: SIDE_TOGGLE,
	};
}

export function addFiles(files)
{
	return {
		type: ADD_FILES,
		files: files,
	};
}

export function removeFiles(ids)
{
	return {
		type: REMOVE_FILES,
		ids: ids,
	};
}

export function changeActiveFile(n, key, first)
{
	return {
		type: CHANGE_ACTIVE_FILE,
		num: n,
		keyName: key,
		firstNum: first,
	};
}