import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class Side extends Component {
	render() {

		const { dispatch } = this.props;

		return (
			<div>
				<span>hello side</span>
			</div>
		);
	}
}

function select(state)
{
	return {
		foo: 'barrrrr'
	};
}

export default connect(select)(Side);