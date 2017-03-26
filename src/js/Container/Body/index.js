import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateBody } from '../../actions/body';
//import Util from '../../lib/Util';
// import Toolbar from './Toolbar';
// import Gridster from './Gridster';


class Body extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { root, dispatch } = this.props;

		// update initial settings
		//dispatch(updateBody(root.preference.body));
	}

	componentWillUpdate() {}

	componentDidUpdate(props, state) {}

	render() {
		const { root, dispatch, env } = this.props;
		//const params = Util.makeProps(this.props, { env });

		return (
			<div className="ple-container">
				<div className="ple-body">
					<div className="ple-container__wrap" ref="body">
						{/*<Toolbar {...params}/>*/}
						{/*<Gridster {...params}/>*/}
					</div>
				</div>
			</div>
		);
	}

}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Body);