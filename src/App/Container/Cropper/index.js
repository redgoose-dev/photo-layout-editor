import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as action from '../../actions/cropper';

import Block from './Block';


class Cropper extends React.Component {

	constructor(props)
	{
		super(props);
		const { cropper } = props.tree;

		this.state = {
			position: cropper.setting.image.position,
			size: cropper.setting.image.size || 'cover'
		};
	}

	_onClose()
	{
		const { props } = this;
		props.dispatch(action.close());
	}

	_toggleImageType()
	{
		const { state, props } = this;
		const { wrap } = props.tree.cropper.setting;

		if (state.size === 'cover')
		{
			this.setState({
				position: '50% 50%',
				size: `${wrap.width}px ${wrap.height}px`,
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