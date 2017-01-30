import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';


export default class EditPreference extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentColor: props.color,
		}
	}

	componentDidMount() {
		this.$color = $(findDOMNode(this.refs.color));

		this.$color.minicolors({
			inline : true,
			defaultValue : this.state.currentColor,
			letterCase: 'uppercase',
			changeDelay: 0,
			change : (hex, opacity) => this.update(hex)
		});
	}

	submit() {
		console.log('submit');
	}

	update(color) {
		this.setState({
			currentColor: color.toUpperCase()
		});
	}

	render() {
		const { submit } = this.props;
		let previewStyle = {
			backgroundColor : this.state.currentColor
		};

		return (
			<form>
				<fieldset>
					<legend>Edit color form</legend>
					<input type="hidden" ref="color" />
					<div className="preview">
						<input
							type="text"
							maxLength="7"
							value={this.state.currentColor}
							onChange={(e) => this.update(e.target.value)}/>
						<span style={previewStyle}/>
					</div>
				</fieldset>
				<nav>
					<span>
						<button
							type="button"
							onClick={() => submit(this.state.currentColor)}
							className="submit">
							Apply
						</button>
					</span>
				</nav>
			</form>
		);
	}
}