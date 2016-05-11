const React = require('React');
const ReactDOM = require('ReactDOM');


// set preference
window.plePreference = {
	uploadScript : '',
	removeScript : '',
	defaultImagesScript : '',
	gridster : {
		nameID : 'ple_gridster',
		createNow : true,
		createCount : 6,
		importParams : []
	},
	block : {
		defaultColor : '#DDDDDD'
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
if (pleUserPreference)
{
	Object.assign(window.plePreference, pleUserPreference);
}


// load libs
const KeyboardEvent = require('./lib/KeyboardEvent.js');

// init components
const Container = require('./container/Container.jsx');
const Sidebar = require('./sidebar/Sidebar.jsx');
const Cropper = require('./cropper/Cropper.jsx');
const Result = require('./result/Result.jsx');
const API = require('./lib/API.js');


window.PLE = {
	
	// components
	container : null,
	side : null,
	cropper : null,
	result : null,
	keyboardEvent : null,
	
	// API
	api : null,

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
		
		// TODO : preference값을 이 객체속에다 집어넣기
		
		// init container
		this.container = ReactDOM.render(<Container parent={this} resizeWidth="" />, options.elements.container);

		// init side
		this.side = ReactDOM.render(<Sidebar
			parent={this}
			uploadScript={window.plePreference.uploadScript}
			removeScript={window.plePreference.removeScript}
			defaultImagesScript={window.plePreference.defaultImagesScript}
			show={this.option.show_side}
			toggleSidebar={this.toggleSidebar} />, options.elements.side);
		
		// init Cropper
		this.cropper = ReactDOM.render(<Cropper parent={this} />, options.elements.cropper);
		
		// ini result
		this.result = ReactDOM.render(<Result parent={this} />, options.elements.result);
		
		// init keyboard event
		this.keyboardEvent = new KeyboardEvent();

		// init API
		this.api = new API();
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
	}
};
