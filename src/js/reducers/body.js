import { combineReducers } from 'redux';
import { INIT_PLE, GRID_ADD_BLOCK } from '../actions/types';


const defaults = {
	setting: {
		width: 100,
		height: 100,
		maxColumn: 5,
		maxScale: 2,
		outerMargin: 10,
		innerMargin: 10,
	},
	visibleToolbar: {
		setting: true,
		shuffle: true,
		add: true,
		// TODO : 여기서부터 작업용으로 열어놨음
		edit: false,
		removeImage: false,
		duplicate: false,
		removeBlock: false,
		editColor: false,
	},
	blockColor: '#ff0000'
};


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
	}
	return state;
}

function layout(state=[], action)
{
	return state;
}

function visibleToolbar(state=defaults.visibleToolbar, action)
{
	return state;
}

function grid(state=[], action)
{
	switch (action.type)
	{
		case INIT_PLE:
			return action.value.preference.body.grid || state;
			break;
		case GRID_ADD_BLOCK:
			return state.concat({
				layout: action.value || { x: Infinity, y: Infinity, w: 1, h: 1 },
				color: null,
			});
			break;
	}

	return state;
}


export default combineReducers({
	setting,
	layout,
	visibleToolbar,
	grid,
});