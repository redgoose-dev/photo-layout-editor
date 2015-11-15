var Container_NavTop_Form = React.createClass({

	displayName : 'Form',

	propTypes : {
		update : React.PropTypes.func
	},

	getInitialState : function()
	{
		return {
			width : 100,
			height : 100,
			max_col : 5,
			outer_margin : 10,
			inner_margin : 10
		};
	},

	submit : function()
	{
		this.props.update(this.state);
		return false;
	},

	reset : function()
	{
		this.setState(this.getInitialState());
	},

	/**
	 * render
	 */
	render : function()
	{
		return (
			<article className="form" id="settings">
				<form method="post">
					<fieldset>
						<legend className="blind">Settings form</legend>
						<h1>Settings</h1>
						<dl>
							<dt><label htmlhtmlFor="frm_name">Min Width</label></dt>
							<dd>
								<input
									type="number" name="width" id="frm_name"
									min="1" max="999" maxLength="3"
									defaultValue={this.state.width}
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
									defaultValue={this.state.height}/>
								<span>px</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_max_col">Max Column</label></dt>
							<dd>
								<input
									type="number" name="max_col" id="frm_max_col"
									min="1" max="99"
									defaultValue={this.state.max_col}/>
								<span>ea</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_outer_margin">Outer Margin</label></dt>
							<dd>
								<input
									type="number" name="outer_margin" id="frm_outer_margin"
									min="1" max="500"
									defaultValue={this.state.outer_margin}/>
								<span>px</span>
							</dd>
						</dl>
						<dl>
							<dt><label htmlFor="frm_inner_margin">Inner Margin</label></dt>
							<dd>
								<input
									type="number" name="inner_margin" id="frm_inner_margin"
									min="1" max="500"
									defaultValue={this.state.inner_margin}/>
								<span>px</span>
							</dd>
						</dl>
					</fieldset>
					<nav>
						<span><button type="reset" onClick={this.reset}>Reset</button></span>
						<span><button type="button" className="submit" onClick={this.submit}>Apply</button></span>
					</nav>
				</form>
			</article>
		);
	}
});