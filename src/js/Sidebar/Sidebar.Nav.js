var Sidebar_Nav = React.createClass({

	displayName: 'Navigation',

	/**
  * render
  */
	render: function () {
		return React.createElement(
			"nav",
			{ className: "nav-top" },
			React.createElement(
				"div",
				{ className: "wrap" },
				React.createElement(
					"button",
					{ type: "button" },
					React.createElement(
						"i",
						{ className: "sp-ico ico-arrow-left abs" },
						"Moving the image to grid block"
					)
				),
				React.createElement(
					"button",
					{ type: "button" },
					React.createElement(
						"i",
						{ className: "sp-ico ico-upload abs" },
						"upload image"
					)
				),
				React.createElement(
					"button",
					{ type: "button" },
					React.createElement(
						"i",
						{ className: "sp-ico ico-trash abs" },
						"remove image"
					)
				)
			)
		);
	}
});