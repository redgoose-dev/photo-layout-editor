const util = require('../lib/util.js');


module.exports = React.createClass({

	displayName : 'Item',
	$figure : null,
	$area : null,
	$img : null,
	dragMeta : {},
	imageMeta : {},
	controlEvent : {
		start : (util.isTouchDevice()) ? 'touchstart' : 'mousedown',
		move : (util.isTouchDevice()) ? 'touchmove' : 'mousemove',
		end : (util.isTouchDevice()) ? 'touchend' : 'mouseup'
	},

	setInitialProps()
	{
		return {
			options : {
				size : 'cover'
			}
		};
	},

	componentDidMount()
	{
		this.$figure = $(this.refs.figure);
		this.$area = $(this.refs.area);

		// act init drag event
		this.initDragEvent(this.$area);
	},

	componentDidUpdate(prevProps, prevState)
	{
		if (this.props.options)
		{
			this.imageMeta = this.props.options;
			if (this.props.options.size !== 'cover')
			{
				let $img = this.$figure.find('> .img-wrap > img');
				this.$area.css({
					left : $img.position().left,
					top : $img.position().top,
					width : $img.width(),
					height : $img.height()
				});
			}
			else
			{
				this.$area.attr('style', '');
			}
		}
	},

	/**
	 * Save drag meta
	 *
	 * @param {event} e
	 * @param {object} $container
	 */
	saveDragMeta(e, $container)
	{
		var obj = {
			containerWidth : $container.width(),
			containerHeight : $container.height(),
			containerLeft : $container.offset().left,
			containerTop : $container.offset().top,
			mouseX : (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft(),
			mouseY : (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop(),
			evnt : e
		};

		if (typeof e.originalEvent.touches !== 'undefined')
		{
			obj.touches = [];
			$.each(e.originalEvent.touches, function(i, ob){
				obj.touches[i] = {};
				obj.touches[i].clientX = 0 + ob.clientX;
				obj.touches[i].clientY = 0 + ob.clientY;
			});
		}

		return obj;
	},

	/**
	 * Save image meta
	 *
	 */
	saveImageMeta()
	{
		if (!this.$area.hasClass('show')) return false;

		this.imageMeta.position = this.$area.position().left + 'px ' + this.$area.position().top + 'px';
		this.imageMeta.size = this.$area.width() + 'px auto';
	},

	/**
	 * Init drag event
	 *
	 */
	initDragEvent()
	{
		this.$figure.on(this.controlEvent.start + '.area', '.area', this.startMoving);
		this.$figure.on(this.controlEvent.start + '.resize', '.resize', this.startResizing);
	},

	/**
	 * Start moving
	 *
	 * @param {event} e
	 */
	startMoving(e)
	{
		e.preventDefault();
		e.stopPropagation();

		// save drag meta
		this.dragMeta = this.saveDragMeta(e, this.$area);

		// set $img
		this.$img = this.$figure.find('img');

		// disable animation
		this.$area.removeClass('animate');
		this.$img.removeClass('animate');

		// init event
		$(document).on(this.controlEvent.move + '.area', this.moving);
		$(document).on(this.controlEvent.end + '.area', this.endMoving);
	},

	/**
	 * Moving
	 *
	 * @param {event} e
	 */
	moving(e)
	{
		let mouse = {};
		let position = {};
		let evt = (e.type == 'touchmove') ? e.originalEvent.touches[0] : e;

		e.preventDefault();
		e.stopPropagation();

		// set mouse position
		mouse.x = (evt.clientX || evt.pageX) + $(window).scrollLeft();
		mouse.y = (evt.clientY || evt.pageY) + $(window).scrollTop();

		// set position x,y
		position.left = mouse.x - ( this.dragMeta.mouseX - this.dragMeta.containerLeft );
		position.top = mouse.y - ( this.dragMeta.mouseY - this.dragMeta.containerTop );

		let cssProperty = {
			'left': position.left,
			'top': position.top
		};

		// set position area
		this.$area.offset(cssProperty);

		// set position image
		this.$img.offset(cssProperty);
	},

	/**
	 * End moving
	 *
	 * @param {event} e
	 */
	endMoving(e)
	{
		e.preventDefault();

		this.dragMeta = {};
		this.$img = null;

		$(document)
			.off(this.controlEvent.move + '.area')
			.off(this.controlEvent.end + '.area');

		this.saveImageMeta();
	},

	/**
	 * Start resize
	 *
	 * @param {event} e
	 */
	startResizing(e)
	{
		e.stopPropagation();

		// save drag meta
		this.dragMeta = this.saveDragMeta(e, this.$area);

		// set $img
		this.$img = this.$figure.find('img');

		// disable animation
		this.$area.removeClass('animate');
		this.$img.removeClass('animate');

		// init event
		$(document).on(this.controlEvent.move + '.resize', this.resizing);
		$(document).on(this.controlEvent.end + '.resize', this.endResizing);
	},

	/**
	 * Start resize
	 *
	 * @param {event} e
	 */
	resizing(e)
	{
		e.preventDefault();

		var width = 0;
		let mouse = {};
		let evt = (e.type == 'touchmove') ? e.originalEvent.touches[0] : e;

		// set mouse position
		mouse.x = (evt.clientX || evt.pageX) + $(window).scrollLeft();
		mouse.y = (evt.clientY || evt.pageY) + $(window).scrollTop();

		width = mouse.x - this.dragMeta.containerLeft;
		//height = mouse.y  - this.dragMeta.containerTop; // free resize

		// set size
		if (width > 30 && width < 1600)
		{
			this.$img.width(width);
			this.$area.width(this.$img.width()).height(this.$img.height());
		}
	},

	/**
	 * End resize
	 *
	 * @param {event} e
	 */
	endResizing(e)
	{
		e.preventDefault();

		this.dragMeta = {};
		this.$img = null;

		$(document)
			.off(this.controlEvent.move + '.resize')
			.off(this.controlEvent.end + '.resize');

		this.saveImageMeta();
	},

	/**
	 * End resize
	 *
	 */
	gotoCenter()
	{
		var position = {
			left : ((this.$figure.width() * 0.5) - (this.$area.width() * 0.5)) + 'px',
			top : ((this.$figure.height() * 0.5) - (this.$area.height() * 0.5)) + 'px'
		};

		// set position area
		this.$area.addClass('animate').css({
			'left': position.left,
			'top': position.top
		});

		// set position image
		if (this.$figure.find('img').length)
		{
			this.$figure.find('img').addClass('animate').css({
				'left': position.left,
				'top': position.top
			});
		}

		this.saveImageMeta();
	},

	/**
	 * Clear
	 *
	 */
	clear()
	{
		this.$area.removeAttr('style');
		this.imageMeta = {};
	},


	/**
	 * render
	 */
	render()
	{
		var styleObject = null;
		var showArea = false;
		var img = null;

		if (this.props.options)
		{
			showArea = (this.props.options.size !== 'cover');
			if (showArea)
			{
				styleObject = {
					'left' : (this.props.options.position.split(' ')[0] + 'px').replace('pxpx', 'px'),
					'top' : (this.props.options.position.split(' ')[1] + 'px').replace('pxpx', 'px'),
					'width' : this.props.options.size.split(' ')[0]
				};
				img = (
					<span className="img-wrap">
						<img src={this.props.options.url} style={styleObject} alt=""/>
					</span>
				);
			}
			else
			{
				styleObject = {
					'backgroundImage' : 'url(' + this.props.options.url + ')',
					'backgroundSize' : this.props.options.size,
					'backgroundPosition' : this.props.options.position
				};
				img = (
					<div className="img-bg" style={styleObject}></div>
				);
			}
		}
		
		return (
			<div ref="figure" className="figure">
				{img}
				<div
					ref="area"
					className={'area' + ((showArea) ? ' show' : '')}>
					<button
						type="button"
						className="resize">resize</button>
				</div>
			</div>
		);
	}
});