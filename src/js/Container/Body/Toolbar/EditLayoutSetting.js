import React from 'react';


export default class EditLayoutSetting extends React.Component {

	static defaultProps = {
		width: 50,
		height: 60,
		maxColumn: 5,
		maxScale: 2,
		outerMargin: 10,
		innerMargin: 5,
	};

	constructor(props) {
		super(props);
		this.state = {
			...props.defaultSettings
		};
	}

	reset() {
		this.setState({
			...this.props.defaultSettings
		});
	}

	change(e) {
		this.setState({
			[e.target.name] : parseInt(e.target.value)
		});
	}

	render() {
		const { submit } = this.props;

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
								value={this.state.width}
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
								value={this.state.height}
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
								value={this.state.maxColumn}
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
								defaultValue={this.state.maxScale}
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
								value={this.state.outerMargin}
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
								value={this.state.innerMargin}
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