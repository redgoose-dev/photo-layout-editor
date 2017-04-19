import React from 'react';

import Block from './Block';


export default class Cropper extends React.Component {

	static defaultProps = {

	};

	constructor(props) {
		super(props);

		this.state = {
			show: false,
			visible: false,
			color: '#fff',
			image: null,
			wrapStyle: null,
		};
	}

	render() {
		const { state, props } = this;

		return (
			<div className="ple-cropper">
				<span className="ple-cropper__bg"/>
				<div className="ple-cropper__wrap" style={state.wrapStyle}>
					<Block/>
					<nav className="ple-cropper__nav">
						<button type="button" onClick={() => {}}>
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