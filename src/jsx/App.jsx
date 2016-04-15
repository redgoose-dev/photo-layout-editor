const React = require('React');
const ReactDOM = require('ReactDOM');


// set preference
window.plePreference = {
	uploadScript : '',
	removeScript : '',
	defaultImagesScript : '',
	gridster : {
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
const Header = require('./header/Header.jsx');
const Container = require('./container/Container.jsx');
const Sidebar = require('./sidebar/Sidebar.jsx');
const Cropper = require('./cropper/Cropper.jsx');
const Result = require('./result/Result.jsx');


// App
const App = React.createClass({

	displayName : 'photo-layout-editor',
	saveWidth : 0,
	$editor : null,
	$sidebar : null,
	show_sidebar : (localStorage.getItem('sidebar') != 'false'),

	getInitialState()
	{
		return {};
	},

	componentDidMount()
	{
		this.$editor = $(ReactDOM.findDOMNode(this.refs.editor));
		this.$sidebar = $(ReactDOM.findDOMNode(this.refs.sidebar));

		// scroll event
		$(window).on('scroll', (e) => {
			this.refs.container.refs.navTop.scrollEvent();
		});

		// show sidebar
		if (this.show_sidebar)
		{
			this.$editor.addClass('on-sidebar');
		}

		// play gridster
		this.refs.container.actGridster();
	},

	/**
	 * Toggle side bar
	 */
	toggleSidebar()
	{
		var bool = !this.show_sidebar;
		localStorage.setItem('sidebar', bool);
		this.show_sidebar = bool;

		this.saveWidth = (bool) ? this.saveWidth + this.$sidebar.width() : this.saveWidth - this.$sidebar.width();

		this.$editor.toggleClass('on-sidebar');
		this.$editor.css('min-width', this.saveWidth);
	},

	/**
	 * Resize container width
	 *
	 * @param {int} width
	 */
	resizeWidth(width)
	{
		this.saveWidth = (this.show_sidebar) ? width : width - this.$sidebar.width();
		this.$editor.css('min-width', this.saveWidth);
	},

	/**
	 * render
	 */
	render()
	{
		return (
			<div ref="editor" className="ple-editor">
				<Header ref="header" />
				<Container
					ref="container"
					resizeWidth={this.resizeWidth}/>
				<Sidebar
					ref="sidebar"
					uploadScript={window.plePreference.uploadScript}
					removeScript={window.plePreference.removeScript}
					defaultImagesScript={window.plePreference.defaultImagesScript}
					show={this.state.show_sidebar}
					toggleSidebar={this.toggleSidebar}/>
			</div>
		);
	}
});


// event
window.keyboardEvent = new KeyboardEvent();


// render App
window.app = ReactDOM.render(<App/>, document.getElementById('app'));
window.cropper = ReactDOM.render(<Cropper/>, document.getElementById('cropper'));
window.result = ReactDOM.render(<Result/>, document.getElementById('result'));