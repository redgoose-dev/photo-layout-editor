const React = require('React');
const ReactDOM = require('ReactDOM');

const NavTop = require('./NavTop.jsx');
const Gridster = require('./Gridster.jsx');


module.exports = React.createClass({

	displayName : 'Container',

	parent : null,
	originalPreference : {},
	gridster : null,

	getInitialState()
	{
		this.root = this.props.root;

		return {
			preference : null,
			action : null
		};
	},

	componentWillMount()
	{
		//this.root = this.props.root;
	},

	componentDidMount()
	{
		this.root.$container = $(ReactDOM.findDOMNode(this));
		this.gridster = this.refs.gridster;
		this.originalPreference = this.root.preference.setting;
		this.setState({ preference : this.originalPreference });
	},

	/**
	 * Update preference
	 *
	 * @param {object} params
	 */
	updatePreference(params)
	{
		this.setState({ preference : params, action: 'updatePreference' });
		
		// close form
		this.refs.navTop.toggleFormEvent(false);
	},

	/**
	 * Reset preference
	 */
	resetPreference()
	{
		this.setState({ preference : this.originalPreference, action : null });
	},

	/**
	 * Play Gridster
	 */
	actGridster()
	{
		this.setState({ action : 'init' });
	},

	/**
	 * On select block
	 * 
	 */
	onSelectBlock($el)
	{
		this.refs.navTop.onSelect($el);
	},

	/**
	 * Top navigation control
	 *
	 * @param {event} e
	 */
	topNavControl(e)
	{
		var type = e.currentTarget.getAttribute('data-type');

		switch(type)
		{
			case 'shuffle':
				this.gridster.shuffleBlocks();
				break;
			case 'addBlock':
				this.gridster.addBlock();
				break;
			case 'edit':
				var $selectedItem = this.gridster.$gridster.find('li.selected');
				if ($selectedItem.length)
				{
					let $figure = $selectedItem.children('figure');
					this.root.cropper.open({
						$selected : $selectedItem,
						color : $selectedItem.attr('data-color'),
						image : {
							url : $figure.attr('data-image'),
							size : $figure.attr('data-size'),
							position : $figure.attr('data-position')
						}
					});
				}
				break;
			case 'empty':
				this.gridster.emptyBlock(this.gridster.getSelectedBlocks());
				break;
			case 'duplicate':
				this.gridster.duplicateBlock(this.gridster.getSelectedBlocks());
				break;
			case 'remove':
				this.gridster.removeBlock(this.gridster.getSelectedBlocks());
				break;
		}
	},

	/**
	 * Update block color
	 *
	 * @param {string} color
	 */
	updateBlockColor(color)
	{
		// change color
		this.gridster.changeBlockColor(this.gridster.getSelectedBlocks(), color);
		
		// close form
		this.refs.navTop.toggleFormEvent(false);
	},
	
	/**
	 * render
	 */
	render()
	{
		return (
			<div className="ple-container">
				<NavTop
					ref="navTop"
					root={this.root}
					updatePreference={this.updatePreference}
					updateColor={this.updateBlockColor}
					reset={this.resetPreference}
					actControl={this.topNavControl}
					preference={this.state.preference}/>
				<Gridster
					ref="gridster"
					root={this.root}
					preference={this.state.preference}
					action={this.state.action}
					selectBlock={this.onSelectBlock}/>
			</div>
		);
	}
});
