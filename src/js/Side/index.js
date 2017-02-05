import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { visible, addFiles } from '../actions/side';
import { changeActiveFile } from '../actions/side';
//import Objects from '../lib/';

import ToggleButton from './ToggleButton';
import Navigation from './Navigation';
import Items from './Items';

let firstSelectIdx = null;


class Side extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { root, dispatch } = this.props;
		const { visible, items } = root.preference.side;

		// update visible
		root.api.layout.toggleSide(visible);

		// get items
		this.getItems(items);
	}

	/**
	 * Get items
	 *
	 * @param {Array|String} items
	 */
	getItems(items) {
		const { dispatch } = this.props;

		// get items
		if (typeof items === 'string')
		{
			// get json data
			$.get(items, (res) => {
				dispatch(addFiles(res));
			});
		}
		else if (items instanceof Array)
		{
			// get array data
			dispatch(addFiles(items));
		}
	}

	/**
	 * Update root element
	 *
	 * @param {Boolean} sw
	 */
	updateRootElement(sw) {
		const { root } = this.props;
		const $el = $(root.el.app);
		const className = 'side-active';

		// edit root element
		if (sw)
		{
			$el.addClass(className);
		}
		else
		{
			$el.removeClass(className);
		}
	}

	/**
	 * On select item
	 *
	 * @param {Number} n
	 */
	onSelectItem(n) {
		const { root, dispatch, files } = this.props;
		const { keyName } = root.keyboard;

		if (keyName !== 'shift')
		{
			let currentItem = null;
			files.forEach((o) => {
				if (o.id === n)
				{
					currentItem = o;
					return false;
				}
			});
			firstSelectIdx = (currentItem.active === true) ? null : n;
		}
		dispatch(changeActiveFile(n, keyName, firstSelectIdx));
	}

	/**
	 * Toggle select all items
	 */
	_toggleSelect() {
		const { files, dispatch } = this.props;

		let active = false;
		files.forEach((o) => {
			if (o.active) active = true;
		});
		if (active)
		{
			dispatch(changeActiveFile(null, 'none', null));
		}
		else
		{
			dispatch(changeActiveFile(null, 'all', null));
		}
	}

	render() {
		const { root, dispatch, layout, files } = this.props;

		// update root element
		this.updateRootElement(layout.visible);

		return (
			<div className={`wrap${layout.visible ? ' show' : ''}`}>
				<ToggleButton
					show={layout.visible}
					onClick={() => root.api.layout.toggleSide()}/>
				<Navigation
					attach={() => {
						console.log('attach files');
					}}
					toggleSelect={this._toggleSelect.bind(this)}
					upload={() => {
						console.log('on upload');
					}}
					remove={() => {
						console.log('on remove');
					}}
				/>
				<Items
					files={files}
					select={this.onSelectItem.bind(this)}/>
			</div>
		);
	}
}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Side);