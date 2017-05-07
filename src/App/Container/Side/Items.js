import React from 'react';

import Item from './Item';


export default class Items extends React.Component {

	static defaultProps = {
		files: [], // files
		select: () => {}, // on select event
		progress: null, //
	};

	// TODO : 드래그앤 드롭 이벤트 작업하기

	_dragStart(e) {
		console.log('on drag start', e);
	}
	_dragEnd(e) {
		console.log('on drag end', e);
	}

	render() {
		const { files, select, progress } = this.props;

		return (
			<div className="items">
				<div className="wrap">
					<ul>
						{files.map((o, k) => {
							return (
								<Item
									key={k}
									image={o.image}
									active={o.active}
									onClick={() => select(o.id)}
									onDragStart={this._dragStart.bind(this)}
									onDragEnd={this._dragEnd.bind(this)}/>
							);
						})}
						{progress !== null && (
							<li className="loading">
								<div className="progress">
									<span
										className="bar"
										style={{ height: `${progress}%` }}/>
									<span className="percent">{`${progress}%`}</span>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
		);
	}

}