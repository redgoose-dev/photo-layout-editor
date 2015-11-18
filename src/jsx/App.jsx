var App = React.createClass({

	displayName : 'photo-layout-editor',

	attachIames : function(images)
	{
		this.refs.Container.updateAttachImages(images);
	},

	/**
	 * render
	 */
	render : function()
	{
		return (
			<div className="ple-editor">
				<Header />
				<Container ref="Container"/>
				<Sidebar uploadScript={this.props.uploadScript} attachImages={this.attachIames}/>
			</div>
		);
	}
});
