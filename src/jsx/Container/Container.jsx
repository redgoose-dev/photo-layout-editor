var Container = React.createClass({

	displayName : 'Container',

	updatePreference : function(params)
	{
		log('trigger update setting');
		log(params);
	},

	/**
	 * Generate
	 */
	generate : function()
	{
		log('generate output');
	},

	/**
	 * render
	 */
	render : function()
	{
		return (
			<div className="ple-container">
				<Container_NavTop update={this.updatePreference} />
				<Container_Gridster />
				<Container_NavBottom generate={this.generate} />
			</div>
		);
	}
});
