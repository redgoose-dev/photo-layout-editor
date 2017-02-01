import { visible } from '../actions/side';


export default function(root) {

	/**
	 * Toggle side
	 *
	 * @param {Boolean} sw
	 */
	this.toggleSide = (sw) => {
		const { getState, dispatch } = root.store.side;
		const currentSw = getState().layout.visible;
		const targetSw = (typeof sw === 'undefined') ? !currentSw : sw;
		const $el = $(root.el.app);
		const className = 'side-active';

		if (targetSw)
		{
			$el.addClass(className);
		}
		else
		{
			$el.removeClass(className);
		}

		dispatch(visible(targetSw));
	}

}