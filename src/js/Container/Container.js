var Container = React.createClass({

	displayName: 'Container',

	/**
  * render
  */
	render: function () {
		return React.createElement(
			"div",
			{ className: "ple-container" },
			React.createElement(Container_NavTop, null),
			React.createElement(Container_Gridster, null),
			React.createElement(Container_NavBottom, null)
		);
	}
});