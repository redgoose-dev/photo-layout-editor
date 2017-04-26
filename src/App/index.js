import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import API from './API';
import assignPreference from './lib/assignPreference';
import defaultPreference from './lib/defaultPreference';
import { isTouchDevice } from './lib/util';
import Keyboard from './lib/Keyboard';
import reducers from './reducers';
import Container from './Container';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style/app.scss';


/**
 * Photo layout editor
 *
 * @param {Object} el
 * @param {Object} options
 */
const PLE = function(el, options)
{
	// set preference
	this.preference = assignPreference(defaultPreference, options);

	// set elements
	this.el = el;

	// set store
	this.store = createStore(reducers);

	// init keyboard event
	this.keyboard = Keyboard;
	this.keyboard.init();

	// check touch device
	if (isTouchDevice())
	{
		document.querySelector('html').classList.add('ple-touch');
	}

	// set API
	this.api = new API(this);

	render(
		<Provider store={this.store}>
			<Container PLE={this}/>
		</Provider>,
		el,
	);
};


module.exports = PLE;