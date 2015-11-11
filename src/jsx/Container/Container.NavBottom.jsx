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
        		<button type="button" onClick={this.actGenerator}>
        			<i className="sp-ico ico-check"></i>
        			<span>Generate</span>
        		</button>
        	</nav>
		);
	}
});
