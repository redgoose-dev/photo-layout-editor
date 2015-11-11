var Sidebar = React.createClass({

	displayName: 'Sidebar',

	/**
  * render
  */
	render: function () {
		return React.createElement(
			"aside",
			{ className: "ple-sidebar" },
			React.createElement(Sidebar_Nav, null),
			React.createElement(Sidebar_UploadFiles, null)
		);
	}
});