var Sidebar_UploadFiles_Item = React.createClass({

	displayName: 'Item',

	/**
  * render
  */
	render: function () {
		return React.createElement(
			'li',
			{ onClick: this.select },
			React.createElement(
				'span',
				{ style: this.props.style },
				'.img'
			)
		);
	}
});