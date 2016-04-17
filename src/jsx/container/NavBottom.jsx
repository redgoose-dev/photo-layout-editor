const React = require('React');
const Export = require('../lib/Export.js');

module.exports = React.createClass({

	displayName : 'Nav-bottom',
	export : Export,


	componentDidMount()
	{
		// init export
		this.export.init(this.props.container);
	},

	/**
	 * on generator
	 *
	 * @param {event} e
	 */
	onGenerator(e)
	{
		let action = e.currentTarget.getAttribute('data-action');

		switch(action)
		{
			case 'printJson':
				window.result.open( this.export.json(), 'code' );
				break;

			case 'printJsonPacked':
				this.export.packed((res) => {
					window.result.open(res, 'code');
				});
				break;

			case 'printImage':
				this.export.image((src) => {
					window.result.open(src, 'image');
				});
				break;

			case 'console':
				this.export.console();
				break;

			default:
				log('not select action');
				break;
		}
	},

	/**
	 * render
	 */
	render()
	{
		return (
			<div>
				<nav className="nav-bottom">
					<button
						type="button"
						title="Export json"
						data-action="printJson"
						onClick={this.onGenerator}>
						<span>JSON</span>
					</button>
					<button
						type="button"
						title="Export json(packed)"
						data-action="printJsonPacked"
						onClick={this.onGenerator}>
						<span>JSON(packed)</span>
					</button>
					<button
						type="button"
						title="Image"
						data-action="printImage"
						onClick={this.onGenerator}>
						<span>Image</span>
					</button>
					<button
						type="button"
						title="Console"
						data-action="console"
						onClick={this.onGenerator}>
						<span>Console</span>
					</button>
				</nav>
			</div>
		);
	}
});
