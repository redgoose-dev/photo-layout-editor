var Sidebar_UploadFiles = React.createClass({

	displayName: 'UploadFiles',

	propTypes: {
		uploadImages: React.PropTypes.array,
		update: React.PropTypes.func
	},

	getInitialState : function()
	{
		return {
			is_multiSelect : false
		}
	},

	componentDidMount : function()
	{
		var self = this;
		var CTRL = 17;
		var CMD = 91;
		function onKeydown(e)
		{
			if (e.keyCode == CTRL || e.keyCode == CMD)
			{
				self.setState({ is_multiSelect: true });
				$(this).off('keydown').on('keyup', onKeyUp);
			}
		}
		function onKeyUp(e)
		{
			self.setState({ is_multiSelect: false });
			$(this).off('keyup').on('keydown', onKeydown);
		}
		$(window).on('keydown', onKeydown);
	},

	onSelect : function(e)
	{
		var currentKey = parseInt(e.currentTarget.getAttribute('data-key'));

		if (this.state.is_multiSelect)
		{
			this.props.uploadImages[currentKey].on = !this.props.uploadImages[currentKey].on;
		}
		else
		{
			this.props.uploadImages.forEach(function(data, key){
				data.on = (key == currentKey) ? !data.on : false;
			});
		}

		this.props.update(this.props.uploadImages);
	},

	/**
	 * render
	 */
	render : function()
	{
		var self = this;
		var items = [];

		// make item elements
		this.props.uploadImages.forEach(function(item, key){
			items.push(
				<li key={key} data-key={key} onClick={self.onSelect}>
					<span style={item.style} className={(item.on) ? 'on' : ''}>.img</span>
				</li>
			);
		});

		return (
            <div className="upload-files">
        		<ul ref="items">{items}</ul>
        	</div>
		);
	}
});
