var Container_NavBottom = React.createClass({

	displayName: 'Nav-bottom',

	/**
  * render
  */
	render: function () {
		return React.createElement(
			"nav",
			{ className: "nav-bottom" },
			React.createElement(
				"button",
				{ type: "button", "data-action": "generate" },
				React.createElement("i", { className: "sp-ico ico-check" }),
				React.createElement(
					"span",
					null,
					"Generate"
				)
			)
		);
	}
});