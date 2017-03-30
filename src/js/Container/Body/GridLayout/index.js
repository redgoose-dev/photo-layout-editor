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
		const { grid, setting, activeBlock } = this.props.tree.body;
		const bodyWidth = (setting.width * setting.column) +
			(setting.innerMargin * (setting.column-1)) +
			(setting.outerMargin * 2);

		return (
			<div className="ple-grid__wrap">
				<ReactGridLayout
					autoSize={true}
					cols={setting.column}
					rowHeight={setting.height}
					width={bodyWidth}
					margin={[setting.innerMargin, setting.innerMargin]}
					containerPadding={[setting.outerMargin, setting.outerMargin]}
					verticalCompact={!setting.freeMode}
					style={{width: `${bodyWidth}px`}}
					className="ple-grid">
					{grid.map((o, k) => {
						return (
							<div
								key={k}
								data-grid={{ ...o.layout }}
								onClick={() => this._selectBlock(o.index)}
								style={{
									background: o.color || this.props.ple.preference.body.blockColor
								}}>
								<figure/>
								{k}
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