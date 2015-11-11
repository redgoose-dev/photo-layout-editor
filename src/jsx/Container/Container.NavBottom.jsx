var Container_NavBottom = React.createClass({

	displayName : 'Nav-bottom',

	/**
	 * render
	 */
	render : function()
	{
		return (
            <nav className="nav-bottom">
        		<button type="button" data-action="generate">
        			<i className="sp-ico ico-check"></i>
        			<span>Generate</span>
        		</button>
        	</nav>
		);
	}
});
