import React, { Component } from 'react';


export default class ToggleButton extends Component {

	render() {

		const { show, onClick } = this.props;

		return (
			<button
				type="button"
				onClick={onClick}
				className="toggle">
				<span>
					<i className={'sp-ico abs' + (show ? ' ico-arrow-right' : ' ico-arrow-left')}>
						Toggle sidebar
					</i>
				</span>
			</button>
		);
	}

}