var Container_Gridster = React.createClass({

	displayName: 'Gridster',

	$gridster: null,
	gridster: null,
	saveBlocks: null,

	componentDidMount: function () {
		this.$gridster = $(ReactDOM.findDOMNode(this.refs.gridster));
	},

	create: function () {
		var preference = this.props.preference;
		var innnerMargin = preference.inner_margin * 0.5;
		var outerMargin = innnerMargin + preference.outer_margin;

		// set styles
		this.$gridster.css('padding', outerMargin + 'px').append('<ul/>');

		// restore blocks
		if (this.saveBlocks) {
			this.saveBlocks.each(function (k, o) {
				if (parseInt($(o).attr('data-col')) > preference.max_col) {
					$(o).attr('data-col', preference.max_col);
				}
				if (parseInt($(o).attr('data-sizex')) > preference.max_scale) {
					$(o).attr('data-sizex', preference.max_scale);
				}
				if (parseInt($(o).attr('data-sizey')) > preference.max_scale) {
					$(o).attr('data-sizey', preference.max_scale);
				}
			});
			this.$gridster.children('ul').append(this.saveBlocks);
		}

		// resize wrap width
		this.resizeWrapWidth();

		// init gridster
		this.gridster = this.$gridster.children('ul').gridster({
			widget_margins: [innnerMargin, innnerMargin],
			widget_base_dimensions: [preference.width, preference.height],
			max_cols: preference.max_col,
			resize: {
				enabled: true,
				max_size: [preference.max_scale, preference.max_scale]
			}
		}).data('gridster');
	},

	resizeWrapWidth: function () {
		var preference = this.props.preference;
		var width = preference.width * preference.max_col + preference.max_col * preference.inner_margin;
		this.$gridster.width(width);

		var margin_gridster = parseInt(this.$gridster.parent().css('padding-left')) * 2;
		var margin_editor = parseInt($('.ple-editor').css('padding')) * 2;
		var width_sidebar = $('.ple-sidebar').width();
		var bodyWidth = this.$gridster.outerWidth() + margin_gridster + margin_editor + width_sidebar;

		this.props.resizeWidth(bodyWidth);
		//$('main').css('min-width', bodyWidth + 'px');
	},

	clear: function () {
		this.$gridster.find('li').removeAttr('style class');
		this.saveBlocks = $(this.$gridster.children('ul').html());
		this.gridster.destroy(true);
		this.$gridster.children().remove();
		this.$gridster.removeClass('ready').removeAttr('style');
	},

	init: function () {
		this.create();
		this.randomAddBlocks(5, this.props.preference.max_scale, this.props.preference.max_scale);
	},

	updatePreference: function (params) {
		this.clear();
		this.create();
	},

	block: function (params) {
		if (!params.sizeX || !params.sizeY) return false;

		var $li = $('<li>' + (params.text ? params.text : '') + '</li>');
		//$li.on('click', function(){ log('hello') });

		this.gridster.add_widget($li, params.sizeX, params.sizeY, false);
	},

	randomAddBlocks: function (count, max_width, max_height) {
		for (var i = 0; i < count; i++) {
			this.block({
				sizeX: getRandomRange(1, max_width),
				sizeY: getRandomRange(1, max_height)
			});
		}
	},

	addBlock: function (x, y) {
		x = x || 1;
		y = y || 1;
		x = x > this.props.preference.max_scale ? this.props.preference.max_scale : x;
		y = y > this.props.preference.max_scale ? this.props.preference.max_scale : y;
		this.block({ sizeX: x, sizeY: y });
	},

	shuffleBlocks: function () {
		var self = this;

		this.clear();

		this.saveBlocks.each(function (k, o) {
			$(o).attr({
				'data-col': getRandomRange(1, self.props.preference.max_col),
				'data-row': getRandomRange(1, 2),
				'data-sizex': getRandomRange(1, self.props.preference.max_scale),
				'data-sizey': getRandomRange(1, self.props.preference.max_scale)
			});
		});

		this.create();
	},

	/**
  * render
  */
	render: function () {
		// act action
		if (typeof this[this.props.action] === 'function') {
			this[this.props.action]();
		}

		return React.createElement(
			'div',
			{ className: 'gridster-wrap' },
			React.createElement('div', { ref: 'gridster', className: 'gridster' })
		);
	}
});