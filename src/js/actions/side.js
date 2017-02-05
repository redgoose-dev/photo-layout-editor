import {
	SIDE_VISIBLE,
	ADD_FILES,
	REMOVE_FILES,
	CHANGE_ACTIVE_FILE,
} from './types';


export function visible(sw)
{
	return {
		type: SIDE_VISIBLE,
		value: sw,
	};
}

export function addFiles(files)
{
	return {
		type: ADD_FILES,
		files: files,
	};
}

export function removeFiles(idx)
{
	return {
		type: REMOVE_FILES,
		idx: idx,
	};
}

export function changeActiveFile(n, key)
{
	return {
		type: CHANGE_ACTIVE_FILE,
		num: n,
		keyName: key,
	};
}