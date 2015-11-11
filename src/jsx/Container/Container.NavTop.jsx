var Container_NavTop = React.createClass({

	displayName : 'Nav-top',

	getInitialState : function()
	{
		return {
			show_form : false
		};
	},


	/**
	 * CLICK EVENTS
	 */

	/**
	 * Toggle setting form
	 */
	toggleSetting : function()
	{
		if (!this.state.show_form == true)
		{
			// TODO : document에 클릭이벤트를 걸어서 누르면 폼이 닫히게 이벤트 걸기
		}
		this.setState({ show_form : !this.state.show_form });
	},

	/**
	 * Action shuffle blocks
	 */
	actShuffleBlocks : function()
	{
		log('action shuffle blocks')
	},

	/**
	 * Action add blocks
	 */
	actAddBlocks : function()
	{
		log('action add blocks')
	},


	/**
	 * RENDER
	 */
	render : function()
	{
		return (
            <nav className="nav-top">
        		<div className={'block' + ((this.state.show_form) ? ' is-active' : '')}>
        			<button type="button" onClick={this.toggleSetting}>
						<i className="sp-ico ico-setting abs">Setting</i>
					</button>
					<Container_NavTop_Form />
        		</div>
        		<div className="block">
        			<button type="button" onClick={this.actShuffleBlocks}>
						<i className="sp-ico ico-arrow-random abs">Random block</i>
					</button>
        		</div>
        		<div className="block">
        			<button type="button" onClick={this.actAddBlocks}>
						<i className="sp-ico ico-plus abs">Add block</i>
					</button>
        		</div>
        	</nav>
		);
	}
});
