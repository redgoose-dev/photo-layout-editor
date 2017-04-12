import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { changeActiveFile, addFiles, removeFiles, toggle } from '../../actions/side';
import * as uploader from '../../lib/uploader';

import ToggleButton from './ToggleButton';
import Navigation from './Navigation';
import Items from './Items';

let firstSelectIdx = null;


class Side extends React.Component {

	static defaultProps = {
		tree: {}, // reduce data
		ple: null, // root object
		dispatch: null, // redux dispatch
	};

	constructor(props) {
		super(props);

		this.state = {
			uploading: false,
			itemProgress: null,
		};
	}

	componentDidMount() {
		const { ple } = this.props;
		this.getItems(ple.preference.side.items);
	}

	/**
	 * Get items
	 *
	 * @param {Array|String} items
	 */
	getItems(items) {
		const { dispatch } = this.props;

		if (typeof items === 'string')
		{
			axios.get(items)
				.then( (res) => dispatch(addFiles(res.data)) )
				.catch( (error) => console.log('ERROR', error) );
		}
		else if (items instanceof Array)
		{
			dispatch(addFiles(items));
		}
	}

	/**
	 * On select item
	 *
	 * @param {Object} id
	 */
	_selectItem(id) {
		const { dispatch, ple, tree } = this.props;
		const { keyName } = ple.keyboard;

		if (keyName !== 'shift')
		{
			let currentItem = null;
			tree.side.files.forEach((o) => {
				if (o.id === id)
				{
					currentItem = o;
					return false;
				}
			});
			firstSelectIdx = (currentItem.active === true) ? null : id;
		}

		dispatch(changeActiveFile(id, keyName, firstSelectIdx));
	}

	/**
	 * Remove items
	 */
	_removeItems() {
		const { tree, dispatch } = this.props;
		let activeItems = [];

		if (!tree.side.files.length) return;

		tree.side.files.forEach(o => {
			if (o.active) activeItems.push(o.id);
		});

		if (!activeItems.length)
		{
			if (confirm('모두 지울까요?'))
			{
				tree.side.files.forEach(o => {
					activeItems.push(o.id);
				});
			}
		}

		dispatch(removeFiles(activeItems));
	}

	/**
	 * toggle select all items
	 */
	_toggleSelect() {
		const { tree, dispatch } = this.props;
		let active = false;

		tree.side.files.some((o) => {
			if (o.active) active = true;
			return o.active;
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

	_upload(files) {
		if (this.state.uploading) return;

		const { ple, dispatch } = this.props;

		this.setState({ uploading: true }, () => {
			uploader.multiple(files, ple.preference.side.upload)
				.done(() => {
					console.log('upload complete');
					this.uploading = false;
					this.setState({ uploading: false });
				})
				.progress((state, res) => {
					switch(state)
					{
						case 'start':
							this.setState({ itemProgress: 0 });
							break;
						case 'progress':
							const percent = parseInt((res.loaded / res.total * 100));
							this.setState({ itemProgress: percent });
							break;
						case 'done':
							this.setState({ itemProgress: null });
							if (res.src) dispatch(addFiles([res.src]));
							break;
					}
				})
				.fail(() => {
					console.log('upload fail');
					this.setState({ uploading: false });
				});
		});
	}

	render() {
		const { tree, dispatch } = this.props;

		return (
			<aside className="ple-side">
				<div className={`wrap ${tree.side.layout.visible ? 'show' : ''}`}>
					<span
						onClick={() => dispatch(changeActiveFile(null, 'none', null))}
						className="background"/>
					<ToggleButton
						show={tree.side.layout.visible}
						onClick={() => dispatch(toggle())}/>
					<Navigation
						attach={() => {
							console.log('attach files');
						}}
						toggleSelect={this._toggleSelect.bind(this)}
						upload={this._upload.bind(this)}
						remove={this._removeItems.bind(this)}/>
					<Items
						files={tree.side.files}
						select={this._selectItem.bind(this)}
					   progress={this.state.itemProgress}
					/>
				</div>
			</aside>
		);
	}
}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Side);