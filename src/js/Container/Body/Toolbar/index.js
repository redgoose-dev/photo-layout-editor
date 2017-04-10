import React from 'react';
import { connect } from 'react-redux';
import ColorPicker from 'react-simple-colorpicker';

import { addBlock, shuffleBlocks, updateSetting, changeColorBlock } from '../../../actions/body';
import { randomRange } from '../../../lib/number';
import { rgbToHex } from '../../../lib/color';

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
		const { active } = this.state;
		const sw = userSW || !active[keyName];
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
				...active,
				setting: false,
				editColor: false,
				[keyName] : sw,
			}
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
				activeBlockColor = tree.body.grid[tree.body.activeBlock].color || ple.preference.body.blockColor;
			}
		}

		return (
			<nav className="ple-toolbar">
				<div className="wrap">
					{visible.setting && (
						<Button
							iconClass="ico-setting"
							className={`edit-setting ${state.active.setting ? 'active' : ''}`}
							onClick={(e) => this.changeActive('setting', null, e)}
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
							onClick={() => { console.log('click button'); }}
							title="Edit block"/>
					)}
					{visible.removeImage && (
						<Button
							iconClass="ico-empty"
							onClick={() => { console.log('click button'); }}
							title="Remove image in block"/>
					)}
					{visible.duplicate && (
						<Button
							iconClass="ico-duplicate"
							onClick={() => { console.log('click button'); }}
							title="Duplicate block"/>
					)}
					{visible.removeBlock && (
						<Button
							iconClass="ico-trash"
							onClick={() => { console.log('click button'); }}
							title="Remove block"/>
					)}
					{visible.editColor && (
						<Button
							iconClass="ico-palette"
							className={`edit-color${state.active.editColor ? ' active' : ''}`}
							onClick={(e) => this.changeActive('editColor', null, e)}
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