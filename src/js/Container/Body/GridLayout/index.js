import React from 'react';
import { connect } from 'react-redux';
import ReactGridLayout from 'ReactGridLayout';

import { activeBlock } from '../../../actions/body';


class GridLayout extends React.Component {

	static defaultProps = {
		tree: null,
		ple: null,
		dispatch: null,
	};

	_selectBlock(id) {
		this.props.dispatch(activeBlock(id));
	}

	render() {
		console.log('check render');
		const { grid, setting, activeBlock } = this.props.tree.body;
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
								style={{ background: o.color || this.props.ple.preference.body.blockColor }}>
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
	console.log('qqqq')
	return Object.assign({}, state, {});
})(GridLayout);