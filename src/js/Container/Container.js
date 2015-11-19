var Container = React.createClass({

	displayName: 'Container',
	originalPreference: {},

	getInitialState: function () {
		return {
			preference: {
				width: 100,
				height: 100,
				max_col: 5,
				outer_margin: 10,
				inner_margin: 10
			},
			action: null,
			dynamicParameter: {}
		};
	},

	componentDidMount: function () {
		this.originalPreference = this.state.preference;
	},

	updatePreference: function (params) {
		this.setState({ preference: params, action: 'updatePreference' });
		//this.refs.gridster.updatePreference(params);
		//this.refs.navTop.closeSetting();
	},

	resetPreference: function () {
		this.setState({ preference: this.originalPreference, action: null });
	},

	updateAttachImages: function (items) {
		log('act import');
		log(items);
	},

	/**
  * Generate
  */
	generate: function () {
		log('generate output');
	},

	/**
  * render
  */
	render: function () {
		return React.createElement(
			'div',
			{ className: 'ple-container' },
			React.createElement(Container_NavTop, {
				ref: 'navTop',
				update: this.updatePreference,
				reset: this.resetPreference,
				preference: this.state.preference }),
			React.createElement(Container_Gridster, {
				ref: 'gridster',
				preference: this.state.preference,
				action: this.state.action,
				dynamicParameter: this.state.dynamicParameter }),
			React.createElement(Container_NavBottom, {
				generate: this.generate })
		);
	}
});