var Container = React.createClass({

	displayName : 'Container',

	/**
	 * render
	 */
	render : function()
	{
		return (
			<div className="ple-container">
                <Container_NavTop />
                <Container_Gridster />
                <Container_NavBottom />
			</div>
		);
	}
});
