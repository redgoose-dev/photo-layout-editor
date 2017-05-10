import React from 'react';

import Item from './Item';


export default class Items extends React.Component {

	static defaultProps = {
		files: [], // files
		onSelect: (id) => {}, // on select event
		onDragStart: (e) => {}, // on drag start
		onDragEnd: (e) => {}, // on drag end
		progress: null, //
	};

	render() {
		const { props } = this;

		return (
			<div className="items">
				<div className="wrap">
					<ul>
						{props.files.map((o, k) => {
							return (
								<Item
									key={k}
									image={o.image}
									onClick={() => props.onSelect(o.id)}
									onDragStart={props.onDragStart}
									onDragEnd={props.onDragEnd}
									onTouchStart={props.onDragStart}
									onTouchEnd={props.onDragEnd}
									active={o.active}/>
							);
						})}
						{props.progress !== null && (
							<li className="loading">
								<div className="progress">
									<span
										className="bar"
										style={{ height: `${props.progress}%` }}/>
									<span className="percent">{`${props.progress}%`}</span>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
		);
	}

}