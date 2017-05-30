import React from 'react';
import { connect } from 'react-redux';

import { initPLE } from '../actions/core';

import Body from './Body';
import Side from './Side';
import Cropper from './Cropper';


class Container extends React.Component {

	componentDidMount() {
		const { props } = this;

		props.dispatch(initPLE(props.PLE));
	}

	/**
	 * Visible side panel
	 */
	visibleSide() {
		const { props } = this;

		if (!props.ple) return;

		if (props.tree.side.layout.visible)
		{
			props.ple.el.classList.add('side-active');
		}
		else
		{
			props.ple.el.classList.remove('side-active');
		}
	}

	render() {
		const { props } = this;

		// check PLE object
		if (!props.ple) return null;

		// set visible side
		this.visibleSide();

		return (
			<div className="ple-wrap">
				<Body/>
				<Side/>
				{props.tree.cropper.visible ? ( <Cropper/> ) : null}
			</div>
		);
	}

}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Container);