import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery/dist/jquery.slim';
import ColorPicker from 'react-simple-colorpicker';

import { rgbToHex } from '../../../lib/color';
import { findObjectValueInArray } from '../../../lib/object';
import * as actionsBody from '../../../actions/body';
import * as actionsCropper from '../../../actions/cropper';

import Button from './Button';
import EditLayoutSetting from './EditLayoutSetting';


class Toolbar extends React.Component {

	static defaultProps = {
		ple: null,
		dispatch: null,
		tree: null,
	};

	constructor(props)
	{
		super(props);

		this.state = {
			active: {
				setting: false,
				editBlockColor: false,
			}
		}
	}

	changeActive(keyName, userSW, event)
	{
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

	deactivate()
	{
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

	submitEditSetting(state)
	{
		this.props.dispatch(actionsBody.updateSetting(state));
		this.changeActive('setting', false);
		return false;
	}

	_onClickEdit()
	{
		const { props } = this;
		const n = findObjectValueInArray(
			props.tree.body.grid,
			'index',
			props.tree.body.activeBlock[0]);
		const item = props.tree.body.grid[n];

		if (!item.image) return;

		let $dom = $(props.ple.el).find('.react-grid-item').filter(`[data-index=${item.index}]`);

		props.dispatch(actionsCropper.open({
			color: item.color,
			image: item.image,
			wrap: {
				top: $dom.offset().top,
				left: $dom.offset().left,
				width: $dom.width(),
				height: $dom.height(),
			},
		}));
	}

	render()
	{
		const { state, props } = this;
		const { ple, dispatch, tree } = props;
		const { setting } = tree.body;
		const visible = tree.body.visibleToolbarButtons;
		let activeBlockColor = '#ffffff';

		if (tree.body.grid && tree.body.grid.length)
		{
			if (tree.body.activeBlock && tree.body.activeBlock.length)
			{
				const n = findObjectValueInArray(tree.body.grid, 'index', tree.body.activeBlock[0]);
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
								e.persist();
								if (!state.active.setting)
								{
									this.deactivate().then(() => this.changeActive('setting', null, e));
								}
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
							onClick={() => dispatch(actionsBody.shuffleBlocks({
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
							onClick={() => dispatch(actionsBody.addBlock({
								layout: {
									//x: randomRange(0, tree.body.setting.column-1),
									x: props.tree.body.grid.length % tree.body.setting.column,
									y: Infinity,
									w: 1,
									h: 1
								},
							}))}
							title="Add block"/>
					)}
					{visible.select && (
						<Button
							iconClass="ico-select"
							onClick={() => {
								if (tree.body.activeBlock && tree.body.activeBlock.length)
								{
									dispatch(actionsBody.activeBlock(null));
									return;
								}
								let newActiveBlock = [];
								let isImage = !!(tree.body.grid[0] && tree.body.grid[0].image);
								tree.body.grid.forEach((o) => newActiveBlock.push(o.index));
								dispatch(actionsBody.activeBlock(newActiveBlock, isImage));
							}}
							title="Toggle select block"/>
					)}

					{visible.edit && (
						<Button
							iconClass="ico-pencel"
							className="key"
							onClick={this._onClickEdit.bind(this)}
							title="Edit block"/>
					)}
					{visible.removeImage && (
						<Button
							iconClass="ico-empty"
							className="key"
							onClick={() => dispatch(actionsBody.removeImages(tree.body.activeBlock))}
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
								dispatch(actionsBody.duplicateBlock(tree.body.activeBlock));
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
								dispatch(actionsBody.removeBlock(tree.body.activeBlock));
							}}
							title="Remove block"/>
					)}
					{visible.editColor && (
						<Button
							iconClass="ico-palette"
							className={`edit-color key ${state.active.editColor ? 'active' : ''}`}
							onClick={(e) => {
								e.persist();
								if (!state.active.editColor)
								{
									this.deactivate().then(() => this.changeActive('editColor', null, e));
								}
							}}
							title="Change color">
							<ColorPicker
								onChange={(color) => {
									color = rgbToHex(color);
									if (color)
									{
										dispatch(actionsBody.changeColorBlock(tree.body.activeBlock, color));
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