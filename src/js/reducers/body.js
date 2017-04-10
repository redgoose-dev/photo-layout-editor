import { combineReducers } from 'redux';
import {
	INIT_PLE,
	GRID_ADD_BLOCK,
	GRID_SHUFFLE_BLOCKS,
	GRID_UPDATE_BLOCKS,
	GRID_ACTIVE_BLOCK,
	GRID_SETTING_UPDATE,
	GRID_CHANGE_COLOR,
} from '../actions/types';

import { randomRange } from '../lib/number';
import { findObjectValueInArray } from '../lib/object';


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
	switch(action.type) {
		case GRID_ACTIVE_BLOCK:
			if (action.value !== null)
			{
				return {
					...state,
					edit: true,
					removeImage: true,
					duplicate: true,
					removeBlock: true,
					editColor: true,
				};
			}
			else
			{
				return {
					...state,
					edit: false,
					removeImage: false,
					duplicate: false,
					removeBlock: false,
					editColor: false,
				};
			}
			break;
	}
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
					x: randomRange(0, action.value.x - 1),
					y: randomRange(0, action.value.y - 1),
					w: randomRange(1, action.value.w),
					h: randomRange(1, action.value.h),
				};
				return o;
			});

		case GRID_CHANGE_COLOR:
			let newState = state;
			const n = findObjectValueInArray(state, 'index', action.item);
			if (newState[n]) newState[n].color = action.color;
			// TODO : 리턴을 날렸는데 렌더가 안되고 있음.
			// TODO : 아마도 변화를 감지하지 못했나본데, 답이 안나오면 grid 데이터를 object로 변경해볼까 함..
			return newState;

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