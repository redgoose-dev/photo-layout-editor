var App = React.createClass({

	displayName: 'photo-layout-editor',

	attachIames: function (images) {
		this.refs.Container.updateAttachImages(images);
	},

	/**
  * render
  */
	render: function () {
		return React.createElement(
			"div",
			{ className: "ple-editor" },
			React.createElement(Header, null),
			React.createElement(Container, { ref: "Container" }),
			React.createElement(Sidebar, { uploadScript: this.props.uploadScript, attachImages: this.attachIames })
		);
	}
});