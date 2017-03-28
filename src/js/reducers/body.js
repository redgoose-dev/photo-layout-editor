import { combineReducers } from 'redux';
import { INIT_PLE, UPDATE_BODY } from '../actions/types';


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
		edit: true,
		removeImage: true,
		duplicate: true,
		removeBlock: true,
		editColor: true,
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
		case UPDATE_BODY:
			break;
	}
	return state;
}

function blockColor(state=defaults.blockColor, action)
{
	switch(action.type)
	{
		case INIT_PLE:
			return action.value.preference.body.blockColor || state;
			break;
	}
	return state;
}

function layout(state=[], action)
{
	switch(action.type)
	{
		case INIT_PLE:
			return action.value.preference.body.layout || state;
			break;
	}
	return state;
}

function visibleToolbar(state=defaults.visibleToolbar, action)
{
	return state;
}


export default combineReducers({
	setting,
	blockColor,
	layout,
	visibleToolbar,
});