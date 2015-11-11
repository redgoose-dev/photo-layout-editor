var Header = React.createClass({

	displayName: 'header',

	componentDidMount: function () {},

	render: function () {
		return React.createElement(
			"header",
			{ className: "ple-header" },
			React.createElement(
				"h1",
				null,
				"Photo Layout Editor"
			),
			React.createElement(
				"p",
				null,
				"사진 레이아웃 에디터입니다. 처음 시작하면 먼저 문서설정을 해주세요!"
			)
		);
	}
});