var Sidebar_UploadFiles = React.createClass({

	displayName: 'UploadFiles',

	/**
  * render
  */
	render: function () {
		var style = [{ backgroundImage: 'url(./assets/img/tmp-simg-01.jpg)' }, { backgroundImage: 'url(./assets/img/tmp-simg-02.jpg)' }, { backgroundImage: 'url(./assets/img/tmp-simg-03.jpg)' }, { backgroundImage: 'url(./assets/img/tmp-simg-04.jpg)' }];
		return React.createElement(
			'div',
			{ className: 'upload-files' },
			React.createElement(
				'ul',
				null,
				React.createElement(
					'li',
					null,
					React.createElement(
						'span',
						{ style: style[0] },
						'.img'
					)
				),
				React.createElement(
					'li',
					null,
					React.createElement(
						'span',
						{ style: style[1] },
						'.img'
					)
				),
				React.createElement(
					'li',
					null,
					React.createElement(
						'span',
						{ style: style[2] },
						'.img'
					)
				),
				React.createElement(
					'li',
					null,
					React.createElement(
						'span',
						{ style: style[3] },
						'.img'
					)
				)
			)
		);
	}
});