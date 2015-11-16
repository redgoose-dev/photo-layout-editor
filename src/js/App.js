var App = React.createClass({

	displayName: 'photo-layout-editor',

	/**
  * render
  */
	render: function () {
		return React.createElement(
			"div",
			{ className: "ple-editor" },
			React.createElement(Header, null),
			React.createElement(Container, null),
			React.createElement(Sidebar, { uploadScript: this.props.uploadScript })
		);
	}
});