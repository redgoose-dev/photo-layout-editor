import React, { Component } from 'react';


export default class Gridster extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		const { root, dispatch, env } = this.props;
		//console.log(this.props);

		return (
			<div className="ple-gridster">
				<div ref="gridster" className="gridster"></div>
			</div>
		);
	}

}