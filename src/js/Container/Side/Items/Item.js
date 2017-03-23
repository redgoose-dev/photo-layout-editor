import React, { Component } from 'react';


export default class SideItem extends Component {

	render() {
		const { image, onClick, active } = this.props;

		return (
			<li>
				<button
					type="button"
					data-image={image}
					style={{ backgroundImage: `url('${image}')` }}
					className={active ? 'active' : ''}
					onClick={onClick}/>
			</li>
		);
	}
}