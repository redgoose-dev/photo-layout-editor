import { combineReducers } from 'redux';
import {
	INIT_PLE,
	GRID_ADD_BLOCK,
	GRID_SHUFFLE_BLOCKS,
	GRID_UPDATE_BLOCKS,
	GRID_ACTIVE_BLOCK,
	GRID_SETTING_UPDATE,
} from '../actions/types';

import { randomRange } from '../lib/number';


const defaults = {
	setting: {
		width: 100,
		height: 100,
		maxColumn: 5,
		outerMargin: 10,
		innerMargin: 10,
	},
	visibleToolbarButtons: {
		setting: true,
		shuffle: true,
		add: true,
		// TODO : 여기서부터 작업용으로 열어놨음
		edit: false,
		removeImage: false,
		duplicate: false,
		removeBlock: false,
		editColor: false,
	}
};
let lastGridId = null;


function setting(state=defaults.setting, action)
{
	switch(action.type)
	{
		case INIT_PLE:
			return {
				...state,
				...action.value.preference.body.setting,
			};
			break;

		case GRID_SETTING_UPDATE:
			return {
				...state,
				...action.value,
			};
	}
	return state;
}

function visibleToolbarButtons(state=defaults.visibleToolbarButtons, action)
{
	return state;
}

function grid(state=[], action)
{
	switch (action.type)
	{
		case INIT_PLE:
			return (action.value.preference.body.grid || state).map((o, k) => {
				lastGridId = lastGridId === null ? 0 : lastGridId + 1;
				return {
					color: null,
					...o,
					index: lastGridId,
				};
			});

		case GRID_ADD_BLOCK:
			lastGridId = lastGridId === null ? 0 : lastGridId + 1;
			return state.concat({
				color: null,
				layout: {x: Infinity, y: Infinity, w: 1, h: 1},
				...action.value,
				index: lastGridId,
			});

		case GRID_SHUFFLE_BLOCKS:
			return state.map((o, k) => {
				o.layout = {
					x: randomRange(0, 5),
					y: randomRange(0, 5),
					w: randomRange(1, 2),
					h: randomRange(1, 2),
				};
				return o;
			});

		case GRID_UPDATE_BLOCKS:
			return action.value;
	}

	return state;
}

function activeBlock(state=null, action)
{
	switch (action.type)
	{
		case GRID_ACTIVE_BLOCK:
			return action.value;
	}

	return state;
}


export default combineReducers({
	setting,
	visibleToolbarButtons,
	grid,
	activeBlock,
});