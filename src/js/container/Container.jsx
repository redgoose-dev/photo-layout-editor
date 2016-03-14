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
	 * Play add block
	 */
	actAddBlcok()
	{
		this.refs.gridster.addBlock();
	},

	/**
	 * Play shuffle blocks
	 */
	actShuffleBlocks()
	{
		this.refs.gridster.shuffleBlocks();
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
					actAddBlock={this.actAddBlcok}
					actShuffleBlocks={this.actShuffleBlocks}
					preference={this.state.preference}/>
				<Gridster
					ref="gridster"
					preference={this.state.preference}
					action={this.state.action}
					resizeWidth={this.props.resizeWidth}
					dynamicParameter={this.state.dynamicParameter}/>
				<NavBottom
					generate={this.generate} />
			</div>
		);
	}
});
