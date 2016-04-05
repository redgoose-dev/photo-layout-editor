const React = require('React');
const ReactDOM = require('ReactDOM');
const util = require('../lib/util.js');

module.exports = React.createClass({

	displayName : 'Gridster',

	$gridster : null,
	$wrap : null,
	gridster : null,
	saveBlocks : null,
	selectedClassName : 'selected',
	defaultBlockColor : window.plePreference.block.defaultColor,

	componentDidMount()
	{
		this.$gridster = $(ReactDOM.findDOMNode(this.refs.gridster));
		this.$wrap = this.$gridster.parent();
	},

	/**
	 * Create block
	 */
	create()
	{
		var pref = this.props.preference;
		var innerMargin = pref.inner_margin * 0.5;
		var outerMargin = innerMargin + pref.outer_margin;

		// set styles
		this.$gridster.css('padding', outerMargin+'px').append('<ul/>');

		// restore blocks
		if (this.saveBlocks)
		{
			this.saveBlocks.each((k, o) => {
				if (parseInt($(o).attr('data-col')) > pref.max_col)
				{
					$(o).attr('data-col', pref.max_col);
				}
				if (parseInt($(o).attr('data-sizex')) > pref.max_scale)
				{
					$(o).attr('data-sizex', pref.max_scale);
				}
				if (parseInt($(o).attr('data-sizey')) > pref.max_scale)
				{
					$(o).attr('data-sizey', pref.max_scale);
				}
				if ($(o).children('figure').length)
				{
					$(o).addClass('attached');
				}
				if ($(o).attr('data-color'))
				{
					$(o).css('background-color', $(o).attr('data-color'));
				}

				$(o).children('.gs-resize-handle').remove();
			});
			this.$gridster.children('ul').append(this.saveBlocks);
		}

		// resize wrap width
		this.resizeWrapWidth();

		// init gridster
		this.gridster = this.$gridster.children('ul').gridster({
			widget_margins: [innerMargin, innerMargin],
			widget_base_dimensions: [pref.width, pref.height],
			max_cols : pref.max_col,
			resize : {
				enabled : true
				,max_size : [pref.max_scale, pref.max_scale]
			}
		}).data('gridster');

		// init block event
		if (this.$gridster.find('li').length)
		{
			this.initBlockEvent(this.$gridster.find('li'));
		}

		// act unselected
		this.unSelectBlock();
	},

	/**
	 * Resize container
	 */
	resizeWrapWidth()
	{
		var pref = this.props.preference;
		var width = (pref.width * pref.max_col) + ((pref.max_col) * pref.inner_margin);
		this.$gridster.width(width);

		var margin_gridster = parseInt(this.$gridster.parent().css('padding-left')) * 2;
		var margin_editor = parseInt($('.ple-editor').css('padding')) * 2;
		var width_sidebar = $('.ple-sidebar').width();
		var bodyWidth = this.$gridster.outerWidth() + margin_gridster + margin_editor + width_sidebar;

		this.props.resizeWidth(bodyWidth);
	},

	/**
	 * Clear blocks
	 */
	clear()
	{
		this.$gridster.find('li').removeAttr('style class');
		this.saveBlocks = $(this.$gridster.children('ul').html());
		this.gridster.destroy(true);
		this.$gridster.children().remove();
		this.$gridster.removeClass('ready').removeAttr('style');
	},

	/**
	 * Init gridster
	 */
	init()
	{
		this.create();
		this.randomAddBlocks(5, this.props.preference.max_scale, this.props.preference.max_scale);
	},

	/**
	 * Update preference
	 */
	updatePreference()
	{
		this.clear();
		this.create();
	},

	/**
	 * Make block
	 *
	 * @param {object} params
	 */
	block(params)
	{
		if (!params.sizeX || !params.sizeY) return false;

		var $li = $('<li' +
			((params.classNames) ? ' class="' + params.classNames + '"' : '') +
			' data-color="' + ((params.color) ? params.color : this.defaultBlockColor) +
			'" style="background: ' + ((params.color) ? params.color : this.defaultBlockColor) + '">' +
			((params.text) ? params.text : '') +
			'</li>');

		// add gridster
		this.gridster.add_widget($li, params.sizeX, params.sizeY, false);

		// init event
		this.initBlockEvent($li);
	},

	/**
	 * Init block event
	 *
	 * @param {object} $block
	 */
	initBlockEvent($block)
	{
		$block.on('click', (e) => {
			e.stopPropagation();
			this.selectBlock($(e.currentTarget));
		});
	},

	/**
	 * Remove block
	 */
	removeBlock()
	{
		this.$gridster.find('li.' + this.selectedClassName).each((k, o) => {
			this.gridster.remove_widget(o, null, null, true);
		});
		this.unSelectBlock();
	},

	/**
	 * Empty block
	 */
	emptyBlock()
	{
		this.$gridster.find('li.' + this.selectedClassName).each((k, v) => {
			if ($(v).hasClass('attached'))
			{
				$(v).removeClass('attached').children('figure').remove();
			}
		});
	},

	/**
	 * Duplicate block
	 */
	duplicateBlock()
	{
		this.$gridster.find('li.' + this.selectedClassName).each((k, v) => {
			this.block({
				sizeX : parseInt(v.getAttribute('data-sizex')),
				sizeY : parseInt(v.getAttribute('data-sizey')),
				color : v.getAttribute('data-color'),
				text : ($(v).hasClass('attached')) ? $(v).children('figure').prop('outerHTML') : '',
				classNames : ($(v).hasClass('attached')) ? 'attached' : ''
			});
		});
	},

	/**
	 * Select block
	 *
	 * @param {object} $block
	 */
	selectBlock($block)
	{
		var $blocks = this.$gridster.find('li');

		if ($block.hasClass(this.selectedClassName))
		{
			if (window.keyboardEvent.readySelect)
			{
				$block.removeClass(this.selectedClassName);
			}
			else
			{
				$blocks.removeClass(this.selectedClassName);
			}

			if (!this.$gridster.find('li.' + this.selectedClassName).length)
			{
				this.props.selectBlock(null);
			}
		}
		else
		{
			if (window.keyboardEvent.readySelect)
			{
				$block.addClass(this.selectedClassName);
			}
			else
			{
				$blocks.removeClass(this.selectedClassName);
				$block.addClass(this.selectedClassName);
			}

			this.props.selectBlock($blocks.filter('.' + this.selectedClassName));

			this.$wrap.off('click.gridsterBlock').on('click.gridsterBlock', (e) => {
				$blocks.removeClass(this.selectedClassName);
				this.props.selectBlock(null);
				$(e.currentTarget).off('click.gridsterBlock');
			});
		}
	},

	/**
	 * unselect block
	 *
	 */
	unSelectBlock()
	{
		setTimeout(() => {
			this.$wrap.trigger('click.gridsterBlock');
		}, 50);
	},

	/**
	 * Random add blocks
	 *
	 * @param {int} count
	 * @param {int} max_width
	 * @param {int} max_height
	 */
	randomAddBlocks(count, max_width, max_height)
	{
		for (var i=0; i<count; i++)
		{
			this.block({
				sizeX : util.getRandomRange(1, max_width),
				sizeY : util.getRandomRange(1, max_height)
			});
		}
	},

	/**
	 * Add block
	 *
	 * @param {int} x
	 * @param {int} y
	 */
	addBlock(x, y)
	{
		x = x || 1;
		y = y || 1;
		x = (x > this.props.preference.max_scale) ? this.props.preference.max_scale : x;
		y = (y > this.props.preference.max_scale) ? this.props.preference.max_scale : y;
		this.block({ sizeX : x, sizeY : y });
	},

	/**
	 * Shuffle blocks
	 */
	shuffleBlocks()
	{
		this.clear();

		this.saveBlocks.each((k, o) => {
			$(o).attr({
				'data-col' : util.getRandomRange(1, this.props.preference.max_col),
				'data-row' : util.getRandomRange(1, 2),
				'data-sizex' : util.getRandomRange(1, this.props.preference.max_scale),
				'data-sizey' : util.getRandomRange(1, this.props.preference.max_scale)
			});
		});

		this.create();
	},

	/**
	 * Attach images
	 *
	 * @param {array} images
	 */
	attachImages(images)
	{
		var $blocks = this.$gridster.find('li').not('.attached');

		if (images.length > $blocks.length)
		{
			let total = images.length - $blocks.length;
			for (let i=0; i<total; i++)
			{
				this.addBlock();
			}
			$blocks = this.$gridster.find('li').not('.attached');
		}

		var baskets = [];
		$blocks.each((k, o) => {
			if (!$(o).children('figure').length && k < images.length)
			{
				baskets.push(o);
			}
		});

		baskets.forEach((o, k) => {
			this.assignImage($(o), images[k], null);
		});

		// act unselected
		this.unSelectBlock();
	},

	/**
	 * Assign image
	 *
	 * @param {object} $target
	 * @param {string} image
	 * @param {object} imageOptions
	 */
	assignImage($target, image, imageOptions)
	{
		var $figure = $('<figure/>');
		$figure.css({
			'background-image' : 'url(' + image + ')',
			'background-position' : (imageOptions) ? imageOptions.position : '50% 50%',
			'background-size' : (imageOptions) ? imageOptions.size : 'cover'
		}).attr({
			'data-image' : image,
			'data-position' : (imageOptions) ? imageOptions.position : '50% 50%',
			'data-size' : (imageOptions) ? imageOptions.size : 'cover'
		});
		$target.addClass('attached').prepend($figure);

		if ($target.hasClass(this.selectedClassName))
		{
			this.props.selectBlock($target);
		}
	},

	/**
	 * Change block color
	 *
	 * @param {string} color
	 */
	changeBlockColor(color)
	{
		color = color || this.defaultBlockColor;
		this.$gridster.find('li.' + this.selectedClassName).each((k, v) => {
			$(v).attr('data-color', color).css('backgroundColor', color);
		});
	},

	/**
	 * render
	 */
	render()
	{
		// act action
		if (typeof this[this.props.action] === 'function')
		{
			this[this.props.action]();
		}

		return (
            <div className="gridster-wrap">
				<div ref="gridster" className="gridster" id="gridster"></div>
        	</div>
		);
	}
});