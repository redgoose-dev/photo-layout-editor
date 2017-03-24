import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { addFiles } from '../../actions/side';
import { changeActiveFile } from '../../actions/side';
//import Objects from '../lib/';

import ToggleButton from './ToggleButton';
import Navigation from './Navigation';
import Items from './Items';

let firstSelectIdx = null;


class Side extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		try {
			this.getItems(this.props.tree.ple.preference.side.items).then();
		} catch (e) {}
	}

	aaa() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('foooo');
			}, 3000);
		})
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
			// const fo = await this.aaa();
			//const res = await $.get(items);
			// console.log('TEST', fo);

			//ple.api.side.addItems(res);
			// dispatch(addFiles(res));
		}
		else if (items instanceof Array)
		{
			// get array data
			// dispatch(addFiles(items));
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
		const { dispatch, tree } = this.props;
		const { side, ple } = tree;

		return (
			<aside className="ple-side">
				<div className={`wrap ${side.layout.visible ? 'show' : ''}`}>
					<ToggleButton
						show={side.layout.visible}
						onClick={() => ple.api.layout.toggleSide()}/>
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
						}}/>
					{/*<Items*/}
						{/*files={files}*/}
						{/*select={this.onSelectItem.bind(this)}/>*/}
				</div>
			</aside>
		);
	}
}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Side);