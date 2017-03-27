import React from 'react';
import ReactGridLayout from 'ReactGridLayout';


export default class GridLayout extends React.Component {

	static defaultProps = {
		boxWidth: 50,
		boxHeight: 50,
		layout: [
			{i: 'a', x: 0, y: 0, w: 1, h: 1},
			{i: 'b', x: 0, y: 0, w: 1, h: 1},
			{i: 'c', x: 0, y: 0, w: 1, h: 1},
		],
	};

	render() {
		const { layout } = this.props;

		return (
			<div className="ple-grid__wrap">
				<ReactGridLayout
					layout={layout}
					autoSize={true}
					cols={5}
					rowHeight={80}
					width={500}
					height={500}
					margin={[2, 2]}
					containerPadding={[10,10]}
					verticalCompact={false}
					style={{width: `${500}px`}}
					className="ple-grid">
					<div key={0} style={{ background: 'red' }}>a</div>
					<div key={1} style={{ background: 'lime' }}>b</div>
					<div key={2} style={{ background: 'blue' }}>c</div>
					<div key={3} style={{ background: 'brown' }}>c</div>
					<div key={4} style={{ background: 'violet' }}>c</div>
					<div key={5} style={{ background: 'orange' }}>c</div>
				</ReactGridLayout>
			</div>
		);
	}

}