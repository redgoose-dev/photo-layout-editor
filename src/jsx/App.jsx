var App = React.createClass({

	displayName : 'photo-layout-editor',
	saveWidth : 0,
	$editor : null,
	$sidebar : null,
	show_sidebar : (localStorage.getItem('sidebar') != 'false'),

	getInitialState : function()
	{
		return {};
	},

	componentDidMount : function()
	{
		this.$editor = $(ReactDOM.findDOMNode(this.refs.editor));
		this.$sidebar = $(ReactDOM.findDOMNode(this.refs.sidebar));

		var self = this;

		$(window).on('scroll', function(e){
			self.refs.container.refs.navTop.scrollEvent();
		});

		if (this.show_sidebar)
		{
			this.$editor.addClass('on-sidebar');
		}

		this.refs.container.actGridster();
	},

	attachIames : function(images)
	{
		this.refs.container.updateAttachImages(images);
	},

	toggleSidebar : function()
	{
		var bool = !this.show_sidebar;
		localStorage.setItem('sidebar', bool);
		this.show_sidebar = bool;

		this.saveWidth = (bool) ? this.saveWidth + this.$sidebar.width() : this.saveWidth - this.$sidebar.width();

		this.$editor.toggleClass('on-sidebar');
		this.$editor.css('min-width', this.saveWidth);
	},

	resizeWidth : function(width)
	{
		this.saveWidth = (this.show_sidebar) ? width : width - this.$sidebar.width();
		this.$editor.css('min-width', this.saveWidth);
	},

	/**
	 * render
	 */
	render : function()
	{
		return (
			<div ref="editor" className="ple-editor">
				<Header />
				<Container
					ref="container"
					resizeWidth={this.resizeWidth}/>
				<Sidebar
					ref="sidebar"
					uploadScript={this.props.uploadScript}
					show={this.state.show_sidebar}
					toggleSidebar={this.toggleSidebar}
					attachImages={this.attachIames}/>
			</div>
		);
	}
});
