import * as actionSide from '../actions/side';


export default function Layout(root)
{
	const { getState, dispatch } = root.store;

	/**
	 * Toggle side
	 *
	 * @param {Boolean} sw
	 */
	this.toggleSide = (sw) => {
		if (!getState() || !getState().tree)
		{
			alert('error');
			return;
		}

		const currentSw = getState().tree.side.layout.visible;
		const targetSw = (typeof sw === 'undefined') ? !currentSw : sw;

		dispatch(actionSide.visible(targetSw));
	}

}