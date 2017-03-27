import React from 'react';
import { connect } from 'react-redux';

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
	 */
	visibleSide() {
		const { tree, ple } = this.props;

		if (!ple) return;

		if (tree.side.layout.visible)
		{
			ple.el.classList.add('side-active');
		}
		else
		{
			ple.el.classList.remove('side-active');
		}
	}

	render() {
		const { ple } = this.props;

		// check PLE object
		if (!ple) return null;

		// set visible side
		this.visibleSide();

		return (
			<div className="ple-wrap">
				<Body/>
				<Side/>
			</div>
		);
	}

}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Container);