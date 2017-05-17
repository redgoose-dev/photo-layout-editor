import React from 'react';
import ReactDom from 'react-dom';
import classNames from 'classnames';
import $ from 'jquery/dist/jquery.slim';

import { util } from '../../lib';


const controlEvent = {
	start: (util.isTouchDevice()) ? 'touchstart' : 'mousedown',
	move: (util.isTouchDevice()) ? 'touchmove' : 'mousemove',
	end: (util.isTouchDevice()) ? 'touchend' : 'mouseup',
};


export default class Block extends React.Component {

	static defaultProps = {
		src: '',
		position: '',
		size: '',
		bgColor: '#fff',
	};

	// TODO : 상태값은 직접 변경으로..

	constructor(props)
	{
		super(props);

		this.state = {
			position: props.size !== 'cover' ? props.position.split(' ') : ['50%', '50%'],
			size: props.size !== 'cover' ? props.size.split(' ') : props.size,
			isCover: props.size === 'cover',
		};

		this.$self = null;
		this.$img = null;
	}

	componentDidMount() {
		// set dom
		this.$self = $(ReactDom.findDOMNode(this));
	}

	componentWillReceiveProps(nextProps)
	{
		const { props } = this;

		if (props.size !== nextProps.size)
		{
			console.log(nextProps.size);
		}
		//this.setState(this.convertState(nextProps));
	}

	_resizeStart(e)
	{
		e.stopPropagation();

		this.$img = this.$self.find('img');

		$(document)
			.on(controlEvent.move + '.resize', this._resizeMove.bind(this))
			.on(controlEvent.end + '.resize', this._resizeEnd.bind(this));
	}
	_resizeMove(e)
	{
		e.preventDefault();

		let width = 0;
		let height = 0;
		let ratio = 0;
		let mouse = {};
		let evt = (e.type === 'touchmove') ? e.originalEvent.touches[0] : e;

		// set mouse position
		mouse.x = (evt.clientX || evt.pageX) + $(window).scrollLeft();
		mouse.y = (evt.clientY || evt.pageY) + $(window).scrollTop();

		// set image size
		width = mouse.x - this.$self.offset().left;
		ratio = width / this.$img.get(0).naturalWidth;
		height = this.$img.get(0).naturalHeight * ratio;

		this.setState({
			size: [`${parseInt(width)}px`, `${parseInt(height)}px`]
		});
	}
	_resizeEnd(e)
	{
		console.log('resize end');

		$(document)
			.off(controlEvent.move + '.resize')
			.off(controlEvent.end + '.resize');
	}

	render()
	{
		const { state, props } = this;

		//console.log(state.originalImage.ratio);
		
		//console.log(state.size);

		return (
			<figure
				style={{ backgroundColor: props.bgColor }}
				className="ple-cropperBlock ple-cropper__block">
				{state.isCover ? (
					<span
						style={{ backgroundImage: `url('${props.src}')` }}
						className="ple-cropperBlock__image ple-cropperBlock__image-cover"/>
				) : (
					<span
						className={classNames(
							'ple-cropperBlock__image',
							{ 'ple-cropperBlock__image-resize': (props.size !== 'cover') }
						)}>
						<img
							src={props.src}
							style={{ width: state.size[0] }}
							alt="image"/>
					</span>
				)}
				<div
					style={{
						width: state.size.split(' ')[0],
						height: state.size.split(' ')[1]
					}}
					className={classNames(
						'ple-cropperBlock__control',
						{ 'ple-cropperBlock__control-active': (props.size !== 'cover') }
					)}>
					<button
						type="button"
						title="resize"
						onMouseDown={this._resizeStart.bind(this)}
						onTouchStart={this._resizeStart.bind(this)}
						className="ple-cropperBlock__resize">
						<i/>
						<i/>
					</button>
				</div>
			</figure>
		);
	}

}