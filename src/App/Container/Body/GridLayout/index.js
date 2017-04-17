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

		// TODO : 아이템을 많이 추가할때 배열이 틀어지는 현상이 보여서 layout porps를 뺐더니 셔플 기능이 꿈쩍도 않는다.
		// TODO : 셔플에 대한 해결방법을 찾아야한다.
		// TODO : 렌더는 들어오지만 ReactGridLayout 안에서 변화가 일어나지 않아 업데이트를 하지않는듯..
		// TODO : attachImages 부분에서 엘리먼트 위치가 끝에서 추가되는 현상이 일어나는데 다시 생각해보면 꼭 블럭이 만들어질 필요가 없어보인다.

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
						return (
							<div
								key={o.index}
								data-grid={{
									i: String(o.index),
									...o.layout
								}}
								onClick={(event) => {
									event.stopPropagation();
									this._selectBlock(o.index);
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
								{o.index}
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