module.exports = React.createClass({

	displayName: 'UploadFiles',

	propTypes: {
		uploadImages: React.PropTypes.array,
		update: React.PropTypes.func
	},
	is_multiSelect : false,

	getInitialState()
	{
		return {}
	},

	componentDidMount()
	{
		const CTRL = 17;
		const CMD = 91;

		var onKeydown = (e) => {
			if (e.keyCode == CTRL || e.keyCode == CMD)
			{
				this.is_multiSelect = true;
				$(window).off('keydown').on('keyup', onKeyUp);
			}
		};

		var onKeyUp = () => {
			this.is_multiSelect = false;
			$(window).off('keyup').on('keydown', onKeydown);
		};

		$(window).on('keydown', onKeydown);
	},

	onSelect(e)
	{
		let currentKey = parseInt(e.currentTarget.getAttribute('data-key'));
		let uploadImages = this.props.uploadImages;

		if (this.is_multiSelect)
		{
			uploadImages[currentKey].on = !uploadImages[currentKey].on;
		}
		else
		{
			uploadImages.forEach((data, key) => {
				data.on = (key == currentKey) ? !data.on : false;
			});
		}

		this.props.update(uploadImages);
	},

	/**
	 * render
	 */
	render()
	{
		var items = [];

		// make item elements
		this.props.uploadImages.forEach((item, key) => {
			items.push(
				<li key={key} data-key={key} onClick={this.onSelect}>
					<span style={item.style} className={(item.on) ? 'on' : ''}>.img</span>
				</li>
			);
		});

		return (
            <div className="upload-files">
				<div className="wrap">
        			<ul ref="items">{items}</ul>
				</div>
        	</div>
		);
	}
});
