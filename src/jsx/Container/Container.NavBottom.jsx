var Container_NavBottom = React.createClass({

	displayName : 'Nav-bottom',

	actGenerator : function()
	{
		log('ACTION GENERATE');
	},

	/**
	 * render
	 */
	render : function()
	{
		return (
            <nav className="nav-bottom">
        		<button type="button" title="Generate export" onClick={this.props.generate}>
        			<i className="sp-ico ico-check"/>
        			<span>Generate</span>
        		</button>
        	</nav>
		);
	}
});
