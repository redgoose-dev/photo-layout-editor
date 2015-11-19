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
	toggleSetting : function(e)
	{
		var self = this;
		if (!this.state.show_form == true)
		{
			$(document).on('click', function(e){
				if (!$(e.target).closest('#settings').length)
				{
					e.preventDefault();
					$(this).off('click');
					self.setState({ show_form : false });
				}
			});
		}
		this.setState({ show_form : !this.state.show_form });
	},

	closeSetting : function()
	{
		$(document).off('click');
		this.setState({ show_form : false });
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
        			<button type="button" title="Edit preference" onClick={this.toggleSetting}>
						<i className="sp-ico ico-setting abs">Setting</i>
					</button>
					<Container_NavTop_Form
						update={this.props.update}
						reset={this.props.reset}
						preference={this.props.preference}/>
        		</div>
        		<div className="block">
        			<button type="button" title="Shuffle block" onClick={this.props.actShuffleBlocks}>
						<i className="sp-ico ico-arrow-random abs">Random block</i>
					</button>
        		</div>
        		<div className="block">
        			<button type="button" title="Add block" onClick={this.props.actAddBlock}>
						<i className="sp-ico ico-plus abs">Add block</i>
					</button>
        		</div>
        	</nav>
		);
	}
});
