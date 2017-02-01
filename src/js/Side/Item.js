import React, { Component } from 'react';


export default class SideItem extends Component {

	render() {
		const { image, onClick, active } = this.props;

		return (
			<li className={active ? 'active' : ''}>
				<button
					type="button"
					onClick={onClick}
					data-image={image}
					style={{ backgroundImage: `url('${image}')` }}/>
			</li>
		);
	}
}