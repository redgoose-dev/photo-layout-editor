import React, { Component } from 'react';

import Button from './Button';
import EditSettings from './EditSettings';
import EditColor from './EditColor';


export default class Toolbar extends Component {

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
			},
		};
	}

	changeActive(keyName, userSW) {
		const { active } = this.state;
		const sw = userSW || !active[keyName];

		this.setState({
			active: Object.assign({}, {
				settings: false,
				editColor: false,
			}, {
				[keyName] : sw
			}),
		});
	}

	submitEditSetting(state) {
		// TODO : dispatch 실행하여 업데이트 하기
		console.log(state);
		this.changeActive('settings');
	}

	submitEditColor(color) {
		// TODO : dispatch 실행하여 업데이트 하기
		console.log(color);
		this.changeActive('editColor');
	}

	render() {
		const { root, dispatch, env } = this.props;
		const { visible, active } = this.state;

		return (
			<nav className="ple-toolbar">
				<div className="wrap">
					{visible.settings && (
						<Button
							iconClass="ico-setting"
							className={`edit-setting ${active.settings ? 'active' : ''}`}
							onClick={() => this.changeActive('settings')}
							title="Edit preference">
							<EditSettings
								submit={this.submitEditSetting.bind(this)}
								settings={env.settings}
								defaultSettings={root.preference.body.settings}/>
						</Button>
					)}

					{visible.shuffle && (<Button
						iconClass="ico-arrow-random"
						onClick={() => { console.log('click button'); }}
						title="Shuffle block"/>)}

					{visible.add && (<Button
						iconClass="ico-plus"
						onClick={() => { console.log('click button'); }}
						title="Add block"/>)}

					{visible.edit && (<Button
						iconClass="ico-pencel"
						onClick={() => { console.log('click button'); }}
						title="Edit block"/>)}

					{visible.removeImage && (<Button
						iconClass="ico-empty"
						onClick={() => { console.log('click button'); }}
						title="Remove image in block"/>)}

					{visible.duplicate && (<Button
						iconClass="ico-duplicate"
						onClick={() => { console.log('click button'); }}
						title="Duplicate block"/>)}

					{visible.removeBlock && (<Button
						iconClass="ico-trash"
						onClick={() => { console.log('click button'); }}
						title="Remove block"/>)}

					{visible.editColor && (
						<Button
							iconClass="ico-palette"
							className={`edit-color ${active.editColor ? 'active' : ''}`}
							onClick={() => this.changeActive('editColor')}
							title="Change color">
							<EditColor
								submit={this.submitEditColor.bind(this)}
								color={env.blockColor}/>
						</Button>
					)}
				</div>
			</nav>
		);
	}
}