const React = require('React');
const ReactDOM = require('ReactDOM');

// load libs
const KeyboardEvent = require('./lib/KeyboardEvent.js');

// init components
const Container = require('./container/Container.jsx');
const Sidebar = require('./sidebar/Sidebar.jsx');
const Cropper = require('./cropper/Cropper.jsx');
const Result = require('./result/Result.jsx');
const API = require('./API.js');
const Export = require('./lib/Export.js');



// Photo layout editor object
window.PLE = {
	
	// components
	container : null,
	side : null,
	cropper : null,
	result : null,
	keyboardEvent : null,
	
	// API
	api : new API(),

	// export
	export : Export,
	
	// elements
	$app : null,
	$container : null,
	$side : null,
	
	option : {},
	saveWidth : 0,

	init(options)
	{
		this.option = options;

		// set elements
		this.$app = $(this.option.elements.app);
		
		// init preference
		this.preference = this.mergePreference(this.option.preference);
		
		// init container
		this.container = ReactDOM.render(<Container root={this} resizeWidth="" />, options.elements.container);

		// init side
		this.side = ReactDOM.render(
			(
				<Sidebar
					root={this}
					uploadScript={this.preference.uploadScript}
					removeScript={this.preference.removeScript}
					defaultImagesScript={this.preference.defaultImagesScript}
					show={this.preference.showSide}
					toggleSidebar={this.toggleSidebar} />
			),
			this.option.elements.side
		);

		// init Cropper
		this.cropper = ReactDOM.render(<Cropper root={this} />, this.option.elements.cropper);

		// ini result
		this.result = ReactDOM.render(<Result root={this} />, this.option.elements.result);

		// init keyboard event
		this.keyboardEvent = new KeyboardEvent();

		// init Export
		this.export.init(this.container);
		
		// init API
		this.api.init(this);

		// play gridster
		this.container.actGridster();
	},

	/**
	 * resize width in the side
	 *
	 * @param {Boolean} showSide
	 */
	resizeWidthSide(showSide)
	{
		this.saveWidth = (showSide) ? this.saveWidth + this.$side.width() : this.saveWidth - this.$side.width();
		this.$app.css('min-width', this.saveWidth);
	},

	/**
	 * resize width in the container
	 *
	 * @param {int} width
	 */
	resizeWidthContainer(width)
	{
		this.saveWidth = (this.side.state.show) ? width : width - this.$side.width();
		this.$app.css('min-width', this.saveWidth);
	},

	/**
	 * merge preference
	 *
	 * @param {Object} userPreference
	 */
	mergePreference(userPreference)
	{
		var pref = {
			uploadScript : '',
			removeScript : '',
			defaultImagesScript : '',
			replaceScript : '',
			showSide : true,
			gridster : {
				nameID : 'ple_gridster',
				createNow : true,
				createCount : 5,
				blockColor : '#DDDDDD'
				//params : [{"col":1,"row":1,"size_x":2,"size_y":2},{"col":3,"row":1,"size_x":2,"size_y":1},{"col":5,"row":1,"size_x":1,"size_y":2},{"col":4,"row":2,"size_x":1,"size_y":1},{"col":3,"row":2,"size_x":1,"size_y":1}]
			},
			setting : {
				width : 80,
				height : 80,
				max_col : 5,
				max_scale : 2,
				outer_margin : 10,
				inner_margin : 10
			}
		};

		if (userPreference)
		{
			$.extend(pref, userPreference);
		}

		return pref;
	}
};
