import React from 'react';
import { connect } from 'react-redux';

import Button from './Button';
import EditLayoutSetting from './EditLayoutSetting';


class Toolbar extends React.Component {

	static defaultProps = {
		ple: null,
		dispatch: null,
		tree: null,
	};

	constructor(props) {
		super(props);

		this.state = {
			visible: {
				settings: true,
				shuffle: true,
				add: true,
				edit: false,
				removeImage: false,
				duplicate: false,
				removeBlock: false,
				editColor: true,
			},
			active: {
				settings: false,
				editColor: false,
			}
		}
	}

	componentDidMount() {

	}

	changeActive(keyName, userSW, event) {}

	submitEditSetting(state) {}
	submitEditColor(color) {}

	render() {
		const { ple, dispatch, tree } = this.props;
		const { visible, active } = this.state;

		console.log(this.props);

		return (
			<nav className="ple-toolbar">
				<div className="wrap">
					{visible.settings && (
						<Button
							iconClass="ico-setting"
							className={`edit-setting ${active.settings ? 'active' : ''}`}
							onClick={(e) => this.changeActive('settings', null, e)}
							title="Edit preference">
							<EditLayoutSetting
								submit={this.submitEditSetting.bind(this)}
								// settings={ple.settings}
								// defaultSettings={root.preference.body.settings}
							/>
						</Button>
					)}
				</div>
			</nav>
		);
	}

}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Toolbar);