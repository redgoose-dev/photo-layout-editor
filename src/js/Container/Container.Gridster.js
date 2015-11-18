var Container_Gridster = React.createClass({

	displayName: 'Gridster',

	gridster: null,

	componentDidMount: function () {
		var $gridster = $(ReactDOM.findDOMNode(this.refs.gridster));

		$gridster.children('ul').gridster({
			widget_margins: [10, 10],
			widget_base_dimensions: [140, 140]
		});
		log($gridster);
		// TODO : 플러그인 세팅
	},

	/**
  * render
  */
	render: function () {
		return React.createElement(
			'div',
			{ ref: 'gridster', className: 'gridster' },
			React.createElement(
				'ul',
				null,
				React.createElement('li', { 'data-row': '1', 'data-col': '1', 'data-sizex': '1', 'data-sizey': '1' }),
				React.createElement('li', { 'data-row': '2', 'data-col': '1', 'data-sizex': '1', 'data-sizey': '1' }),
				React.createElement('li', { 'data-row': '3', 'data-col': '1', 'data-sizex': '1', 'data-sizey': '1' }),
				React.createElement('li', { 'data-row': '1', 'data-col': '2', 'data-sizex': '2', 'data-sizey': '1' }),
				React.createElement('li', { 'data-row': '2', 'data-col': '2', 'data-sizex': '2', 'data-sizey': '2' }),
				React.createElement('li', { 'data-row': '1', 'data-col': '4', 'data-sizex': '1', 'data-sizey': '1' }),
				React.createElement('li', { 'data-row': '2', 'data-col': '4', 'data-sizex': '2', 'data-sizey': '1' }),
				React.createElement('li', { 'data-row': '3', 'data-col': '4', 'data-sizex': '1', 'data-sizey': '1' }),
				React.createElement('li', { 'data-row': '1', 'data-col': '5', 'data-sizex': '1', 'data-sizey': '1' }),
				React.createElement('li', { 'data-row': '3', 'data-col': '5', 'data-sizex': '1', 'data-sizey': '1' }),
				React.createElement('li', { 'data-row': '1', 'data-col': '6', 'data-sizex': '1', 'data-sizey': '1' }),
				React.createElement('li', { 'data-row': '2', 'data-col': '6', 'data-sizex': '1', 'data-sizey': '2' })
			)
		);
	}
});