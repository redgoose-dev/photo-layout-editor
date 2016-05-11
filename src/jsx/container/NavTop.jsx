// init components
const NavTopForm = require('./NavTop.Form.jsx');
const NavTopColor = require('./NavTop.Color.jsx');


module.exports = React.createClass({

	displayName : 'NavTop',
	openForm : false,
	EVENT_TOGGLE_FORM : 'settingForm',

	getInitialState()
	{
		return {
			showForm : false,
			showColorForm : false,
			fix : false,
			visible : {
				setting : true,
				random: true,
				add: true,
				edit: false,
				empty: false,
				duplicate: false,
				remove: false,
				palette: false
			}
		};
	},

	/**
	 * Toggle setting form
	 */
	toggleSettingForm(e)
	{
		// disable form
		if (this.openForm)
		{
			this.toggleFormEvent(false);
		}

		// enable form
		if (!$(e.currentTarget).parent().hasClass('is-active'))
		{
			let stateName = e.currentTarget.getAttribute('data-state');
			this.toggleFormEvent(true);
			this.setState({ [stateName] : !this.state[stateName] });

			switch(stateName)
			{
				case 'showForm':
					break;
				case 'showColorForm':
					let color = $(this.props.parent.gridster.$gridster).find('li.selected').get(0).getAttribute('data-color');
					this.refs.color.import(color);
					break;
			}
		}
	},

	/**
	 * Toggle form event
	 *
	 * @param {boolean} evt
	 */
	toggleFormEvent(evt)
	{
		if (evt)
		{
			var self = this;
			this.openForm = true;

			$(document).on('click.' + this.EVENT_TOGGLE_FORM, function(e){
				if ($(e.target).closest('.form').length) return;
				if ($(e.target).closest('button.toggle-form').length) return false;

				self.toggleFormEvent(false);
			});
		}
		else
		{
			$(document).off('click.' + this.EVENT_TOGGLE_FORM);
			this.openForm = false;

			this.setState({
				showForm : false,
				showColorForm : false
			});
		}
	},

	/**
	 * Close setting layer
	 */
	closeSetting()
	{
		this.toggleFormEvent(false);
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
		if ($el && $el.length)
		{
			newVisible.duplicate = true;
			newVisible.remove = true;
			newVisible.palette = true;
			newVisible.edit = ($el.length == 1 && $el.children('figure').length) ? true : false;
			newVisible.empty = ($el.children('figure').length) ? true : false;
		}
		else
		{
			newVisible.duplicate = false;
			newVisible.remove = false;
			newVisible.edit = false;
			newVisible.empty = false;
			newVisible.palette = false;
		}

		this.toggleFormEvent(false);

		this.setState({
			visible: newVisible
		});
	},

	/**
	 * On empty
	 *
	 * @param {object} e
	 */
	onEmpty(e)
	{
		this.props.actControl(e);

		// update toolbar
		var newVisible = this.state.visible;
		newVisible.edit = false;
		this.setState({
			visible: newVisible
		});
	},

	/**
	 * RENDER
	 */
	render()
	{
		var class_form = 'block' +
			((this.state.visible.setting) ? ' is-show' : '') +
			((this.state.showForm) ? ' is-active' : '');
		var class_colorForm = 'block color-bg-key' +
			((this.state.visible.palette) ? ' is-show' : '') +
			((this.state.showColorForm) ? ' is-active' : '');

		return (
			<div className="nav-top-wrap">
				<nav className={'nav-top' + ((this.state.fix) ? ' fix' : '')}>
					<div className={ class_form }>
						<button
							type="button"
							title="Edit preference"
							className="toggle-form"
							data-state="showForm"
							onClick={this.toggleSettingForm}>
							<i className="sp-ico ico-setting abs">Setting</i>
						</button>
						<NavTopForm
							submit={this.props.updatePreference}
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
					<div className={'block color-bg-key' + ((this.state.visible.edit) ? ' is-show' : '')}>
						<button type="button" title="Edit block" onClick={this.props.actControl} data-type="edit">
							<i className="sp-ico ico-pencel abs">Edit block</i>
						</button>
					</div>
					<div className={'block color-bg-key' + ((this.state.visible.empty) ? ' is-show' : '')}>
						<button type="button" title="Remove image in block" onClick={this.onEmpty} data-type="empty">
							<i className="sp-ico ico-empty abs">Remove image</i>
						</button>
					</div>
					<div className={'block color-bg-key' + ((this.state.visible.duplicate) ? ' is-show' : '')}>
						<button type="button" title="Duplicate block" onClick={this.props.actControl} data-type="duplicate">
							<i className="sp-ico ico-duplicate abs">Duplicate block</i>
						</button>
					</div>
					<div className={'block color-bg-key' + ((this.state.visible.remove) ? ' is-show' : '')}>
						<button type="button" title="Remove block" className="toggle-form" onClick={this.props.actControl} data-type="remove">
							<i className="sp-ico ico-trash abs">Remove block</i>
						</button>
					</div>
					<div className={ class_colorForm }>
						<button
							type="button"
							title="Change color"
							className="toggle-form"
							data-state="showColorForm"
							onClick={this.toggleSettingForm}>
							<i className="sp-ico ico-palette abs">Change color</i>
						</button>
						<NavTopColor ref="color" updateColor={this.props.updateColor} />
					</div>
				</nav>
			</div>
		);
	}
});
