var Sidebar_Nav = React.createClass({

	displayName: 'Navigation',

	// TODO : 이미지 업로드 만들기

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
		for (var i = 0; i < e.target.files.length; i++) {
			log(e.target.files[i]);
		}
		e.target.select();
		log(document.selection);
		//document.selection.clear();
	},

	/**
  * Remove images
  */
	remove: function () {
		log('remove image');
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
					{ type: 'button', title: 'attach images', onClick: this.attachImages },
					React.createElement(
						'i',
						{ className: 'sp-ico ico-arrow-left abs' },
						'Moving the image to grid block'
					)
				),
				React.createElement(
					'span',
					{ title: 'upload images' },
					React.createElement('input', { type: 'file', onChange: this.upload, multiple: true }),
					React.createElement(
						'i',
						{ className: 'sp-ico ico-upload abs' },
						'upload images'
					)
				),
				React.createElement(
					'button',
					{ type: 'button', title: 'remove images', onClick: this.remove },
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