import React from 'react';
import { connect } from 'react-redux';
import ReactGridLayout from 'ReactGridLayout';


class GridLayout extends React.Component {

	static defaultProps = {
		tree: null,
		ple: null,
		dispatch: null,
	};

	render() {
		const { grid } = this.props.tree.body;

		return (
			<div className="ple-grid__wrap">
				<ReactGridLayout
					autoSize={true}
					cols={5}
					rowHeight={80}
					width={500}
					height={500}
					margin={[5, 5]}
					containerPadding={[10,10]}
					verticalCompact={true}
					style={{width: `${500}px`}}
					className="ple-grid">
					{grid.map((o, k) => {
						return (
							<div
								key={k}
								data-grid={{
									...o.layout,
								}}
								style={{ background: 'orange' }}>
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