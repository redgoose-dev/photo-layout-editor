import React from 'react';
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
			...this.convertState(props),
			originalImage: {},
			pending: true,
		};
	}

	componentDidMount() {
		// get image size
		util.getImageSize(this.props.src)
			.then((res) => {
				this.setState({
					pending: false,
					originalImage: res,
				});
			});
	}

	componentWillReceiveProps(nextProps)
	{
		this.setState(this.convertState(nextProps));
	}

	convertState(props)
	{
		return {
			position: props.size !== 'cover' ? props.position.split(' ') : ['50%', '50%'],
			size: props.size !== 'cover' ? props.size.split(' ') : props.size,
			isCover: props.size === 'cover',
		};
	}

	_resizeStart(e) {
		console.log('resize start');

	}
	_resizeMove(e) {
		console.log('resize move');
	}
	_resizeEnd(e) {
		console.log('resize end');
	}

	render()
	{
		const { state, props } = this;

		if (state.pending)
		{
			return (
				<figure
					style={{ backgroundColor: props.bgColor }}
					className="ple-cropperBlock ple-cropper__block"/>
			);
		}

		console.log(state.originalImage.ratio);

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
						style={{
							width: state.size[0],
							height: state.size[1]
						}}
						className={classNames(
							'ple-cropperBlock__image',
							{ 'ple-cropperBlock__image-resize': (props.size !== 'cover') }
						)}>
						<img src={props.src} alt="image"/>
					</span>
				)}
				<div
					style={{
						width: state.size[0],
						height: state.size[1]
					}}
					className={classNames(
						'ple-cropperBlock__control',
						{ 'ple-cropperBlock__control-active': (props.size !== 'cover') }
					)}>
					<button
						type="button"
						title="resize"
						onDragStart={this._resizeStart.bind(this)}
						className="ple-cropperBlock__resize">
						<i/>
						<i/>
					</button>
				</div>
			</figure>
		);
	}

}