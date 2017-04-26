import React from 'react';
import { connect } from 'react-redux';
import ReactGridLayout from 'react-grid-layout';

import { activeBlock, updateBlocks } from '../../../actions/body';
import { findObjectValueInArray } from '../../../lib/object';


let timeStamp = [];


class GridLayout extends React.Component {

	static defaultProps = {
		tree: null,
		ple: null,
		dispatch: null,
	};

	_selectBlock(id, isImage)
	{
		this.props.dispatch(activeBlock(id, isImage));
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
					{grid.map((o, k) => {
						let key = `${o.indexPrefix}__${o.index}`;
						return (
							<div
								key={key}
								data-grid={o.layout}
								onClick={(event) => {
									event.stopPropagation();
									this._selectBlock(o.index, !!o.image);
								}}
								className={activeBlock === o.index && 'active'}
								style={{ backgroundColor: o.color || props.ple.preference.body.blockColor }}>
								{o.image && (
									<figure style={{
										backgroundImage: `url('${o.image.src}')`,
										backgroundPosition: o.image.position,
										backgroundSize: o.image.size,
									}}/>
								)}
							</div>
						);
					})}
				</ReactGridLayout>
			</div>
		);
	}

}


export default connect((state) => {
	return Object.assign({}, state, {});
})(GridLayout);