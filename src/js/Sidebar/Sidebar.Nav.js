var Sidebar_Nav = React.createClass({

	displayName: 'Navigation',

	getInitialState: function () {
		return {
			inputFile: React.createElement('input', { type: 'file', onChange: this.upload, multiple: true })
		};
	},

	/**
  * Attach images
  */
	attachImages: function () {
		log('attach image to grid block');
	},

	/**
  * Upload images
  */
	upload: function (e) {
		this.props.upload(e.target.files);

		// reset input[type=file]
		var $input = $(this.refs.inputFile);
		$input.replaceWith($input.val('').clone(true));
	},

	/**
  * render
  */
	render: function () {
		return React.createElement(
			'nav',
			{ className: 'nav-top' },
			React.createElement(
				'div',
				{ className: 'wrap' },
				React.createElement(
					'button',
					{ type: 'button', title: 'attach images', onClick: this.props.attach },
					React.createElement(
						'i',
						{ className: 'sp-ico ico-arrow-left abs' },
						'Moving the image to grid block'
					)
				),
				React.createElement(
					'button',
					{ type: 'button', title: 'toggle select', onClick: this.props.toggleSelect },
					React.createElement(
						'i',
						{ className: 'sp-ico ico-select abs' },
						'Toggle all select'
					)
				),
				React.createElement(
					'span',
					{ title: 'upload images' },
					React.createElement('input', { type: 'file', ref: 'inputFile', onChange: this.upload, multiple: true }),
					React.createElement(
						'i',
						{ className: 'sp-ico ico-upload abs' },
						'upload images'
					)
				),
				React.createElement(
					'button',
					{ type: 'button', title: 'remove images', onClick: this.props.remove },
					React.createElement(
						'i',
						{ className: 'sp-ico ico-trash abs' },
						'remove images'
					)
				)
			)
		);
	}
});
// <button type="button" onClick={this.upload}></button>