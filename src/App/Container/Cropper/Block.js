import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery/dist/jquery.slim';
import classNames from 'classnames';

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

	constructor(props)
	{
		super(props);

		this.state = {
			position: props.position,
			size: props.size,
			isCover: props.size === 'cover',
		};

		this.$self = null;
		this.$img = null;
		this.moveStartInfo = {};
		this.resizeStartInfo = {};
	}

	componentDidMount()
	{
		// set dom
		this.$self = $(ReactDom.findDOMNode(this.refs.self));
	}

	componentWillReceiveProps(nextProps)
	{
		const { props } = this;

		if (props.size !== nextProps.size)
		{
			this.setState({
				position: nextProps.position,
				size: nextProps.size,
				isCover: nextProps.size === 'cover',
			});
		}
	}

	_moveStart(e)
	{
		e.stopPropagation();

		const { state } = this;

		// set image element
		this.$img = this.$self.find('img');

		this.moveStartInfo = {
			containerX: parseInt(state.position.split(' ')[0]),
			containerY: parseInt(state.position.split(' ')[1]),
			mouseX : (e.clientX || e.pageX || e.nativeEvent.touches[0].clientX) + $(window).scrollLeft(),
			mouseY : (e.clientY || e.pageY || e.nativeEvent.touches[0].clientY) + $(window).scrollTop(),
		};

		$(document)
			.on(`${controlEvent.move}.move`, this._moveIng.bind(this))
			.on(`${controlEvent.end}.move`, this._moveEnd.bind(this));
	}
	_moveIng(e)
	{
		e.stopPropagation();

		const evt = (e.type === 'touchmove') ? e.originalEvent.touches[0] : e;
		let mouse = {};
		let distance = {};

		mouse.x = (evt.clientX || evt.pageX) + $(window).scrollLeft();
		mouse.y = (evt.clientY || evt.pageY) + $(window).scrollTop();

		distance.x = this.moveStartInfo.containerX + (mouse.x - this.moveStartInfo.mouseX);
		distance.y = this.moveStartInfo.containerY + (mouse.y - this.moveStartInfo.mouseY);

		this.setState({
			position: `${parseInt(distance.x)}px ${parseInt(distance.y)}px`
		});
	}
	_moveEnd(e)
	{
		e.preventDefault();

		this.$img = null;
		this.moveStartInfo = null;

		$(document)
			.off(`${controlEvent.move}.move`)
			.off(`${controlEvent.end}.move`);
	}

	_resizeStart(e)
	{
		e.stopPropagation();

		this.$img = this.$self.find('img');

		this.resizeStartInfo = {
			width: this.$img.width(),
			height: this.$img.height(),
			x : (e.clientX || e.pageX || e.nativeEvent.touches[0].clientX) + $(window).scrollLeft(),
		};

		$(document)
			.on(`${controlEvent.move}.resize`, this._resizeIng.bind(this))
			.on(`${controlEvent.end}.resize`, this._resizeEnd.bind(this));
	}
	_resizeIng(e)
	{
		e.stopPropagation();

		let size = {};
		let evt = (e.type === 'touchmove') ? e.originalEvent.touches[0] : e;

		// set mouse position
		let distance = (evt.clientX || evt.pageX) + $(window).scrollLeft() - this.resizeStartInfo.x;

		// set image size
		size.width = this.resizeStartInfo.width + distance;
		let ratio = size.width / this.$img.get(0).naturalWidth;
		size.height = parseInt(this.$img.get(0).naturalHeight * ratio);

		this.setState({
			size: `${parseInt(size.width)}px ${parseInt(size.height)}px`
		});
	}
	_resizeEnd(e)
	{
		this.$img = null;
		this.resizeStartInfo = null;

		$(document)
			.off(`${controlEvent.move}.resize`)
			.off(`${controlEvent.end}.resize`);
	}

	render()
	{
		const { state, props } = this;
		const size = (state.size !== 'cover') ? state.size.split(' ') : state.size;
		const position = state.position.split(' ');

		// TODO : 리사이즈 포인트 버튼을 4방향에 넣는게 좋을거 같다.

		return (
			<figure
				ref="self"
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
							style={Object.assign({},
								state.size !== 'cover' && {
									width: size[0],
									transform: `translate(${position[0]}, ${position[1]})`
								}
							)}
							alt="image"/>
					</span>
				)}
				<div
					onMouseDown={this._moveStart.bind(this)}
					onTouchStart={this._moveStart.bind(this)}
					style={Object.assign({},
						state.size !== 'cover' && {
							width: size[0],
							height: size[1],
							transform: `translate(${position[0]}, ${position[1]})`
						}
					)}
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