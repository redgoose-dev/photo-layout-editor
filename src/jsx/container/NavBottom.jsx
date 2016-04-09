module.exports = React.createClass({

	displayName : 'Nav-bottom',
	container : null,
	gridster : null,
	$gridster : null,

	componentDidMount()
	{
		this.container = this.props.container;
	},

	exportJSON()
	{

	},

	/**
	 * Export gridster
	 *
	 * @return {object}
	 */
	exportGridster()
	{
		var blockData = [];

		this.$gridster.find('li').each((k, o) => {
			var $o = $(o);
			var data = {};

			data.color = $o.data('color');

			if ($o.hasClass('attached'))
			{
				data.position = $o.children('figure').data('position');
				data.size = $o.children('figure').data('size');
				data.image = $o.children('figure').data('image');
			}

			blockData.push(data);
		});

		return {
			params : this.gridster.serialize(),
			figure : blockData
		};
	},

	/**
	 * Action generator
	 *
	 * @param {event} e
	 */
	actGenerator(e)
	{
		let action = e.currentTarget.getAttribute('data-action');
		let gridsterComponent = this.props.container.refs.gridster;

		this.container = this.props.container;
		this.gridster = gridsterComponent.gridster;
		this.$gridster = gridsterComponent.$gridster;

		switch(action)
		{
			case 'json':
				let gridsterData = this.exportGridster();
				let preference = this.container.state.preference;

				log(gridsterData);
				log(preference);

				break;
			case 'jsonImage':
				break;
			case 'image':
				break;
			default:
				log('not select action');
				break;
		}

		//log(action);

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
