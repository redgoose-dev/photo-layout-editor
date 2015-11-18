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
				<Sidebar uploadScript={this.props.uploadScript} uploadDir={this.props.uploadDir} uploadUrl={this.props.uploadUrl}/>
			</div>
		);
	}
});
