module.exports = React.createClass({

	displayName : 'Nav-bottom',

	actGenerator()
	{
		log('ACTION GENERATE');
	},

	/**
	 * render
	 */
	render()
	{
		return (
            <nav className="nav-bottom">
        		<button type="button" title="Generate export" onClick={this.props.generate}>
        			<span>Generate</span>
        		</button>
        	</nav>
		);
	}
});
