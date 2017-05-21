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
	}

	componentDidMount() {
		// set dom
		console.log(this.refs);
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
		e.preventDefault();
		e.stopPropagation();

		// set image element
		this.$img = this.$self.find('img');

		$(document)
			.on(`${controlEvent.move}.area`, this._moveIng.bind(this))
			.on(`${controlEvent.end}.area`, this._moveEnd.bind(this));
	}
	_moveIng(e)
	{
		e.preventDefault();
		e.stopPropagation();

		console.log('move ing');
	}
	_moveEnd(e)
	{
		e.preventDefault();

		console.log('move end');

		$(document)
			.off(`${controlEvent.move}.area`)
			.off(`${controlEvent.end}.area`);
	}

	_resizeStart(e)
	{
		e.stopPropagation();

		this.$img = this.$self.find('img');

		$(document)
			.on(`${controlEvent.move}.resize`, this._resizeIng.bind(this))
			.on(`${controlEvent.end}.resize`, this._resizeEnd.bind(this));
	}
	_resizeIng(e)
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
			size: `${parseInt(width)}px ${parseInt(height)}px`
		});
	}
	_resizeEnd(e)
	{
		this.$img = null;

		// TODO : save parent component

		$(document)
			.off(`${controlEvent.move}.resize`)
			.off(`${controlEvent.end}.resize`);
	}

	render()
	{
		const { state, props } = this;

		//console.log(state.originalImage.ratio);
		console.log(state.position);

		// TODO : 위치는 `transform`으로 쓸까하는데 프리픽스에 대해서 고민하고 있었음.
		// TODO : 위치값부터 처리하고 나서 move 이벤트 작업할 예정

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
								state.size !== 'cover' && { width: state.size.split(' ')[0] }
							)}
							alt="image"/>
					</span>
				)}
				<div
					onMouseDown={this._moveStart.bind(this)}
					style={Object.assign({},
						state.size !== 'cover' && {
							width: state.size.split(' ')[0],
							height: state.size.split(' ')[1]
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