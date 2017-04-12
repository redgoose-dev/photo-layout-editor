import React from 'react';
import { connect } from 'react-redux';
import ReactGridLayout from 'ReactGridLayout';

import { activeBlock, updateBlocks } from '../../../actions/body';
import { findObjectValueInArray } from '../../../lib/object';


let timeStamp = [];


class GridLayout extends React.Component {

	static defaultProps = {
		tree: null,
		ple: null,
		dispatch: null,
	};

	_selectBlock(id) {
		this.props.dispatch(activeBlock(id));
	}

	_updateBlocks(type, layout) {
		const { props } = this;

		switch(type) {
			case 'start':
				timeStamp[0] = new Date().getTime();
				break;
			case 'end':
				timeStamp[1] = new Date().getTime();
				if (timeStamp[1] - timeStamp[0] > 400)
				{
					let newGrid = layout.map((o, k) => {
						let n = findObjectValueInArray(props.tree.body.grid, 'index', parseInt(o.i));
						return {
							...props.tree.body.grid[n],
							layout: {
								x: o.x,
								y: o.y,
								w: o.w,
								h: o.h,
							},
						};
					});
					props.dispatch(updateBlocks(newGrid));
				}
				timeStamp = [];
				break;
		}
	}

	render() {
		const { props } = this;
		const { grid, setting, activeBlock } = props.tree.body;
		const bodyWidth = (setting.width * setting.column) +
			(setting.innerMargin * (setting.column-1)) +
			(setting.outerMargin * 2);
		const layout = grid.map((o) => {
			return { i: String(o.index), ...o.layout };
		});

		return (
			<div className="ple-grid__wrap" onClick={() => this._selectBlock(null)}>
				<ReactGridLayout
					autoSize={true}
					cols={setting.column}
					rowHeight={setting.height}
					width={bodyWidth}
					layout={layout}
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
						return (
							<div
								key={o.index}
								onClick={(event) => {
									event.stopPropagation();
									this._selectBlock(o.index);
								}}
								className={activeBlock === o.index && 'active'}
								style={{ background: o.color || props.ple.preference.body.blockColor }}>
								{o.index}
								<figure/>
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