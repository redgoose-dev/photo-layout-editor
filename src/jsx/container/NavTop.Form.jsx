module.exports = React.createClass({

	displayName : 'NavTop-Form',
	form : null,

	propTypes : {
		update : React.PropTypes.func
	},

	getInitialState()
	{
		return {};
	},

	componentDidMount()
	{
		this.form = ReactDOM.findDOMNode(this.refs.form);
	},

	update(e)
	{
		e.preventDefault();
		this.props.update({
			width : parseInt(this.form.width.value),
			height : parseInt(this.form.height.value),
			max_col : parseInt(this.form.max_col.value),
			max_scale : parseInt(this.form.max_scale.value),
			outer_margin : parseInt(this.form.outer_margin.value),
			inner_margin : parseInt(this.form.inner_margin.value)
		});
	},

	/**
	 * render
	 */
	render()
	{
		return (
			<article className="form" id="settings">
				<form method="post" ref="form" onSubmit={this.update}>
					<fieldset>
						<legend className="blind">Settings form</legend>
						<h1>Settings</h1>
						<dl>
							<dt><label htmlhtmlFor="frm_name">Min Width</label></dt>
							<dd>
								<input
									type="number" name="width" id="frm_name"
									min="1" max="999" maxLength="3"
									defaultValue={this.props.preference.width}
									required/>
								<span>px</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_height">Min Height</label></dt>
							<dd>
								<input
									type="number" name="height" id="frm_height"
									min="1" max="999"
									defaultValue={this.props.preference.height}/>
								<span>px</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_max_col">Max Column</label></dt>
							<dd>
								<input
									type="number" name="max_col" id="frm_max_col"
									min="1" max="99"
									defaultValue={this.props.preference.max_col}/>
								<span>ea</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_max_scale">Max Scale</label></dt>
							<dd>
								<input
									type="number" name="max_scale" id="frm_max_scale"
									min="1" max="99"
									defaultValue={this.props.preference.max_scale}/>
								<span>x</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_outer_margin">Outer Margin</label></dt>
							<dd>
								<input
									type="number" name="outer_margin" id="frm_outer_margin"
									min="0" max="500"
									defaultValue={this.props.preference.outer_margin}/>
								<span>px</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_inner_margin">Inner Margin</label></dt>
							<dd>
								<input
									type="number" name="inner_margin" id="frm_inner_margin"
									min="0" max="500"
									defaultValue={this.props.preference.inner_margin}/>
								<span>px</span>
							</dd>
						</dl>
					</fieldset>
					<nav>
						<span><button type="reset" onClick={this.props.reset}>Reset</button></span>
						<span><button type="submit" className="submit">Apply</button></span>
					</nav>
				</form>
			</article>
		);
	}
});