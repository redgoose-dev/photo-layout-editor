const Item = require('./Item.jsx');


module.exports = React.createClass({

	displayName: 'Cropper',
	$activeElement : null,
	gridster : null,

	getInitialState()
	{
		this.root = this.props.root;

		return {
			show : false,
			color : this.root.preference.gridster.blockColor,
			wrapStyle : null,
			image : null,
			showImageResize : false
		};
	},

	componentDidMount() {},

	/**
	 * resize window event
	 *
	 */
	resize(e)
	{
		if (!this.$activeElement.length) return false;

		this.setState({
			wrapStyle : {
				width : this.$activeElement.width() + 'px',
				height : this.$activeElement.height() + 'px',
				left : this.$activeElement.offset().left + 'px',
				top : this.$activeElement.offset().top + 'px',
				backgroundColor : this.state.color
			}
		});
	},

	/**
	 * open
	 *
	 * @param {object} options
	 */
	open(options)
	{
		if (!options) return false;

		// set active element
		this.$activeElement = options.$selected;

		// update
		this.setState({
			show : true,
			color : options.color,
			image : options.image,
			showImageResize : !(options.image.size == 'cover')
		});

		// on resize event
		$(window).on('resize.cropper', this.resize);

		setTimeout(() => {
			// trigger resize event
			$(window).trigger('resize.cropper');
		}, 30);
	},

	/**
	 * close
	 *
	 */
	close()
	{
		// update
		this.setState({
			show : false,
			wrapStyle : null,
			image : null,
			showImageResize : false
		});

		// off resize event
		$(window).off('resize.cropper');
		
		// update item
		this.updateSelectImage(this.refs.item.imageMeta);
		this.refs.item.clear();
	},

	updateSelectImage(option)
	{
		this.$activeElement.children('figure').css({
			'background-position' : option.position,
			'background-size' : option.size
		}).attr({
			'data-position' : option.position,
			'data-size' : option.size
		});

		// this.refs.item.imageMeta
	},

	/**
	 * Toggle image resize
	 *
	 */
	toggleImageResize()
	{
		var newImage = this.state.image;

		if (this.state.showImageResize)
		{
			this.setState({
				image : {
					url : this.state.image.url,
					size : 'cover',
					position : '50% 50%'
				},
				showImageResize : false
			});
		}
		else
		{
			this.setState({
				image : {
					url : this.state.image.url,
					size : this.$activeElement.width() + 'px auto',
					position : '0 0'
				},
				showImageResize : true
			});
		}
	},

	/**
	 * Go to center image
	 *
	 */
	centerImage()
	{
		this.refs.item.gotoCenter();
	},

	/**
	 * render
	 *
	 */
	render()
	{
		return (
			<div className={'ple-cropper' + ((this.state.show) ? ' show' : '')}>
				<span className="bg"></span>
				<div className="wrap" style={this.state.wrapStyle}>
					<Item ref="item" options={this.state.image} />
					<nav>
						<button type="button" onClick={this.close}>
							<i className="sp-ico ico-close abs">Close cropper</i>
						</button>
						<button type="button" className={(this.state.showImageResize) ? 'active' : ''} onClick={this.toggleImageResize}>
							<i className="sp-ico ico-resize abs">Toggle background size type</i>
						</button>
						{
							(this.state.showImageResize) ? (
								<button type="button" onClick={this.centerImage}>
									<i className="sp-ico ico-reduction abs">Go to center image</i>
								</button>
							) : ''
						}
					</nav>
				</div>
			</div>
		);
	}
});