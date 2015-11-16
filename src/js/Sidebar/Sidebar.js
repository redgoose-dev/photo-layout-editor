var Sidebar = React.createClass({

	displayName: 'Sidebar',

	getInitialState: function () {
		return {
			uploadImages: [{
				on: false,
				style: { backgroundImage: 'url(./assets/img/tmp-simg-01.jpg)' }
			}, {
				on: false,
				style: { backgroundImage: 'url(./assets/img/tmp-simg-02.jpg)' }
			}, {
				on: false,
				style: { backgroundImage: 'url(./assets/img/tmp-simg-03.jpg)' }
			}, {
				on: false,
				style: { backgroundImage: 'url(./assets/img/tmp-simg-04.jpg)' }
			}]
		};
	},

	upload: function () {
		log('upload file');
	},

	remove: function () {
		log('remove file');
	},

	attach: function () {
		log('attach file');
	},

	update: function (data) {
		this.setState({ uploadImages: data });
	},

	/**
  * render
  */
	render: function () {
		return React.createElement(
			'aside',
			{ className: 'ple-sidebar' },
			React.createElement(Sidebar_Nav, { upload: this.upload, remove: this.remove, attach: this.attach }),
			React.createElement(Sidebar_UploadFiles, { uploadImages: this.state.uploadImages, update: this.update })
		);
	}
});