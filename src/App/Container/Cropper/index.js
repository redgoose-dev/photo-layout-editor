import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Block from './Block';

import * as action from '../../actions/cropper';

import * as lib from '../../lib';


class Cropper extends React.Component {

	constructor(props)
	{
		super(props);
		const { cropper } = props.tree;

		this.state = {
			pending: true,
			position: cropper.setting.image.position,
			size: cropper.setting.image.size || 'cover'
		};
		this.imageMeta = null;
	}

	componentDidMount() {
		const { props } = this;
		const { cropper } = props.tree;

		lib.util.getImageSize(cropper.setting.image.src).then((res) => {
			this.imageMeta = res;
			this.setState({ pending: false });
		});
	}

	_onClose()
	{
		const { props } = this;
		props.dispatch(action.close());
	}

	/**
	 * toggle image type
	 * 직접 리사이즈를 사용하는지 기본(꽉채우는..)타입으로 사용할건지 변경하는 액션
	 */
	_toggleImageType()
	{
		const { state, props } = this;
		const { wrap } = props.tree.cropper.setting;

		if (state.size === 'cover')
		{
			let targetSize = '';
			let ratio = 0;
			if (wrap.height > wrap.width)
			{
				ratio = lib.number.getRatioForResize(wrap.height, this.imageMeta.height);
				targetSize = `${parseInt(this.imageMeta.width * ratio)}px ${wrap.height}px`;
			}
			else
			{
				ratio = lib.number.getRatioForResize(wrap.width, this.imageMeta.width);
				targetSize = `${wrap.width}px ${parseInt(this.imageMeta.height * ratio)}px`;
			}
			this.setState({
				position: '0 0',
				size: targetSize,
			});
		}
		else
		{
			this.setState({
				position: `50% 50%`,
				size: 'cover',
			});
		}
	}

	render()
	{
		const { state, props } = this;
		const { cropper } = props.tree;

		if (state.pending) return null;

		return (
			<div className="ple-cropper">
				<span className="ple-cropper__bg"/>
				<div
					style={{
						width: `${cropper.setting.wrap.width}px`,
						height: `${cropper.setting.wrap.height}px`,
						top: `${cropper.setting.wrap.top}px`,
						left: `${cropper.setting.wrap.left}px`,
					}}
					className="ple-cropper__wrap">
					<Block
						src={cropper.setting.image.src}
						position={state.position}
						size={state.size}
						bgColor={cropper.setting.color}/>
					<nav className="ple-cropper__nav">
						<button type="button" onClick={this._onClose.bind(this)}>
							<i className="sp-ico ico-close abs">Close cropper</i>
						</button>
						<button
							type="button"
							onClick={this._toggleImageType.bind(this)}
							className={classNames({
								'active': state.size !== 'cover'
							})}>
							<i className="sp-ico ico-resize abs">Toggle background size type</i>
						</button>
						{state.size !== 'cover' && (
							<button type="button" onClick={() => {}}>
								<i className="sp-ico ico-reduction abs">Go to center image</i>
							</button>
						)}
					</nav>
				</div>
			</div>
		);
	}

}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Cropper);