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
			}
		};
	},

	componentDidMount: function () {
		this.originalPreference = this.state.preference;
	},

	updatePreference: function (params) {
		log(params);
		// TODO : params 값을 토대로 gridster 갱신하기
	},

	resetPreference: function () {
		this.setState({ preference: this.originalPreference });
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
				update: this.updatePreference,
				reset: this.resetPreference,
				preference: this.state.preference }),
			React.createElement(Container_Gridster, { preference: this.state.preference }),
			React.createElement(Container_NavBottom, { generate: this.generate })
		);
	}
});