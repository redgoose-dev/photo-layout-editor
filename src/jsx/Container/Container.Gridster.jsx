var Container_Gridster = React.createClass({

	displayName : 'Gridster',

	$gridster : null,
	gridster : null,

	componentDidMount : function()
	{
		this.$gridster = $(ReactDOM.findDOMNode(this.refs.gridster));
		this.create();
		// TODO : 랜덤으로 블럭을 추가하는 함수 실행
	},

	getGridsterWidth : function()
	{

	},

	create : function()
	{
		var preference = this.props.preference;
		var innnerMargin = preference.inner_margin * 0.5;
		var outerMargin = innnerMargin + preference.outer_margin;

		this.$gridster.css('padding', outerMargin+'px');
		this.gridster = this.$gridster.append('<ul/>').children('ul').gridster({
			widget_margins: [innnerMargin, innnerMargin],
			widget_base_dimensions: [preference.width, preference.height]
		}).data('gridster');

		// TODO : 가로 계산하는 함수 만들기 ㅠㅠ
	},

	clear : function()
	{
		this.$gridster.children().remove();
		this.$gridster.removeClass('ready').removeAttr('style');
		log(this.$gridster);
	},

	updatePreference : function(params)
	{
		var self = this;

		this.clear();

		//log(this.$gridster.html());
		//this.gridster.destroy(true);
		//this.create();
	},

	block : function(params)
	{
		if (!params.sizeX || !params.sizeY) return false;

		var $li = $('<li></li>');
		//$li.on('click', function(){ log('hello') });

		this.gridster.add_widget($li, params.sizeX, params.sizeY, false);
	},

	addBlock : function()
	{
		this.block({ sizeX : 1, sizeY : 1 });
	},

	shuffleBlocks : function()
	{

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
            <div className="gridster-wrap">
				<div ref="gridster" className="gridster"></div>
        	</div>
		);
	}
});
