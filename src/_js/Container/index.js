import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { initPLE } from '../actions/core';

import Body from './Body';
import Side from './Side';


class Container extends React.Component {

	componentDidMount() {
		const { PLE, dispatch } = this.props;
		dispatch(initPLE(PLE));
	}

	/**
	 * Visible side panel
	 *
	 */
	visibleSide() {
		const { tree } = this.props;
		if (!tree.ple) return;
		const $el = $(tree.ple.el);

		if (tree.side.layout.visible)
		{
			$el.addClass('side-active');
		}
		else
		{
			$el.removeClass('side-active');
		}
	}

	render() {
		const { tree } = this.props;

		// check PLE object
		if (!tree.ple) return null;

		// set visible side
		this.visibleSide();

		return (
			<div className="ple-wrap">
				{/*<Body/>*/}
				<Side/>
			</div>
		);
	}

}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Container);