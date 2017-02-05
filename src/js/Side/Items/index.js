import React, { Component } from 'react';

import Item from './Item';


export default class SideItems extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//console.log(this.props);
	}

	render() {

		const { files, select } = this.props;
		const compItems = files.map((o, k) => {
			return (
				<Item
					key={o.id}
					image={o.image}
					active={o.active}
					onClick={() => select(o.id)} />
			);
		});

		return (
			<div className="items">
				<div className="wrap">
					<ul>{compItems}</ul>
				</div>
			</div>
		);
	}

}