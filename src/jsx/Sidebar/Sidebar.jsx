var Sidebar = React.createClass({

	displayName : 'Sidebar',

	/**
	 * render
	 */
	render : function()
	{
		return (
			<aside className="ple-sidebar">
                <Sidebar_Nav />
                <Sidebar_UploadFiles />
			</aside>
		);
	}
});
