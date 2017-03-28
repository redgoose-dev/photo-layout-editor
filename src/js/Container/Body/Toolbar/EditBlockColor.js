import React from 'react';


export default class EditBlockColor extends React.Component {

	static defaultProps = {
		color: '#ffffff',
	};

	constructor(props) {
		super(props);

		this.state = {
			color: props.color,
		}
	}

	_update(color) {
		this.setState({ color });
	}

	render() {
		const { submit } = this.props;
		let previewStyle = {
			backgroundColor : this.state.color
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
							value={this.state.color}
							onChange={(e) => this._update(e.target.value)}/>
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