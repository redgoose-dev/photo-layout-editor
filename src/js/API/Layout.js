import { visible } from '../actions/side';


export default function Layout(root)
{
	/**
	 * Toggle side
	 *
	 * @param {Boolean} sw
	 */
	this.toggleSide = (sw) => {
		const { getState, dispatch } = root.store;

		if (!getState() || !getState().tree)
		{
			alert('error');
			return;
		}

		const currentSw = getState().tree.side.layout.visible;
		const targetSw = (typeof sw === 'undefined') ? !currentSw : sw;

		dispatch(visible(targetSw));
	}

}