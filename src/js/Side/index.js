import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import Util from '../lib/Util';
import { visible, addFiles } from '../actions/side';
import { changeActiveFile } from '../actions/side';

import ToggleButton from './ToggleButton';
import Navigation from './Navigation';
import Items from './Items';


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
		const { root, dispatch } = this.props;
		dispatch(changeActiveFile(n, root.keyboard.keyName));
	}

	render() {
		const { root, layout, files } = this.props;

		// update root element
		this.updateRootElement(layout.visible);

		return (
			<div className={`wrap${layout.visible ? ' show' : ''}`}>
				<ToggleButton
					show={layout.visible}
					onClick={() => root.api.layout.toggleSide()}/>
				<Navigation
					upload={() => {
						console.log('on upload');
					}}
					remove={() => {
						console.log('on remove');
					}}
					toggleSelect={() => {
						console.log('on toggle select');
					}}
					attach={() => {
						console.log('on toggle select');
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