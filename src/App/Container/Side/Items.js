import React from 'react';

import Item from './Item';


export default class Items extends React.Component {

	static defaultProps = {
		files: [], // files
		select: () => {}, // on select event
		progress: null, //
	};

	render() {
		const { files, select, progress } = this.props;

		return (
			<div className="items">
				<div className="wrap">
					<ul>
						{files.map((o, k) => {
							return (
								<Item
									key={o.id}
									image={o.image}
									active={o.active}
									onClick={() => select(o.id)} />
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