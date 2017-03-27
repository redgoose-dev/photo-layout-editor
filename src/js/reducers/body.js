import { combineReducers } from 'redux';
import { UPDATE_BODY } from '../actions/types';


const defaultSetting = {
	width: 100,
	height: 100,
	maxColumn: 5,
	maxScale: 2,
	outerMargin: 10,
	innerMargin: 10,
};
const defaultBlockColor = '#ff0000';


function setting(state=defaultSetting, action)
{
	return state;
}

function defaultColor(state=defaultBlockColor, action)
{
	return state;
}


export default combineReducers({
	setting,
	defaultColor,
});