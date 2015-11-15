var Container_NavBottom = React.createClass({

	displayName: 'Nav-bottom',

	actGenerator: function () {
		log('ACTION GENERATE');
	},

	/**
  * render
  */
	render: function () {
		return React.createElement(
			'nav',
			{ className: 'nav-bottom' },
			React.createElement(
				'button',
				{ type: 'button', title: 'Generate export', onClick: this.props.generate },
				React.createElement('i', { className: 'sp-ico ico-check' }),
				React.createElement(
					'span',
					null,
					'Generate'
				)
			)
		);
	}
});