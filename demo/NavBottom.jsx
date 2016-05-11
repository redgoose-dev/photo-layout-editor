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
		let exp = this.export;
		let pref = this.props.container.state.preference;

		switch(action)
		{
			case 'printJson':
				window.PLE.result.open(
					exp.objectToJson({ gridster : exp.exportGridster(), preference : pref }, 4),
					'code',
					'json데이터로 만들어서 출력합니다. 이미지 경로는 서버에 저장된 위치로 지정됩니다.'
				);
				break;

			case 'printJsonPacked':
				this.export.packed('image/jpeg', 0.75, (res) => {
					window.PLE.result.open(
						this.export.objectToJson({ gridster : res, preference : pref }, 0),
						'code',
						'json 데이터로 만들어서 출력합니다.<br>이미지를 base64데이터로 변환하여 json데이터에 같이 들어갑니다.'
					);
				});
				break;

			case 'printImage':
				this.export.image('image/jpeg', 0.8, '#ffffff', (src) => {
					window.PLE.result.open(
						src,
						'image',
						'데이터를 토대로 이미지 형식으로 결과물을 만들었습니다. 이미지 저장을 할 수 있습니다.'
					);
				});
				break;

			case 'console':
				console.log({
					gridster : exp.exportGridster(),
					preference : pref
				});
				break;
		}
	},

	/**
	 * Import example
	 *
	 */
	replaceExample()
	{
        var gridster = this.props.gridster;
        var sidebar = window.PLE.refs.sidebar;

		$.getJSON(plePreference.replaceScript, (res) => {

			// update preference gridster
			if (res.preference)
			{
				this.props.container.updatePreference(res.preference);
			}

			if (res.gridster)
			{
				// replace gridster blocks
				if (res.gridster.params)
				{
					gridster.reset(false);
					gridster.importParams(res.gridster.params);
				}

				// import images to sidebar and gridster blocks
				if (res.gridster.figure && res.gridster.figure.length)
				{
					let newImages = res.gridster.figure.map((o) => {
						return o.image;
					});
					sidebar.importImages(newImages);

				}

				// update gridster datas
				// TODO : (OK)gridster에서 블럭 삭제하기
				// TODO : (OK)gridster에서 블럭 만들기
				// TODO : 만든 블럭에다 이미지 적용하기
			}
		});
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
