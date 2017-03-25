import { combineReducers } from 'redux'

import ple from './ple';
import body from './body';
import side from './side';


export default combineReducers({
	tree: combineReducers({
		ple,
		side,
		body
	})
});