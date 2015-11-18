var Sidebar = React.createClass({

	displayName: 'Sidebar',

	propTypes: {
		uploadScript: React.PropTypes.string
	},

	uploader: new Uploader(),

	getDefaultProps: function () {
		return {
			uploadScript: null
		};
	},

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
			}],
			is_loading: false
		};
	},

	/**
  * upload images
  *
  * @Param {Files} array
  */
	upload: function (files) {
		var self = this;
		var result = null;
		var uploadFiles = [];

		for (var i = 0; i < files.length; i++) {
			uploadFiles.push(files[i]);
		}

		// on loading
		this.setState({ is_loading: true });

		// action upload
		if (this.props.uploadScript) {
			// is external script upload
			this.uploader.external(this.props.uploadScript, this.props.uploadDir, this.props.uploadUrl, uploadFiles, function (response) {
				self.setState({ is_loading: false });

				if (response.state == 'success') {
					var data = response.images;
					log(data);
					// TODO : 받은 이미지 데이터로 목록에 삽입하기
				} else {
						log(response.message);
					}
			});
		} else {
			// is local upload
			this.setState({ is_loading: true });
			this.uploader.local(uploadFiles, function (data) {
				var result = self.state.uploadImages;
				self.setState({ is_loading: false });

				data.forEach(function (o) {
					result.push({
						on: false,
						style: { backgroundImage: 'url(' + o + ')' }
					});
				});
				self.setState({ uploadImages: result });
			});
		}
	},

	remove: function () {
		var self = this;
		var selectedKeys = [];

		if (!this.state.uploadImages.length) {
			alert('이미지가 없습니다.');
			return;
		}

		this.state.uploadImages.forEach(function (o, k) {
			if (o.on) {
				selectedKeys.push(k);
			}
		});

		if (selectedKeys.length) {
			selectedKeys.forEach(function (o) {
				delete self.state.uploadImages[o];
			});
			this.setState({ uploadImages: self.state.uploadImages });
		} else {
			if (confirm('선택된 사진이 없습니다. 전부 삭제할까요?')) {
				this.setState({ uploadImages: [] });
			}
		}
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
			{ className: 'ple-sidebar' + (this.state.is_loading ? ' loading' : '') },
			React.createElement(Sidebar_Nav, { upload: this.upload, remove: this.remove, attach: this.attach }),
			React.createElement(Sidebar_UploadFiles, { uploadImages: this.state.uploadImages, update: this.update })
		);
	}
});