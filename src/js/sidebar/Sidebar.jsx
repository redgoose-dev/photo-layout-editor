const Uploader = require('../lib/Uploader.js');
const Nav = require('./Nav.jsx');
const UploadFiles = require('./UploadFiles.jsx');


module.exports = React.createClass({

	displayName : 'Sidebar',

	propTypes : {
		uploadScript : React.PropTypes.string,
		defaultUploadFiles : React.PropTypes.array
	},

	uploader : new Uploader(),

	getDefaultProps()
	{
		return {
			uploadScript : null
		};
	},

	getInitialState()
	{
		return {
			uploadImages : this.importImages(this.props.defaultUploadFiles),
			is_loading : false
		};
	},

	/**
	 * Import images
	 *
	 * @param {array} files
	 * @return {array}
	 * */
	importImages(files)
	{
		files = files || [];
		return files.map((o) => {
			return {
				on : false,
				image : o,
				style : { backgroundImage : 'url(' + o + ')' }
			};
		});
	},

	/**
	 * upload images
	 *
	 * @Param {Files} files
	 */
	upload(files)
	{
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
				(response) => {
					this.setState({ is_loading : false });

					if (response.state == 'success')
					{
						var data = response.images;

						data.forEach((o) => {
							this.state.uploadImages.push({
								on : false,
								image : o.loc,
								style : { backgroundImage : 'url(' + o.loc + ')' }
							});
						});
						this.setState({
							uploadImages : this.state.uploadImages
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
			this.uploader.local(uploadFiles, (data) => {
				var result = this.state.uploadImages;
				this.setState({ is_loading : false });

				data.forEach((o) => {
					result.push({
						on : false,
						image : o,
						style : { backgroundImage : 'url(' + o + ')' }
					});
				});
				this.setState({ uploadImages : result });
			});
		}
	},

	remove()
	{
		var selectedKeys = [];

		if (!this.state.uploadImages.length)
		{
			alert('이미지가 없습니다.');
			return;
		}

		this.state.uploadImages.forEach((o, k) => {
			if (o.on)
			{
				selectedKeys.push(k);
			}
		});

		if (selectedKeys.length)
		{
			selectedKeys.forEach((o) => {
				delete this.state.uploadImages[o];
			});
			this.setState({ uploadImages : this.state.uploadImages });
		}
		else
		{
			if (confirm('선택된 사진이 없습니다. 전부 삭제할까요?'))
			{
				this.setState({ uploadImages : [] });
			}
		}
	},

	attach()
	{
		var items = [];
		this.state.uploadImages.forEach((o) => {
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

	toggleSelect()
	{
		var items = this.state.uploadImages;
		var $items = $(ReactDOM.findDOMNode(this.refs.files));
		var sw = ($items.find('span.on').length > 0);
		items.forEach((o) => {
			o.on = (!sw);
		});
		this.setState({ uploadImages : items });
	},

	update(data)
	{
		this.setState({ uploadImages : data });
	},


	/**
	 * render
	 */
	render()
	{
		return (
			<aside className={ 'ple-sidebar' + ((this.state.is_loading) ? ' loading' : '') }>
				<button type="button" onClick={this.props.toggleSidebar} className="toggle">
					<span>
						<i className={'sp-ico abs' + ((this.props.show) ? ' ico-arrow-right' : ' ico-arrow-left')}>Toggle sidebar</i>
					</span>
				</button>
                <Nav ref="nav"
					 upload={this.upload}
					 remove={this.remove}
					 attach={this.attach}
					 toggleSelect={this.toggleSelect} />
                <UploadFiles ref="files"
							 uploadImages={this.state.uploadImages}
							 update={this.update} />
			</aside>
		);
	}
});
