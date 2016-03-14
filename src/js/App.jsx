const React = require('React');
const ReactDOM = require('ReactDOM');

// init components
const Header = require('./header/Header.jsx');
const Container = require('./container/Container.jsx');
const Sidebar = require('./sidebar/Sidebar.jsx');


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
	 * Attach images
	 *
	 * @param {array} images
	 */
	attachImages(images)
	{
		this.refs.container.refs.gridster.attachImages(images);
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
					uploadScript={preference.uploadScript}
					show={this.state.show_sidebar}
					toggleSidebar={this.toggleSidebar}
					attachImages={this.attachImages}
					defaultUploadFiles={preference.defaultUploadFiles}/>
			</div>
		);
	}
});


// render App
window.app = ReactDOM.render(<App/>, document.getElementById('app'));