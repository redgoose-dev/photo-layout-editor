import React from 'react';
import classNames from 'classnames';


export default class Item extends React.Component {

	static defaultProps = {
		image: null, // image
		active: null, // active item
		onClick: () => {}, // on click item
		onDragStart: () => {}, // on drag start
		onDragEnd: () => {}, // on drag end
	};

	render() {
		const { props } = this;

		return (
			<li>
				<button
					type="button"
					data-image={props.image}
					style={{ backgroundImage: `url('${props.image}')` }}
					onClick={props.onClick}
					draggable={true}
					onDragStart={props.onDragStart}
					onDragEnd={props.onDragEnd}
					onTouchStart={props.onDragStart}
					onTouchEnd={props.onDragEnd}
					className={classNames({ 'active': props.active })}/>
			</li>
		);
	}
}