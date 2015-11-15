var Container = React.createClass({

	displayName: 'Container',

	updatePreference: function (params) {
		log('trigger update setting');
		log(params);
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
			React.createElement(Container_NavTop, { update: this.updatePreference }),
			React.createElement(Container_Gridster, null),
			React.createElement(Container_NavBottom, { generate: this.generate })
		);
	}
});