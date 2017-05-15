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
	// TODO : 상태를 변경하고나서 100ms 정도 타임아웃을 두고 부모 컴포넌트에 값을 올려주는것이 좋아보임.

	constructor(props) {
		super(props);

		this.state = {
			position: props.size !== 'cover' ? props.position.split(' ') : ['50%', '50%'],
			size: props.size !== 'cover' ? props.size.split(' ') : props.size,
			isCover: props.size === 'cover',
		};
	}

	render() {
		const { state, props } = this;
		let areaStyle = {};

		console.log(state);
		if (props.size !== 'cover')
		{

		}

		return (
			<figure
				style={{ backgroundColor: props.bgColor }}
				className="ple-cropperBlock ple-cropper__block">
				{state.isCover ? (
					<span
						style={{ backgroundImage: `url('${props.src}')` }}
						className="ple-cropperBlock__image ple-cropperBlock__image-cover"
					/>
				) : (
					<span
						className={classNames(
							'ple-cropperBlock__image',
							{ 'ple-cropperBlock__image-resize': (props.size !== 'cover') }
						)}>
						<img src={props.src} alt="image"/>
					</span>
				)}
				<div
					style={{}}
					className={classNames(
						'ple-cropperBlock__control',
						{ 'ple-cropperBlock__control-active': (props.size !== 'cover') }
					)}>
					<button type="button" className="ple-cropperBlock__resize">resize</button>
				</div>
			</figure>
		);
	}

}