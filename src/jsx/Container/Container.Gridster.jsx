var Container_Gridster = React.createClass({

	displayName : 'Gridster',

	gridster : null,

	componentDidMount : function()
	{
		var $gridster = $(ReactDOM.findDOMNode(this.refs.gridster));

		var margin = this.props.preference.inner_margin * 0.5;
		$gridster.children('ul').gridster({
			widget_margins: [margin, margin],
			widget_base_dimensions: [this.props.preference.width, this.props.preference.height]
		});

		// TODO : 플러그인 세팅
	},

	updatePreference : function(params)
	{
		// TODO : 환경설정에서 넘어온 값으로 gridster 업데이트 하기. 아니면 플러그인 옵션에서 컨테이너 사이즈 조절 할 수 있는지 확인해보기
		log('update preference');
		log(this.props.preference);
	},

	/**
	 * render
	 */
	render : function()
	{
		// act action
		if (typeof this[this.props.action] === 'function')
		{
			this[this.props.action]();
		}

		// TODO : gridster 속에 한번 싸야할거 같다. 중앙정렬 할 수 있도록..
		return (
            <div ref="gridster" className="gridster">
				<ul>
					<li data-row="1" data-col="1" data-sizex="1" data-sizey="1"></li>
					<li data-row="2" data-col="1" data-sizex="1" data-sizey="1"></li>
					<li data-row="3" data-col="1" data-sizex="1" data-sizey="1"></li>

					<li data-row="1" data-col="2" data-sizex="2" data-sizey="1"></li>
					<li data-row="2" data-col="2" data-sizex="2" data-sizey="2"></li>

					<li data-row="1" data-col="4" data-sizex="1" data-sizey="1"></li>
					<li data-row="2" data-col="4" data-sizex="2" data-sizey="1"></li>
					<li data-row="3" data-col="4" data-sizex="1" data-sizey="1"></li>

					<li data-row="1" data-col="5" data-sizex="1" data-sizey="1"></li>
					<li data-row="3" data-col="5" data-sizex="1" data-sizey="1"></li>

					<li data-row="1" data-col="6" data-sizex="1" data-sizey="1"></li>
					<li data-row="2" data-col="6" data-sizex="1" data-sizey="2"></li>
				</ul>
        	</div>
		);
	}
});
