import { INIT_PLE } from '../actions/types';


function PLE(state=null, action)
{
	switch (action.type) {
		case INIT_PLE:
			return action.value;
			break;

		default:
			return state;
	}
}


export default PLE;