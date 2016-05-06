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
			uploadScript : null,
			removeScript : null,
			defaultImagesScript : null,
			show : false,
			toggleSidebar : null
		};
	},

	getInitialState()
	{
		return {
			uploadImages : [],
			is_loading : false
		};
	},

	componentDidMount()
	{
		if (this.props.defaultImagesScript)
		{
			$.get(this.props.defaultImagesScript, (response) => {
				var result = (response instanceof Array) ? response : JSON.parse(response.replace(/\+/g, '%20'));
				this.importImages(result);
			});
		}
	},

	/**
	 * Import images
	 *
	 * @param {Array} files
	 */
	importImages(files)
	{
		var result = this.state.uploadImages;
		if (files.length)
		{
			files.forEach((o) => {
				if (o)
				{
					result.push({
						on : false,
						image : o,
						style : { backgroundImage : 'url(' + o + ')' }
					});
				}
			});
		}
		this.setState({ uploadImages : result });
	},

	/**
	 * Upload images
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
						this.importImages(response.images.map((o) => { return o.loc; }));
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
				this.setState({ is_loading : false });
				this.importImages(data);
			});
		}
	},

	/**
	 * Remove items
	 *
	 */
	remove()
	{
		// TODO : remove()와 removeSelect()메서드를 분리하여 다른방식으로 이미지를 선택하여 삭제할 수 있도록 해야함.
		var selectedKeys = [];
		var removeImages = [];
		var confirmBool = false;

		if (!this.state.uploadImages.length)
		{
			alert('이미지가 없습니다.');
			return;
		}

		// get select items
		this.state.uploadImages.forEach((o, k) => {
			if (o.on)
			{
				selectedKeys.push(k);
			}
		});

		// TODO : 여기서부터 remove()메서드에서 할일
		if (selectedKeys.length)
		{
			if (confirm('선택한 사진을 삭제할까요?'))
			{
				confirmBool = true;
				selectedKeys.forEach((o) => {
					removeImages.push(this.state.uploadImages[o].image);
					delete this.state.uploadImages[o];
				});
				this.setState({ uploadImages : this.state.uploadImages });
			}
		}
		else
		{
			if (confirm('선택된 사진이 없습니다. 전부 삭제할까요?'))
			{
				confirmBool = true;
				removeImages = this.state.uploadImages.map((o) => {
					return o.image;
				});
				this.setState({ uploadImages : [] });
			}
		}

		// remove real image files
		if (this.props.removeScript && confirmBool && removeImages.length)
		{
			$.post(this.props.removeScript, { 'images[]' : removeImages }, (response) => {
				//log(response);
			});
		}
	},

	/**
	 * attach select images
	 * 선택되어있는 이미지를 gridster에 붙인다.
	 *
	 */
	attachSelectImages()
	{
		var items = [];
		this.state.uploadImages.forEach((o) => {
			if (o.on) items.push(o.image);
		});
		this.attchImages(items);
	},

	/**
	 * attach images by key
	 * 사이드바에 있는 key 번호를 선택하여 gridster에 이미지를 붙인다.
	 * 
	 * @param {Array} key
	 */
	attachImagesByKey(key)
	{
		if (!key.length) return false;

		var items = [];
		key.forEach((i) => {
			if (this.state.uploadImages[i] && this.state.uploadImages[i].image)
			{
				items.push(this.state.uploadImages[i].image);
			}
		});
		this.attchImages(items);
	},

	/**
	 * attach images
	 *
	 * @param {Array} images
	 *
	 */
	attchImages(images)
	{
		if (images.length)
		{
			window.PLE.refs.container.refs.gridster.attachImages(images);
		}
		else
		{
			alert('please select image');
			return false;
		}
	},

	/**
	 * Toggle select items
	 *
	 */
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

	/**
	 * Update items
	 *
	 * @param {array} data
	 */
	update(data)
	{
        if (!data) return false;
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
					 attach={this.attachSelectImages}
					 toggleSelect={this.toggleSelect} />
                <UploadFiles ref="files"
							 uploadImages={this.state.uploadImages}
							 update={this.update} />
			</aside>
		);
	}
});
