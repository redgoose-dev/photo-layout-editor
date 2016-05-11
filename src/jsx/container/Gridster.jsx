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
		this.parent = this.props.parent;
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
		setTimeout(() => {
			this.unSelectBlock(null);
		}, 50);
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

		this.props.root.resizeWidthContainer(bodyWidth);
	},

	/**
	 * Clear blocks
	 *
	 * @param {boolean} save
	 */
	clear(save)
	{
		this.$gridster.find('li').removeAttr('style class');
		this.saveBlocks = (save) ? $(this.$gridster.children('ul').html()) : null;
		this.gridster.destroy(true);
		this.$gridster.children().remove();
		this.$gridster.removeClass('ready').removeAttr('style');
	},

	/**
	 * Init gridster
	 */
	init()
	{
		let pref = window.plePreference.gridster;

		// create gridster
		this.create();

		// make random blocks
		if (pref.params)
		{
			this.importParams(pref.params);
		}
		else if (pref.createNow)
		{
			this.randomAddBlocks(
				(pref.createCount || 5),
				this.props.preference.max_scale,
				this.props.preference.max_scale
			);
		}
	},

	/**
	 * Reset gridster
	 *
	 * @param {boolean} save
	 */
	reset(save)
	{
		this.clear(!!(save));
		this.create();
	},

	/**
	 * Import params
	 *
	 * @param {Array} arr
	 */
	importParams(arr)
	{
		if (!arr.length) return false;

		arr.forEach((o) => {
			this.block({
				col : o.col,
				row : o.row,
				size_x : o.size_x,
				size_y : o.size_y
			});
		});
	},

	/**
	 * Make block
	 *
	 * @param {Object} params
	 * @param {int} params.col
	 * @param {int} params.row
	 * @param {int} params.size_x
	 * @param {int} params.size_y
	 * @param {String} params.classNames
	 * @param {String} params.color
	 * @param {String} params.text
	 */
	block(params)
	{
		if (!params.col || !params.row) return false;

		let $li = $('<li' +
			((params.classNames) ? ' class="' + params.classNames + '"' : '') +
			' data-color="' + ((params.color) ? params.color : this.defaultBlockColor) + '"' +
			' style="background: ' + ((params.color) ? params.color : this.defaultBlockColor) + '">' +
			((params.text) ? params.text : '') +
			'</li>');

		// add gridster
		if (params.size_x)
		{
			this.gridster.add_widget(
				$li,
				(params.size_x || 1),
				(params.size_y || 1),
				params.col,
				params.row
			);
		}
		else
		{
			this.gridster.add_widget( $li, params.col, params.row, false );
		}

		// init event
		this.initBlockEvent($li);
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
		this.block({ col : x, row : y });
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
				col : util.getRandomRange(1, max_width),
				row : util.getRandomRange(1, max_height)
			});
		}
	},

	/**
	 * get selected blocks
	 *
	 * @return {object}
	 */
	getSelectedBlocks()
	{
		return this.$gridster.find('li.' + this.selectedClassName);
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
			this.onSelectBlock($(e.currentTarget));
		});
	},

	/**
	 * Remove block
	 *
	 * @param {object} $target
	 */
	removeBlock($target)
	{
		$target.each((k, o) => {
			this.gridster.remove_widget(o, null, null, true);
		});
		this.unSelectBlock(null);
	},

	/**
	 * Empty block
	 * clear image in block
	 *
	 * @param {object} $target
	 */
	emptyBlock($target)
	{
		$target.each((k, v) => {
			if ($(v).hasClass('attached'))
			{
				$(v).removeClass('attached').children('figure').remove();
			}
		});
	},

	/**
	 * Duplicate block
	 *
	 * @param {object} $target
	 */
	duplicateBlock($target)
	{
		$target.each((k, v) => {
			this.block({
				col : parseInt(v.getAttribute('data-sizex')),
				row : parseInt(v.getAttribute('data-sizey')),
				color : v.getAttribute('data-color'),
				text : ($(v).hasClass('attached')) ? $(v).children('figure').prop('outerHTML') : '',
				classNames : ($(v).hasClass('attached')) ? 'attached' : ''
			});
		});
	},

	/**
	 * Select block by click
	 *
	 * @param {object} $block
	 */
	onSelectBlock($block)
	{
		var $blocks = this.$gridster.find('li');

		if ($block.hasClass(this.selectedClassName))
		{
			this.unSelectBlock((window.PLE.keyboardEvent.readySelect) ? $block : $blocks);

			if (!this.getSelectedBlocks().length)
			{
				this.props.selectBlock(null);
			}
		}
		else
		{
			if (!window.PLE.keyboardEvent.readySelect)
			{
				$blocks.removeClass(this.selectedClassName);
			}
			this.selectBlock($block);
		}
	},

	/**
	 * Select block
	 *
	 * @param {object} $target
	 */
	selectBlock($target)
	{
		var $blocks = this.$gridster.find('li');
		if (!$target)
		{
			$target = $blocks;
		}

		$target.addClass(this.selectedClassName);
		this.props.selectBlock($blocks.filter('.' + this.selectedClassName));

		this.$wrap.off('click.gridsterBlock').on('click.gridsterBlock', (e) => {
			this.unSelectBlock($blocks);
		});
	},
	
	/**
	 * unselect block
	 *
	 * @param {object} $target
	 */
	unSelectBlock($target)
	{
		$target = $target || this.$gridster.find('li');

		$target.removeClass(this.selectedClassName);

		if (!this.getSelectedBlocks().length)
		{
			this.props.selectBlock(null);
			this.$wrap.off('click.gridsterBlock');
		}
	},

	/**
	 * Shuffle blocks
	 */
	shuffleBlocks()
	{
		var scrollTop = $(window).scrollTop();
		this.clear(true);

		this.saveBlocks.each((k, o) => {
			$(o).attr({
				'data-col' : util.getRandomRange(1, this.props.preference.max_col),
				'data-row' : util.getRandomRange(1, 2),
				'data-sizex' : util.getRandomRange(1, this.props.preference.max_scale),
				'data-sizey' : util.getRandomRange(1, this.props.preference.max_scale)
			});
		});
		this.create();

		$(window).scrollTop(scrollTop);
	},

	/**
	 * Attach images
	 * 빈 블럭에 이미지들을 붙여넣는 작업을 한다.
	 * 만약 블럭의 갯수가 모자라면 블럭을 추가로 만들고 이미지를 붙여넣는다.
	 *
	 * @param {Array} images
	 */
	attachImages(images)
	{
		var $blocks = this.$gridster.find('li').not('.attached');

		if (images.length > $blocks.length)
		{
			let total = images.length - $blocks.length;
			for (let i=0; i<total; i++)
			{
				this.addBlock(1,1);
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
	},

	/**
	 * Assign image
	 * 블럭 하나에다 이미지를 붙이는 작업을 한다.
	 *
	 * @param {object} $target
	 * @param {string} image
	 * @param {object} imageOptions
	 */
	assignImage($target, image, imageOptions)
	{
		if (!$target.length) return false;

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
	 * @param {object} $target
	 * @param {string} color
	 */
	changeBlockColor($target, color)
	{
		if (!$target || !$target.length) return false;
		color = color || this.defaultBlockColor;
		$target.each((k, v) => {
			$(v).attr('data-color', color).css('backgroundColor', color);
		});
	},

	/**
	 * render
	 */
	render()
	{
		// act action
		switch(this.props.action)
		{
			case 'updatePreference':
				this.reset(true);
				break;
			default:
				if (typeof this[this.props.action] === 'function')
				{
					this[this.props.action]();
				}

				break;
		}

		return (
            <div className="gridster-wrap">
				<div ref="gridster" className="gridster" id={window.plePreference.gridster.nameID}></div>
        	</div>
		);
	}
});