import * as actionSide from '../actions/side';


export default function Side(root)
{
	const { store } = root;
	//const { getState, dispatch } = store;

	/**
	 * Add items
	 *
	 * @param {Array} items
	 */
	this.add = (items) => {
		console.log(items);
	}

}