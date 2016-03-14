const util = require('../lib/util.js');

module.exports = React.createClass({

	displayName : 'Gridster',

	$gridster : null,
	gridster : null,
	saveBlocks : null,

	componentDidMount()
	{
		this.$gridster = $(ReactDOM.findDOMNode(this.refs.gridster));
	},

	/**
	 * Create block
	 */
	create()
	{
		var pref = this.props.preference;
		var innnerMargin = pref.inner_margin * 0.5;
		var outerMargin = innnerMargin + pref.outer_margin;

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
			});
			this.$gridster.children('ul').append(this.saveBlocks);
		}

		// resize wrap width
		this.resizeWrapWidth();

		// init gridster
		this.gridster = this.$gridster.children('ul').gridster({
			widget_margins: [innnerMargin, innnerMargin],
			widget_base_dimensions: [pref.width, pref.height],
			max_cols : pref.max_col,
			resize : {
				enabled : true
				,max_size : [pref.max_scale, pref.max_scale]
			}
		}).data('gridster');
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

		var $li = $('<li>' + ((params.text) ? params.text : '') + '</li>');

		this.gridster.add_widget($li, params.sizeX, params.sizeY, false);
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
		var $block = this.$gridster.find('li').not('.attached');

		if (images.length > $block.length)
		{
			let total = images.length - $block.length;
			for (let i=0; i<total; i++)
			{
				this.addBlock();
			}
			$block = this.$gridster.find('li').not('.attached');
		}

		var baskets = [];
		$block.each((k, o) => {
			if (!$(o).children('figure').length && k < images.length)
			{
				baskets.push(o);
			}
		});

		baskets.forEach((o, k) => {
			this.assignImage($(o), images[k]);
		});
	},

	/**
	 * Assign image
	 *
	 * @param {object} $target
	 * @param {string} image
	 */
	assignImage($target, image)
	{
		var $figure = $('<figure/>');
		$figure.css({
			'background-image' : 'url(' + image + ')',
			'background-position' : '50% 50%',
			'background-size' : 'cover'
		});
		$target.addClass('attached').prepend($figure);
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