import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import deepAssign from './lib/deep-assign';
import defaultPreference from './lib/defaultPreference';
import Util from './lib/Util';
import reducers from './reducers';
import Body from './Body';
import Side from './Side';


/**
 * Photo layout editor
 *
 * @param {Object} el
 * @param {Object} options
 */
window.PLE = function(el, options)
{
	// set preference
	this.preference = deepAssign(defaultPreference, options);

	// set elements
	this.el = {
		app: el,
		container: el.querySelector('.ple-container'),
		body: el.querySelector('.ple-body'),
		side: el.querySelector('.ple-side'),
	};

	// set store
	this.store = {
		body: createStore(reducers.body),
		side: createStore(reducers.side),
	};

	// set components
	//this.components = {};

	// check touch device
	if (Util.isTouchDevice())
	{
		$('html').addClass('ple-touch');
	}

	// set body component
	if (this.el.body)
	{
		reduxRender(this.el.body, this.store.body, ( <Body root={this}/> ));
	}

	// set side component
	if (this.el.side)
	{
		reduxRender(this.el.side, this.store.side, ( <Side root={this}/> ));
	}

	// TODO : init keyboard event
	// TODO : init Export
	// TODO : init API
	// TODO : play gridster
	// TODO : `this.store.body.dispatch(foo())` 형태로 외부 리듀스에 접근할 수 있다.
	// TODO : dispatch(foo()) 형식으로 action으로 호출
};


/**
 * Redux render
 * react renders using the redux
 *
 * @param {Object} el
 * @param {Object} store
 * @param {Object} component
 * @return {Object}
 */
function reduxRender(el, store, component)
{
	return render(
		<Provider store={store}>
			{component}
		</Provider>,
		el,
	);
}
