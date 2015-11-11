var App = React.createClass({

	displayName : 'photo-layout-editor',

	/**
	 * render
	 */
	render : function()
	{
		return (
			<div className="ple-editor">
				<Header />
				<Container />
				<Sidebar />
			</div>
		);
	}
});
