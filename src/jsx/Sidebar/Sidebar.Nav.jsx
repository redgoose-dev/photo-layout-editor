var Sidebar_Nav = React.createClass({

	displayName : 'Navigation',

	/**
	 * render
	 */
	render : function()
	{
		return (
            <nav className="nav-top">
        		<div className="wrap">
        			<button type="button"><i className="sp-ico ico-arrow-left abs">Moving the image to grid block</i></button>
        			<button type="button"><i className="sp-ico ico-upload abs">upload image</i></button>
        			<button type="button"><i className="sp-ico ico-trash abs">remove image</i></button>
        		</div>
        	</nav>
		);
	}
});
