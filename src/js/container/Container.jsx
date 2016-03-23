const NavTop = require('./NavTop.jsx');
const Gridster = require('./Gridster.jsx');
const NavBottom = require('./NavBottom.jsx');


module.exports = React.createClass({

	displayName : 'Container',
	originalPreference : {},

	getInitialState()
	{
		return {
			preference : {
				width : 100,
				height : 100,
				max_col : 5,
				max_scale : 2,
				outer_margin : 10,
				inner_margin : 10
			},
			action : null,
			dynamicParameter : {}
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
		this.refs.navTop.closeSetting();
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
	 * Generate
	 */
	generate()
	{
		log('generate output');
	},

	/**
	 * On select block
	 * 
	 */
	onSelectBlock($el)
	{
		this.refs.navTop.onSelect($el);
	},

	topNavControl(e, action)
	{
		var type = '';
		if (e)
		{
			type = e.currentTarget.getAttribute('data-type');
		}
		else
		{
			if (!action) return false;
			type = action;
		}

		switch(type)
		{
			case 'shuffle':
				this.refs.gridster.shuffleBlocks();
				break;
			case 'addBlock':
				this.refs.gridster.addBlock();
				break;
			case 'edit':
				log('act edit');
				break;
			case 'empty':
				log('act empty');
				break;
			case 'duplicate':
				this.refs.gridster.duplicateBlock();
				break;
			case 'remove':
				this.refs.gridster.removeBlock();
				break;
		}
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
					update={this.updatePreference}
					reset={this.resetPreference}
					actControl={this.topNavControl}
					preference={this.state.preference}/>
				<Gridster
					ref="gridster"
					preference={this.state.preference}
					action={this.state.action}
					resizeWidth={this.props.resizeWidth}
					selectBlock={this.onSelectBlock}
					dynamicParameter={this.state.dynamicParameter}/>
				<NavBottom
					generate={this.generate} />
			</div>
		);
	}
});
