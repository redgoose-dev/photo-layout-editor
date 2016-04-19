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
				window.result.open(
					this.export.json(),
					'code',
					'json데이터로 만들어서 출력합니다. 이미지 경로는 서버에 저장된 위치로 지정됩니다.'
				);
				break;

			case 'printJsonPacked':
				this.export.packed((res) => {
					window.result.open(
						res,
						'code',
						'json 데이터로 만들어서 출력합니다.<br>이미지를 base64데이터로 변환하여 json데이터에 같이 들어갑니다.'
					);
				});
				break;

			case 'printImage':
				this.export.image((src) => {
					window.result.open(
						src,
						'image',
						'데이터를 토대로 이미지 형식으로 결과물을 만들었습니다. 이미지 저장을 할 수 있습니다.'
					);
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

	importExample()
	{
		log('import example data');
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
						title="Import json"
						onClick={this.importExample}>
						<span>Import</span>
					</button>
					<button
						type="button"
						title="Export json"
						data-action="printJson"
						onClick={this.onGenerator}>
						<span>Export</span>
					</button>
					<button
						type="button"
						title="Export json(packed)"
						data-action="printJsonPacked"
						onClick={this.onGenerator}>
						<span>Export(packed)</span>
					</button>
					<button
						type="button"
						title="Image"
						data-action="printImage"
						onClick={this.onGenerator}>
						<span>Make Image</span>
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
