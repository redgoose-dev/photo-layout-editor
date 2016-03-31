// init components
const NavTopForm = require('./NavTop.Form.jsx');


module.exports = React.createClass({

	displayName : 'NavTop',

	getInitialState()
	{
		return {
			show_form : false,
			fix : false,
			visible : {
				setting : true,
				random: true,
				add: true,
				edit: false,
				empty: false,
				duplicate: false,
				remove: false
			}
		};
	},

	/**
	 * Toggle setting form
	 */
	toggleSetting()
	{
		var self = this;
		if (!this.state.show_form == true)
		{
			$(document).on('click', function(e){
				if (!$(e.target).closest('#settings').length)
				{
					e.preventDefault();
					$(this).off('click');
					self.setState({ show_form : false });
				}
			});
		}
		this.setState({ show_form : !this.state.show_form });
	},

	/**
	 * Close setting layer
	 */
	closeSetting()
	{
		$(document).off('click');
		this.setState({ show_form : false });
	},

	/**
	 * Play scroll event
	 */
	scrollEvent()
	{
		var windowTop = $(window).scrollTop();
		var $el = $(ReactDOM.findDOMNode(this));
		if ($el.offset().top < windowTop)
		{
			this.setState({ fix : true });
		}
		else
		{
			this.setState({ fix : false });
		}
	},

	/**
	 * On select block
	 *
	 * @param {object} $el
	 */
	onSelect($el)
	{
		var newVisible = this.state.visible;
		if ($el)
		{
			newVisible.duplicate = true;
			newVisible.remove = true;
			if ($el.length == 1 && $el.children('figure').length)
			{
				newVisible.edit = true;
				newVisible.empty = true;
			}
		}
		else
		{
			newVisible.duplicate = false;
			newVisible.remove = false;
			newVisible.edit = false;
			newVisible.empty = false;
		}
		this.setState({ visible: newVisible });
	},

	/**
	 * RENDER
	 */
	render()
	{
		return (
			<div className="nav-top-wrap">
				<nav className={'nav-top' + ((this.state.fix) ? ' fix' : '')}>
					<div className={'block' + ((this.state.visible.setting) ? ' is-show' : '') + ((this.state.show_form) ? ' is-active' : '')}>
						<button type="button" title="Edit preference" onClick={this.toggleSetting}>
							<i className="sp-ico ico-setting abs">Setting</i>
						</button>
						<NavTopForm
							update={this.props.update}
							reset={this.props.reset}
							preference={this.props.preference}/>
					</div>
					<div className={'block' + ((this.state.visible.random) ? ' is-show' : '')}>
						<button type="button" title="Shuffle block" onClick={this.props.actControl} data-type="shuffle">
							<i className="sp-ico ico-arrow-random abs">Random block</i>
						</button>
					</div>
					<div className={'block' + ((this.state.visible.add) ? ' is-show' : '')}>
						<button type="button" title="Add block" onClick={this.props.actControl} data-type="addBlock">
							<i className="sp-ico ico-plus abs">Add block</i>
						</button>
					</div>
					<div className={'block for-item' + ((this.state.visible.edit) ? ' is-show' : '')}>
						<button type="button" title="Edit block" onClick={this.props.actControl} data-type="edit">
							<i className="sp-ico ico-pencel abs">Edit block</i>
						</button>
					</div>
					<div className={'block for-item' + ((this.state.visible.empty) ? ' is-show' : '')}>
						<button type="button" title="Remove image in block" onClick={this.props.actControl} data-type="empty">
							<i className="sp-ico ico-empty abs">Remove image</i>
						</button>
					</div>
					<div className={'block for-item' + ((this.state.visible.duplicate) ? ' is-show' : '')}>
						<button type="button" title="Duplicate block" onClick={this.props.actControl} data-type="duplicate">
							<i className="sp-ico ico-duplicate abs">Duplicate block</i>
						</button>
					</div>
					<div className={'block for-item' + ((this.state.visible.remove) ? ' is-show' : '')}>
						<button type="button" title="Remove block" onClick={this.props.actControl} data-type="remove">
							<i className="sp-ico ico-trash abs">Remove block</i>
						</button>
					</div>
				</nav>
			</div>
		);
	}
});
