var Sidebar = React.createClass({

	displayName: 'Sidebar',

	upload: function () {
		log('upload file');
	},

	remove: function () {
		log('remove file');
	},

	attach: function () {
		log('attach file');
	},

	/**
  * render
  */
	render: function () {
		return React.createElement(
			'aside',
			{ className: 'ple-sidebar' },
			React.createElement(Sidebar_Nav, { upload: this.upload, remove: this.remove, attach: this.attach }),
			React.createElement(Sidebar_UploadFiles, null)
		);
	}
});