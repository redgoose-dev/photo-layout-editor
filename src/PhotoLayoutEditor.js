import React from 'React';
import ReactDOM from 'ReactDOM';
import PLE from 'PLE';

// library
import basePreference from './basePreference';


/**
 * Photo layout editor
 * wrap class
 *
 * @param {String} selector
 * @param {Object} options
 */
function PhotoLayoutEditor(selector, options=basePreference) {

	// component body
	this.body = null;

	// render
	ReactDOM.render(
		React.createElement(
			PLE,
			Object.assign({},
				options,
				{ ref: (r) => { this.body = r; }
			})
		),
		document.querySelector(selector)
	);

}


export default PhotoLayoutEditor;
