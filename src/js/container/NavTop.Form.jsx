const React = require('React');
const ReactDOM = require('ReactDOM');
const $ = require('jquery');

module.exports = React.createClass({

	displayName : 'NavTop-Form',
	form : null,

	propTypes : {
		update : React.PropTypes.func,
		preference : React.PropTypes.object
	},

	defaultPreference : {
		width : 100,
		height : 100,
		max_col : 5,
		max_scale : 2,
		outer_margin : 10,
		inner_margin : 10
	},

	getInitialState()
	{
		let defaultState = {};
		return $.extend(defaultState, this.defaultPreference);
	},

	componentDidMount()
	{
		this.form = ReactDOM.findDOMNode(this.refs.form);
	},

	componentWillReceiveProps(props)
	{
		this.setState($.extend(this.state, props.preference));
	},

	submit(e)
	{
		e.preventDefault();
		this.props.submit({
			width : parseInt(this.form.width.value),
			height : parseInt(this.form.height.value),
			max_col : parseInt(this.form.max_col.value),
			max_scale : parseInt(this.form.max_scale.value),
			outer_margin : parseInt(this.form.outer_margin.value),
			inner_margin : parseInt(this.form.inner_margin.value)
		});
	},

	change(e)
	{
		this.setState({
			[e.target.name] : e.target.value
		});
	},

	/**
	 * render
	 */
	render()
	{
		return (
			<article className="form edit-setting" id="settings">
				<form method="post" ref="form" onSubmit={this.submit}>
					<fieldset>
						<legend className="blind">Settings form</legend>
						<h1>Settings</h1>
						<dl>
							<dt><label htmlFor="frm_name">Min Width</label></dt>
							<dd>
								<input
									type="number" name="width" id="frm_name"
									min="1" max="999" maxLength="3"
									value={this.state.width}
									onChange={this.change}
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
									onChange={this.change}
									required />
								<span>px</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_max_col">Max Column</label></dt>
							<dd>
								<input
									type="number" name="max_col" id="frm_max_col"
									min="1" max="99"
									value={this.state.max_col}
									onChange={this.change}
									required />
								<span>ea</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_max_scale">Max Scale</label></dt>
							<dd>
								<input
									type="number" name="max_scale" id="frm_max_scale"
									min="1" max="99"
									defaultValue={this.state.max_scale}
									onChange={this.change}
									required />
								<span>x</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_outer_margin">Outer Margin</label></dt>
							<dd>
								<input
									type="number" name="outer_margin" id="frm_outer_margin"
									min="0" max="500"
									value={this.state.outer_margin}
									onChange={this.change}
									required />
								<span>px</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_inner_margin">Inner Margin</label></dt>
							<dd>
								<input
									type="number" name="inner_margin" id="frm_inner_margin"
									min="0" max="500"
									value={this.state.inner_margin}
									onChange={this.change}
									required />
								<span>px</span>
							</dd>
						</dl>
					</fieldset>
					<nav>
						<span><button type="button" onClick={this.props.reset}>Reset</button></span>
						<span><button type="submit" className="submit">Apply</button></span>
					</nav>
				</form>
			</article>
		);
	}
});