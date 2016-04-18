const React = require('React');
const ReactDOM = require('ReactDOM');

const NavTop = require('./NavTop.jsx');
const Gridster = require('./Gridster.jsx');
const NavBottom = require('./NavBottom.jsx');


module.exports = React.createClass({

	displayName : 'Container',
	originalPreference : {},

	getInitialState()
	{
		return {
			preference : window.plePreference.setting,
			action : null
		};
	},

	componentDidMount()
	{
		this.originalPreference = this.state.preference;
		this.gridster = this.refs.gridster;
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
				this.refs.gridster.shuffleBlocks();
				break;
			case 'addBlock':
				this.refs.gridster.addBlock();
				break;
			case 'edit':
				var $selectedItem = this.refs.gridster.$gridster.find('li.selected');
				if ($selectedItem.length)
				{
					let $figure = $selectedItem.children('figure');
					window.cropper.open({
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
				this.refs.gridster.emptyBlock();
				break;
			case 'duplicate':
				this.refs.gridster.duplicateBlock();
				break;
			case 'remove':
				this.refs.gridster.removeBlock();
				break;
			case 'changeColor':
				log('change item color');
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
		this.refs.gridster.changeBlockColor(color);
		
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
					parent={this}
					updatePreference={this.updatePreference}
					updateColor={this.updateBlockColor}
					reset={this.resetPreference}
					actControl={this.topNavControl}
					preference={this.state.preference}/>
				<Gridster
					ref="gridster"
					preference={this.state.preference}
					action={this.state.action}
					resizeWidth={this.props.resizeWidth}
					selectBlock={this.onSelectBlock}/>
				<NavBottom
					container={this}
					gridster={this.refs.gridster} />
			</div>
		);
	}
});
