import React from 'react';
import { connect } from 'react-redux';

import * as action from '../../actions/cropper';

import Block from './Block';


class Cropper extends React.Component {

	constructor(props) {
		super(props);
		const { cropper } = props.tree;

		this.state = {
			position: cropper.setting.image.position,
			size: cropper.setting.image.size || 'cover',
			src: cropper.setting.image.src
		};
	}

	_onClose() {
		const { props } = this;
		props.dispatch(action.close());
	}

	render() {
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
						src={state.src}
						position={state.position}
						size={state.size}
						bgColor={cropper.setting.color}/>
					<nav className="ple-cropper__nav">
						<button type="button" onClick={this._onClose.bind(this)}>
							<i className="sp-ico ico-close abs">Close cropper</i>
						</button>
						{/*// TODO: `size:cover`값에 따라 활성화*/}
						<button type="button" onClick={() => {}}>
							<i className="sp-ico ico-resize abs">Toggle background size type</i>
						</button>
						<button type="button" onClick={() => {}}>
							<i className="sp-ico ico-reduction abs">Go to center image</i>
						</button>
					</nav>
				</div>
			</div>
		);
	}

}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Cropper);