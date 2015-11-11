var Container_NavTop = React.createClass({

	displayName : 'Nav-top',

	/**
	 * render
	 */
	render : function()
	{
		return (
            <nav className="nav-top">
        		<div className="block">
        			<button type="button"><i className="sp-ico ico-setting abs">Setting</i></button>
        			<article className="form">
        				<form action="#">
        					<fieldset>
        						<legend className="blind">Settings form</legend>
        						<h1>Settings</h1>
        						<dl>
        							<dt><label htmlhtmlFor="frm-name">Min Width</label></dt>
        							<dd><input type="number" name="width" id="frm-name" min="1" max="999"/><span>px</span></dd>
        						</dl>
        						<dl>
        							<dt><label htmlFor="frm-height">Min Height</label></dt>
        							<dd><input type="number" name="height" id="frm-height" min="1" max="999"/><span>px</span></dd>
        						</dl>
        						<dl>
        							<dt><label htmlFor="frm-max-col">Max Column</label></dt>
        							<dd><input type="number" name="max_col" id="frm-max-col" min="1" max="99"/><span>ea</span></dd>
        						</dl>
        						<dl>
        							<dt><label htmlFor="frm-outer-margin">Outer Margin</label></dt>
        							<dd><input type="number" name="outer-margin" id="frm-outer-margin" min="1" max="500"/><span>px</span></dd>
        						</dl>
        						<dl>
        							<dt><label htmlFor="frm-inner-margin">Inner Margin</label></dt>
        							<dd><input type="number" name="inner-margin" id="frm-inner-margin" min="1" max="500"/><span>px</span></dd>
        						</dl>
        					</fieldset>
        					<nav>
        						<span><button type="reset">Reset</button></span>
        						<span><button type="submit">Apply</button></span>
        					</nav>
        				</form>
        			</article>
        		</div>
        		<div className="block">
        			<button type="button"><i className="sp-ico ico-arrow-random abs">Random block</i></button>
        		</div>
        		<div className="block">
        			<button type="button"><i className="sp-ico ico-plus abs">Add block</i></button>
        		</div>
        	</nav>
		);
	}
});
