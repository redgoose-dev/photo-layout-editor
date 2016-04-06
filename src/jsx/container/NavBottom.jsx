module.exports = React.createClass({

	displayName : 'Nav-bottom',
	container : null,
	gridster : null,

	componentDidMount()
	{
		this.gridster = this.props.container.refs.gridster;
		this.container = this.props.container;
	},

	/**
	 * Action generator
	 * */
	actGenerator(e)
	{
		var action = e.currentTarget.getAttribute('data-action');

		switch(action)
		{
			case 'json':
				break;
			case 'jsonImage':
				break;
			case 'image':
				break;
			default:
				log('not select action');
				break;
		}

		// log(this.container);
		// log(this.gridster);
	},

	/**
	 * render
	 */
	render()
	{
		return (
            <nav className="nav-bottom">
        		<button
					type="button"
					title="Generate export"
					data-action="json"
					onClick={this.actGenerator}>
        			<span>Export JSON</span>
        		</button>
        	</nav>
		);
	}
});
