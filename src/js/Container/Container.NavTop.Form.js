var Container_NavTop_Form = React.createClass({

	displayName: 'Form',

	getInitialState: function () {
		return {
			width: 100,
			height: 100,
			max_col: 5,
			outer_margin: 10,
			inner_margin: 10
		};
	},

	onSubmit: function (e) {
		var form = e.target;
		log(form.action);
		return false;
	},

	/**
  * render
  */
	render: function () {
		return React.createElement(
			"article",
			{ className: "form" },
			React.createElement(
				"form",
				{ action: "#", onSubmit: this.onSubmit },
				React.createElement(
					"fieldset",
					null,
					React.createElement(
						"legend",
						{ className: "blind" },
						"Settings form"
					),
					React.createElement(
						"h1",
						null,
						"Settings"
					),
					React.createElement(
						"dl",
						null,
						React.createElement(
							"dt",
							null,
							React.createElement(
								"label",
								{ htmlhtmlFor: "frm_name" },
								"Min Width"
							)
						),
						React.createElement(
							"dd",
							null,
							React.createElement("input", {
								type: "number", name: "width", id: "frm_name",
								min: "1", max: "999", maxLength: "3",
								defaultValue: this.state.width,
								required: true }),
							React.createElement(
								"span",
								null,
								"px"
							)
						)
					),
					React.createElement(
						"dl",
						null,
						React.createElement(
							"dt",
							null,
							React.createElement(
								"label",
								{ htmlFor: "frm_height" },
								"Min Height"
							)
						),
						React.createElement(
							"dd",
							null,
							React.createElement("input", {
								type: "number", name: "height", id: "frm_height",
								min: "1", max: "999",
								defaultValue: this.state.height }),
							React.createElement(
								"span",
								null,
								"px"
							)
						)
					),
					React.createElement(
						"dl",
						null,
						React.createElement(
							"dt",
							null,
							React.createElement(
								"label",
								{ htmlFor: "frm_max_col" },
								"Max Column"
							)
						),
						React.createElement(
							"dd",
							null,
							React.createElement("input", {
								type: "number", name: "max_col", id: "frm_max_col",
								min: "1", max: "99",
								defaultValue: this.state.max_col }),
							React.createElement(
								"span",
								null,
								"ea"
							)
						)
					),
					React.createElement(
						"dl",
						null,
						React.createElement(
							"dt",
							null,
							React.createElement(
								"label",
								{ htmlFor: "frm_outer_margin" },
								"Outer Margin"
							)
						),
						React.createElement(
							"dd",
							null,
							React.createElement("input", {
								type: "number", name: "outer_margin", id: "frm_outer_margin",
								min: "1", max: "500",
								defaultValue: this.state.outer_margin }),
							React.createElement(
								"span",
								null,
								"px"
							)
						)
					),
					React.createElement(
						"dl",
						null,
						React.createElement(
							"dt",
							null,
							React.createElement(
								"label",
								{ htmlFor: "frm_inner_margin" },
								"Inner Margin"
							)
						),
						React.createElement(
							"dd",
							null,
							React.createElement("input", {
								type: "number", name: "inner_margin", id: "frm_inner_margin",
								min: "1", max: "500",
								defaultValue: this.state.inner_margin }),
							React.createElement(
								"span",
								null,
								"px"
							)
						)
					)
				),
				React.createElement(
					"nav",
					null,
					React.createElement(
						"span",
						null,
						React.createElement(
							"button",
							{ type: "reset" },
							"Reset"
						)
					),
					React.createElement(
						"span",
						null,
						React.createElement(
							"button",
							{ type: "submit" },
							"Apply"
						)
					)
				)
			)
		);
	}
});