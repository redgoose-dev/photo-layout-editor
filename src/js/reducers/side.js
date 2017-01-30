import { combineReducers } from 'redux';


const initialBaseState = {
	foo: 'bar',
};


function base(state=initialBaseState, action)
{
	switch (action.type) {
		default:
			return state;
	}
}


const ple = combineReducers({
	base,
});

export default ple;