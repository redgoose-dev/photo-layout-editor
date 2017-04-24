import React from 'react';
import { connect } from 'react-redux';

import * as action from '../../actions/cropper';

import Block from './Block';


class Cropper extends React.Component {

	_onClose() {
		const { props } = this;
		props.dispatch(action.close());
	}

	render() {
		const { state, props } = this;

		return (
			<div className="ple-cropper">
				<span className="ple-cropper__bg"/>
				<div className="ple-cropper__wrap">
					<Block/>
					<nav className="ple-cropper__nav">
						<button type="button" onClick={this._onClose.bind(this)}>
							<i className="sp-ico ico-close abs">Close cropper</i>
						</button>
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