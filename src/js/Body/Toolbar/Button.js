import React, { Component } from 'react';


export default class Button extends Component {

	render() {

		const { children, title, iconClass, className, onClick } = this.props;

		return (
			<div className={`block ${className}`}>
				<button type="button" title={title} onClick={onClick}>
					<i className={`sp-ico abs ${iconClass}`}>{title}</i>
				</button>
				{children && <div className="pop">{children}</div>}
			</div>
		);
	}
}