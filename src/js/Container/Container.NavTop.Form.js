var Container_NavTop_Form = React.createClass({

	displayName: 'Form',
	form: null,

	propTypes: {
		update: React.PropTypes.func
	},

	getInitialState: function () {
		return {};
	},

	componentDidMount: function () {
		this.form = ReactDOM.findDOMNode(this.refs.form);
	},

	update: function (e) {
		e.preventDefault();
		this.props.update({
			width: parseInt(this.form.width.value),
			height: parseInt(this.form.height.value),
			max_col: parseInt(this.form.max_col.value),
			max_scale: parseInt(this.form.max_scale.value),
			outer_margin: parseInt(this.form.outer_margin.value),
			inner_margin: parseInt(this.form.inner_margin.value)
		});
	},

	/**
  * render
  */
	render: function () {
		return React.createElement(
			"article",
			{ className: "form", id: "settings" },
			React.createElement(
				"form",
				{ method: "post", ref: "form", onSubmit: this.update },
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
								defaultValue: this.props.preference.width,
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
								defaultValue: this.props.preference.height }),
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
								defaultValue: this.props.preference.max_col }),
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
								{ htmlFor: "frm_max_scale" },
								"Max Scale"
							)
						),
						React.createElement(
							"dd",
							null,
							React.createElement("input", {
								type: "number", name: "max_scale", id: "frm_max_scale",
								min: "1", max: "99",
								defaultValue: this.props.preference.max_scale }),
							React.createElement(
								"span",
								null,
								"x"
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
								defaultValue: this.props.preference.outer_margin }),
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
								defaultValue: this.props.preference.inner_margin }),
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
							{ type: "reset", onClick: this.props.reset },
							"Reset"
						)
					),
					React.createElement(
						"span",
						null,
						React.createElement(
							"button",
							{ type: "submit", className: "submit" },
							"Apply"
						)
					)
				)
			)
		);
	}
});