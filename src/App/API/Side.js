import { addFiles } from '../actions/side';


export default function Side(root) {

	// set dispatch
	const dispatch = root.store.dispatch;

	/**
	 * Add items
	 *
	 * @param {Array} items
	 */
	this.addItems = (items) => {
		console.log(items);
	}
}