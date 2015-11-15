var Sidebar = React.createClass({

	displayName : 'Sidebar',

	upload : function()
	{
		log('upload file');
	},

	remove : function()
	{
		log('remove file');
	},

	attach : function()
	{
		log('attach file');
	},

	/**
	 * render
	 */
	render : function()
	{
		return (
			<aside className="ple-sidebar">
                <Sidebar_Nav upload={this.upload} remove={this.remove} attach={this.attach} />
                <Sidebar_UploadFiles />
			</aside>
		);
	}
});
