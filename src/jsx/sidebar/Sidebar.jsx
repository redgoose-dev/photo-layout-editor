const React = require('React');
const ReactDOM = require('ReactDOM');
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
		this.root = this.props.root;
		
		return {
			uploadImages : [],
			is_loading : false,
			show : this.props.show
		};
	},

	componentDidMount()
	{
		this.root.$side = $(ReactDOM.findDOMNode(this));

		if (this.props.defaultImagesScript)
		{
			$.get(this.props.defaultImagesScript, (response) => {
				var result = (response instanceof Array) ? response : JSON.parse(response.replace(/\+/g, '%20'));
				this.importImages(result);
			});
		}

		if (this.props.show)
		{
			this.showSide();
		}
		else
		{
			this.hideSide();
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
	 * Export images
	 *
	 * @return {Array}
	 */
	exportImages()
	{
		var result = [];
		this.state.uploadImages.forEach((o) => {
			if (o.image)
			{
				result.push();
			}
		});
		return result;
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
						console.log(response.message);
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
	 * @param {Array} keys
	 */
	remove(keys)
	{
		if (!keys.length) return false;

		var uploadImages = this.state.uploadImages;
		var removeImages = [];

		keys.forEach((o) => {
			if (uploadImages[o])
			{
				// make remove image list
				removeImages.push(uploadImages[o].image);
				// delete item in uploadImages
				delete uploadImages[o];
			}
		});
		// update state
		this.setState({ uploadImages : uploadImages });

		// remove real image files
		if (this.props.removeScript && removeImages.length)
		{
			$.post(this.props.removeScript, { 'images[]' : removeImages }, (response) => {
				// console.log(response);
			});
		}
	},

	/**
	 * remove select images
	 * 선택되어있는 이미지들을 삭제한다.
	 *
	 */
	removeSelectImages()
	{
		var removeKeys = [];
		var confirmBool = false;

		if (!this.state.uploadImages.length)
		{
			alert('이미지가 없습니다.');
			return;
		}

		// get select items
		var selectedKeys = this.getItems(true);

		if (selectedKeys.length)
		{
			if (confirm('선택한 사진을 삭제할까요?'))
			{
				confirmBool = true;
				removeKeys = selectedKeys;
			}
		}
		else
		{
			if (confirm('선택된 사진이 없습니다. 전부 삭제할까요?'))
			{
				confirmBool = true;
				removeKeys = this.getItems(false);
			}
		}

		// remove images
		if (confirmBool)
		{
			this.remove(removeKeys);
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
			this.root.container.refs.gridster.attachImages(images);
		}
		else
		{
			alert('please select image');
			return false;
		}
	},

	/**
	 * select images
	 *
	 * @param {Array} keys
	 * @param {Boolean} sw
	 *
	 */
	select(keys, sw)
	{
		var items = this.state.uploadImages;
		keys.forEach((o) => {
			items[o].on = sw;
		});
		this.setState({ uploadImages : items });
	},

	/**
	 * Toggle select all items
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
	 * show side
	 *
	 */
	showSide()
	{
		let $app = $(this.root.option.elements.app);
		$app.addClass('on-sidebar');
		this.updateSide(true);
	},

	/**
	 * hide side
	 *
	 */
	hideSide()
	{
		let $app = $(this.root.option.elements.app);
		$app.removeClass('on-sidebar');
		this.updateSide(false);
	},

	/**
	 * hide side
	 *
	 * @param {Boolean} sw
	 */
	updateSide(sw)
	{
		this.setState({ show : sw });
		localStorage.setItem('sidebar', sw);
		this.root.resizeWidthSide(sw);
	},

	/**
	 * Toggle side
	 *
	 */
	toggleSide()
	{
		if (this.state.show)
		{
			this.hideSide();
		}
		else
		{
			this.showSide();
		}
	},

	/**
	 * get items
	 *
	 * @param {Boolean} selected (true : selected images, false : all images)
	 * @return {Array}
	 */
	getItems(selected)
	{
		var keys = [];
		this.state.uploadImages.forEach((o, k) => {
			if ((selected == true && o.on == true) || selected == false)
			{
				keys.push(this.refs.files.$items.children('[data-key=' + k + ']').data('key'));
			}
		});
		return keys;
	},

	/**
	 * render
	 */
	render()
	{
		return (
			<aside className={ 'ple-sidebar' + ((this.state.is_loading) ? ' loading' : '') }>
				<button type="button" onClick={this.toggleSide} className="toggle">
					<span>
						<i className={'sp-ico abs' + ((this.state.show) ? ' ico-arrow-right' : ' ico-arrow-left')}>Toggle sidebar</i>
					</span>
				</button>
                <Nav ref="nav"
					 upload={this.upload}
					 remove={this.removeSelectImages}
					 attach={this.attachSelectImages}
					 toggleSelect={this.toggleSelect} />
                <UploadFiles ref="files"
							 root={this.root}
							 uploadImages={this.state.uploadImages}
							 update={this.update} />
			</aside>
		);
	}
});
