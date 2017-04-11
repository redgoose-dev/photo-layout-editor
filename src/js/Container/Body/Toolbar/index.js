import React from 'react';
import { connect } from 'react-redux';
import ColorPicker from 'react-simple-colorpicker';

import { randomRange } from '../../../lib/number';
import { rgbToHex } from '../../../lib/color';
import { findObjectValueInArray } from '../../../lib/object';
import {
	addBlock,
	removeBlock,
	shuffleBlocks,
	duplicateBlock,
	updateSetting,
	changeColorBlock
} from '../../../actions/body';

import Button from './Button';
import EditLayoutSetting from './EditLayoutSetting';


class Toolbar extends React.Component {

	static defaultProps = {
		ple: null,
		dispatch: null,
		tree: null,
	};

	constructor(props) {
		super(props);

		this.state = {
			active: {
				setting: false,
				editBlockColor: false,
			}
		}
	}

	changeActive(keyName, userSW, event) {
		const { state } = this;
		const sw = userSW || !state.active[keyName];
		const cTarget = event ? event.currentTarget : null;

		if (sw)
		{
			$(document).on('click.pleToolbar', (e) => {
				if ($(e.target).closest('.pop').length)
				{
					return;
				}
				if (!(e.target === cTarget) && !(e.target.parentNode === cTarget))
				{
					this.changeActive(keyName, false);
				}
			});
		}
		else
		{
			$(document).off('click.pleToolbar');
		}

		this.setState({
			active: {
				...state.active,
				setting: false,
				editColor: false,
				[keyName] : sw,
			}
		});
	}

	deactivate() {
		$(document).off('click.pleToolbar');
		return new Promise((reject) => {
			this.setState({
				active: {
					setting: false,
					editColor: false,
				}
			}, reject);
		});
	}

	submitEditSetting(state) {
		this.props.dispatch(updateSetting(state));
		this.changeActive('setting', false);
		return false;
	}

	render() {
		const { state, props } = this;
		const { ple, dispatch, tree } = props;
		const { setting } = tree.body;
		const visible = tree.body.visibleToolbarButtons;
		let activeBlockColor = '#ffffff';

		if (tree.body.grid && tree.body.grid.length)
		{
			if (tree.body.activeBlock !== null)
			{
				const n = findObjectValueInArray(tree.body.grid, 'index', tree.body.activeBlock);
				activeBlockColor = (tree.body.grid[n] && tree.body.grid[n].color) ?
					tree.body.grid[n].color :
					ple.preference.body.blockColor;
			}
		}

		return (
			<nav className="ple-toolbar">
				<div className="wrap">
					{visible.setting && (
						<Button
							iconClass="ico-setting"
							className={`edit-setting ${state.active.setting ? 'active' : ''}`}
							onClick={(e) => {
								this.deactivate().then(() => this.changeActive('setting', null, e));
							}}
							title="Edit preference">
							<EditLayoutSetting
								submit={this.submitEditSetting.bind(this)}
								setting={setting}
								defaultSetting={ple.preference.body.setting}/>
						</Button>
					)}
					{visible.shuffle && (
						<Button
							iconClass="ico-arrow-random"
							onClick={() => dispatch(shuffleBlocks({
								x: tree.body.setting.column,
								y: 2,
								w: 2,
								h: 2
							}))}
							title="Shuffle block"/>
					)}
					{visible.add && (
						<Button
							iconClass="ico-plus"
							onClick={() => dispatch(addBlock({
								layout: {
									x: randomRange(0, tree.body.setting.column-1),
									y: 1,
									w: 1,
									h: 1
								},
							}))}
							title="Add block"/>
					)}
					{visible.edit && (
						<Button
							iconClass="ico-pencel"
							className="key"
							onClick={() => { console.log('click button'); }}
							title="Edit block"/>
					)}
					{visible.removeImage && (
						<Button
							iconClass="ico-empty"
							className="key"
							onClick={() => { console.log('click button'); }}
							title="Remove image in block"/>
					)}
					{visible.duplicate && (
						<Button
							iconClass="ico-duplicate"
							className="key"
							onClick={() => {
								if (tree.body.activeBlock === null)
								{
									alert('Not found select block');
									return;
								}
								dispatch(duplicateBlock(tree.body.activeBlock));
							}}
							title="Duplicate block"/>
					)}
					{visible.removeBlock && (
						<Button
							iconClass="ico-trash"
							className="key"
							onClick={() => {
								if (tree.body.activeBlock === null)
								{
									alert('Not found select block');
									return;
								}
								dispatch(removeBlock([tree.body.activeBlock]));
							}}
							title="Remove block"/>
					)}
					{visible.editColor && (
						<Button
							iconClass="ico-palette"
							className={`edit-color key ${state.active.editColor ? 'active' : ''}`}
							onClick={(e) => {
								this.deactivate().then(() => this.changeActive('editColor', null, e));
							}}
							title="Change color">
							<ColorPicker
								onChange={(color) => {
									color = rgbToHex(color);
									if (color)
									{
										dispatch(changeColorBlock(tree.body.activeBlock, color));
									}
								}}
								color={activeBlockColor}/>
						</Button>
					)}
				</div>
			</nav>
		);
	}

}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Toolbar);