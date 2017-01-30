import { combineReducers } from 'redux';
import { UPDATE_BODY } from '../actions/types';


const initialEnv = {
	settings: {
		width: 100,
		height: 100,
		maxColumn: 5,
		maxScale: 2,
		outerMargin: 10,
		innerMargin: 10,
	},
	blockColor: '#f00',
};


function env(state=initialEnv, action)
{
	switch (action.type) {
		case UPDATE_BODY:
			return Object.assign({}, state, action.values);
			break;

		default:
			return state;
	}
}


export default combineReducers({
	env,
});