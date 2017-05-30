import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './Layout';
import Side from './Side';
import Grid from './Grid';


export default function API(root) {

	// set layout
	this.layout = new Layout(root);

	// set side
	this.side = new Side(root);

	// set grid
	this.grid = new Grid(root);


	/**
	 * Destroy PLE
	 */
	this.destroy = () => {
		if (!root) return;

		// remove classNames
		root.el.classList.remove('ple-editor', 'side-active');

		// destroy keyboard event
		root.keyboard.destroy();

		// unmount component
		ReactDOM.unmountComponentAtNode(root.el);

		// remove value
		root = null;
	}

}