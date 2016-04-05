module.exports = React.createClass({

	displayName: 'UploadFiles',

	propTypes: {
		uploadImages: React.PropTypes.array,
		update: React.PropTypes.func
	},

	$gridster : null,
	dragTarget : null,

	getInitialState()
	{
		return {}
	},

	componentDidMount()
	{
		this.$gridster = $('.gridster');
	},

	/**
	 * on select item
	 *
	 * @param {event} e
	 */
	onSelect(e)
	{
		e.stopPropagation();

		let currentKey = parseInt(e.currentTarget.getAttribute('data-key'));
		let uploadImages = this.props.uploadImages;

		if (window.keyboardEvent.readySelect)
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
	 * on un select items
	 *
	 * @param {event} e
	 */
	onUnselect(e)
	{
		let uploadImages = this.props.uploadImages;
		uploadImages.forEach((data, key) => {
			data.on = false;
		});
		this.props.update(uploadImages);
	},

	/**
	 * on drag start
	 *
	 * @param {event} e
	 */
	onDragStart(e)
	{
		this.$gridster.find('li').on('dragover', (e) => {
			e.preventDefault();
			$(e.currentTarget).addClass('hover');
		}).on('dragleave', (e) => {
			e.preventDefault();
			$(e.currentTarget).removeClass('hover');
		}).on('drop', (e) => {
			e.preventDefault();
			this.dragTarget = e.currentTarget;
		});
	},

	/**
	 * on drag end
	 *
	 * @param {event} e
	 */
	onDragEnd(e)
	{
		this.$gridster.find('li')
			.removeClass('hover')
			.off('dragover dragleave drop');

		if (this.dragTarget)
		{
			let img = this.props.uploadImages[parseInt(e.currentTarget.getAttribute('data-key'))].image;
			window.app.refs.container.refs.gridster.assignImage($(this.dragTarget), img, null);
			this.dragTarget = null;
		}
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
				<li key={key} data-key={key} draggable="true"
					onClick={this.onSelect}
					onDragStart={this.onDragStart}
					onDragEnd={this.onDragEnd}>
					<span style={item.style} className={(item.on) ? 'on' : ''}>.img</span>
				</li>
			);
		});

		return (
            <div className="upload-files" onClick={this.onUnselect}>
				<div className="wrap">
        			<ul ref="items">{items}</ul>
				</div>
        	</div>
		);
	}
	
});
