import React from 'react';
import { connect } from 'react-redux';
import ReactGridLayout from 'react-grid-layout';
import classNames from 'classnames';

import { activeBlock, updateBlocks } from '../../../actions/body';
import * as lib from '../../../lib';


let timeStamp = [];


class GridLayout extends React.Component {

	static defaultProps = {
		tree: null,
		ple: null,
		dispatch: null,
	};

	constructor(props)
	{
		super(props);
	}

	_selectBlock(id, isImage)
	{
		const { props } = this;
		const { ple, tree, dispatch } = props;
		const { keyName } = ple.keyboard;

		if (id === null)
		{
			dispatch(activeBlock([], false));
			return;
		}

		switch(keyName) {
			case 'cmd':
			case 'ctrl':
			case 'shift':
				if (tree.body.activeBlock && tree.body.activeBlock.length)
				{
					let newActiveBlock = Object.assign([], tree.body.activeBlock);
					if (newActiveBlock.indexOf(id) > -1)
					{
						newActiveBlock.splice(newActiveBlock.indexOf(id), 1);
					}
					else
					{
						newActiveBlock.push(id);
					}
					dispatch(activeBlock(newActiveBlock, isImage));
				}
				else
				{
					dispatch(activeBlock([id], isImage));
				}
				break;
			default:
				dispatch(activeBlock([id], isImage));
				break;
		}
	}

	_updateBlocks(type, layout)
	{
		const { props } = this;

		switch(type) {
			case 'start':
				timeStamp[0] = new Date().getTime();
				break;
			case 'end':
				timeStamp[1] = new Date().getTime();
				if (timeStamp[1] - timeStamp[0] > 400)
				{
					let newGrid = props.tree.body.grid.map((o, k) => {
						return {
							...o,
							layout: {
								x: layout[k].x,
								y: layout[k].y,
								w: layout[k].w,
								h: layout[k].h,
							},
						};
					});
					props.dispatch(updateBlocks(newGrid));
				}
				timeStamp = [];
				break;
		}
	}

	renderItem(item, n)
	{
		const { state, props } = this;
		const { activeBlock } = props.tree.body;

		let key = `${item.indexPrefix}__${item.index}`;
		let active = !!(activeBlock && activeBlock.length && activeBlock.indexOf(item.index) > -1);

		return (
			<div
				key={key}
				data-grid={item.layout}
				data-index={item.index}
				onClick={(event) => {
					event.stopPropagation();
					this._selectBlock(item.index, !!item.image);
				}}
				style={{
					backgroundColor: item.color || props.ple.preference.body.blockColor
				}}
				className={classNames({
					'active': active
				})}>
				{item.image && (
					<figure
						style={{
							backgroundImage: `url('${item.image.src}')`,
							backgroundPosition: item.image.position,
							backgroundSize: item.image.size,
						}}/>
				)}
			</div>
		);
	}

	render()
	{
		const { props } = this;
		const { grid, setting, activeBlock } = props.tree.body;
		const bodyWidth = (setting.width * setting.column) +
			(setting.innerMargin * (setting.column-1)) +
			(setting.outerMargin * 2);

		return (
			<div className="ple-grid__wrap" onClick={() => this._selectBlock(null)}>
				<ReactGridLayout
					autoSize={true}
					cols={setting.column}
					rowHeight={setting.height}
					width={bodyWidth}
					margin={[setting.innerMargin, setting.innerMargin]}
					containerPadding={[setting.outerMargin, setting.outerMargin]}
					verticalCompact={!setting.freeMode}
					onDragStart={() => this._updateBlocks('start')}
					onDragStop={(layout) => this._updateBlocks('end', layout)}
					onResizeStart={() => this._updateBlocks('start')}
					onResizeStop={(layout) => this._updateBlocks('end', layout)}
					style={{width: `${bodyWidth}px`}}
					className="ple-grid">
					{grid.map(this.renderItem.bind(this))}
				</ReactGridLayout>
			</div>
		);
	}

}


export default connect((state) => {
	return Object.assign({}, state, {});
})(GridLayout);