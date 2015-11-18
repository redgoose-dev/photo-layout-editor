var Sidebar = React.createClass({

	displayName : 'Sidebar',

	propTypes : {
		uploadScript : React.PropTypes.string
	},

	uploader : new Uploader(),

	getDefaultProps : function()
	{
		return {
			uploadScript : null
		};
	},

	getInitialState : function()
	{
		return {
			uploadImages : [
				{
					on : false,
					image : './assets/img/tmp-simg-01.jpg',
					style : { backgroundImage : 'url(./assets/img/tmp-simg-01.jpg)' }
				},
				{
					on : false,
					image : './assets/img/tmp-simg-02.jpg',
					style : { backgroundImage : 'url(./assets/img/tmp-simg-02.jpg)' }
				},
				{
					on : false,
					image : './assets/img/tmp-simg-03.jpg',
					style : { backgroundImage : 'url(./assets/img/tmp-simg-03.jpg)' }
				},
				{
					on : false,
					image : './assets/img/tmp-simg-04.jpg',
					style : { backgroundImage : 'url(./assets/img/tmp-simg-04.jpg)' }
				}
			],
			is_loading : false
		};
	},

	/**
	 * upload images
	 *
	 * @Param {Files} array
	 */
	upload : function(files)
	{
		var self = this;
		var result = null;
		var uploadFiles = [];

		for (var i=0; i<files.length; i++)
		{
			uploadFiles.push(files[i]);
		}

		// on loading
		this.setState({ is_loading : true });

		// action upload
		if (this.props.uploadScript)
		{
			// is external script upload
			this.uploader.external(
				this.props.uploadScript,
				this.props.uploadDir,
				this.props.uploadUrl,
				uploadFiles,
				function(response){
					self.setState({ is_loading : false });

					if (response.state == 'success')
					{
						var data = response.images;

						data.forEach(function(o){
							self.state.uploadImages.push({
								on : false,
								image : o.loc,
								style : { backgroundImage : 'url(' + o.loc + ')' }
							});
						});
						self.setState({
							uploadImages : self.state.uploadImages
						});
					}
					else
					{
						log(response.message);
					}
				}
			);
		}
		else
		{
			// is local upload
			this.setState({ is_loading : true });
			this.uploader.local(uploadFiles, function(data){
				var result = self.state.uploadImages;
				self.setState({ is_loading : false });

				data.forEach(function(o){
					result.push({
						on : false,
						image : o,
						style : { backgroundImage : 'url(' + o + ')' }
					});
				});
				self.setState({ uploadImages : result });
			});
		}
	},

	remove : function()
	{
		var self = this;
		var selectedKeys = [];

		if (!this.state.uploadImages.length)
		{
			alert('이미지가 없습니다.');
			return;
		}

		this.state.uploadImages.forEach(function(o, k){
			if (o.on)
			{
				selectedKeys.push(k);
			}
		});

		if (selectedKeys.length)
		{
			selectedKeys.forEach(function(o){
				delete self.state.uploadImages[o];
			});
			this.setState({ uploadImages : self.state.uploadImages });
		}
		else
		{
			if (confirm('선택된 사진이 없습니다. 전부 삭제할까요?'))
			{
				this.setState({ uploadImages : [] });
			}
		}
	},

	attach : function()
	{
		var items = [];
		this.state.uploadImages.forEach(function(o){
			if (o.on)
			{
				items.push(o.image);
			}
		});
		if (items.length)
		{
			this.props.attachImages(items);
		}
		else
		{
			alert('please select image');
			return false;
		}
	},

	toggleSelect : function()
	{
		var items = this.state.uploadImages;
		var $items = $(ReactDOM.findDOMNode(this.refs.files));
		var sw = ($items.find('span.on').length > 0);
		items.forEach(function(o){
			o.on = (!sw);
		});
		this.setState({ uploadImages : items });
	},

	update : function(data)
	{
		this.setState({ uploadImages : data });
	},

	/**
	 * render
	 */
	render : function()
	{
		return (
			<aside className={'ple-sidebar' + ((this.state.is_loading) ? ' loading' : '')}>
                <Sidebar_Nav ref="nav" upload={this.upload} remove={this.remove} attach={this.attach} toggleSelect={this.toggleSelect} />
                <Sidebar_UploadFiles ref="files" uploadImages={this.state.uploadImages} update={this.update} />
			</aside>
		);
	}
});
