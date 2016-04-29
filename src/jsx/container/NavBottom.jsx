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

	/**
	 * Import example
	 *
	 */
	replaceExample()
	{
		$.getJSON('./assets/example.json', (res) => {
			log(res)
		});
		//log('import example data');
		// TODO : example.json 데이터를 불러온다.
		// TODO : 데이터 불러오는데 성공하면 블럭 모두 삭제하고 importParam을 이용해서 블럭 교체함
		// TODO : 이미지들을 사이드바에 올릴까 좀 고민됨.
		// TODO : 이미지들을 블럭에 attach 시키기.
	},

	/**
	 * render
	 */
	render()
	{
		return (
			<div>
				<nav className="nav-bottom">
					<p>
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
							<span>Print console.log</span>
						</button>
					</p>
					<p>
						<button
							type="button"
							title="Replace example"
							onClick={this.replaceExample}>
							<span>Replace example</span>
						</button>
					</p>
				</nav>
			</div>
		);
	}
});
