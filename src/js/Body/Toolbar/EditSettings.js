import React, { Component } from 'react';


export default class EditSettings extends Component {

	constructor(props) {
		super(props);
		this.state = props.defaultSettings;
	}

	reset() {
		this.setState(this.props.defaultSettings);
	}

	change(e) {
		this.setState({
			[e.target.name] : e.target.value
		});
	}

	render() {
		const { submit } = this.props;
		const { width, height, maxColumn, maxScale, outerMargin, innerMargin } = this.state;

		return (
			<form>
				<fieldset>
					<legend>Settings form</legend>
					<h1>Settings</h1>
					<dl>
						<dt><label htmlFor="frm_name">Min Width</label></dt>
						<dd>
							<input
								type="number" name="width" id="frm_name"
								min="1" max="999" maxLength="3"
								value={width}
								onChange={this.change.bind(this)}
								required />
							<span>px</span>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_height">Min Height</label></dt>
						<dd>
							<input
								type="number" name="height" id="frm_height"
								min="1" max="999"
								value={height}
								onChange={this.change.bind(this)}
								required />
							<span>px</span>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_maxColumn">Max Column</label></dt>
						<dd>
							<input
								type="number" name="maxColumn" id="frm_maxColumn"
								min="1" max="99"
								value={maxColumn}
								onChange={this.change.bind(this)}
								required />
							<span>ea</span>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_maxScale">Max Scale</label></dt>
						<dd>
							<input
								type="number" name="maxScale" id="frm_maxScale"
								min="1" max="99"
								defaultValue={maxScale}
								onChange={this.change.bind(this)}
								required />
							<span>x</span>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_outerMargin">Outer Margin</label></dt>
						<dd>
							<input
								type="number" name="outerMargin" id="frm_outerMargin"
								min="0" max="500"
								value={outerMargin}
								onChange={this.change.bind(this)}
								required />
							<span>px</span>
						</dd>
					</dl>
					<dl>
						<dt><label htmlFor="frm_innerMargin">Inner Margin</label></dt>
						<dd>
							<input
								type="number" name="innerMargin" id="frm_innerMargin"
								min="0" max="500"
								value={innerMargin}
								onChange={this.change.bind(this)}
								required />
							<span>px</span>
						</dd>
					</dl>
				</fieldset>
				<nav>
					<span>
						<button
							type="button"
							onClick={this.reset.bind(this)}>
							Reset
						</button>
					</span>
					<span>
						<button
							type="button"
							className="submit"
							onClick={() => submit(this.state)}>
							Apply
						</button>
					</span>
				</nav>
			</form>
		);
	}
}