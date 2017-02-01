import { combineReducers } from 'redux';
import { SIDE_VISIBLE } from '../actions/types';


const initialVisible = {
	visible: false,
};


function layout(state=initialVisible, action)
{
	switch (action.type) {
		case SIDE_VISIBLE:
			return Object.assign({}, state, {
				visible: action.value,
			});
			break;
		default:
			return state;
	}
}

function files(state=[], action)
{
	switch (action.type) {

		default:
			return state;
	}
}


const ple = combineReducers({
	layout,
	files,
});

export default ple;