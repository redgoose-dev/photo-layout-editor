import React, { Component } from 'react';
import { connect } from 'react-redux';

import Util from '../lib/Util';
import { visible } from '../actions/side';

import ToggleButton from './ToggleButton';
import Navigation from './Navigation';
import Items from './Items';


class Side extends Component {

	constructor(props) {
		super(props);

		this.state = {
			show: true
		};
	}

	componentDidMount() {
		const { root, dispatch } = this.props;

		// update visible
		root.api.layout.toggleSide(root.preference.side.visible);
	}

	render() {

		const { root, dispatch, layout, files } = this.props;
		const { show } = this.state;
		//const params = Util.makeProps(this.props, { files });

		return (
			<div className={`wrap${layout.visible ? ' show' : ''}`}>
				<ToggleButton
					show={layout.visible}
					onClick={() => root.api.layout.toggleSide()}/>
				<Navigation
					upload={() => {}}
					remove={() => {}}
					toggleSelect={() => {}}
					attach={() => {}}
				/>
				<Items/>
			</div>
		);
	}
}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Side);