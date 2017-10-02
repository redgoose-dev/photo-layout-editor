(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('React'), require('ReactDOM'), require('PLE')) :
	typeof define === 'function' && define.amd ? define(['React', 'ReactDOM', 'PLE'], factory) :
	(global.PhotoLayoutEditor = factory(global.React,global.ReactDOM,global.PhotoLayoutEditor));
}(this, (function (React,ReactDOM,PLE) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
PLE = PLE && PLE.hasOwnProperty('default') ? PLE['default'] : PLE;

var basePreference = {
	side: {
		files: ['http://goose.redgoose.me/data/upload/original/201709/rg-20170907-000312.jpg', 'http://goose.redgoose.me/data/upload/original/201709/rg-20170908-000318.jpg', 'http://goose.redgoose.me/data/upload/original/201709/rg-20170908-000320.jpg']
	},
	body: {
		grid: [{ layout: { x: 0, y: 0, w: 2, h: 2 } }, { layout: { x: 2, y: 0, w: 1, h: 2 } }, { layout: { x: 3, y: 0, w: 2, h: 1 } }, { layout: { x: 3, y: 1, w: 1, h: 1 } }]
	}
};

// library
/**
 * Photo layout editor
 * wrap class
 *
 * @param {String} selector
 * @param {Object} options
 */
function PhotoLayoutEditor(selector) {
	var _this = this;

	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : basePreference;


	// component body
	this.body = null;

	// render
	ReactDOM.render(React.createElement(PLE, Object.assign({}, options, { ref: function ref(r) {
			_this.body = r;
		}
	})), document.querySelector(selector));
}

return PhotoLayoutEditor;

})));
//# sourceMappingURL=PhotoLayoutEditor.js.map
