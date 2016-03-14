module.exports = React.createClass({

	displayName: 'UploadFiles',

	propTypes: {
		uploadImages: React.PropTypes.array,
		update: React.PropTypes.func
	},
	is_multiSelect : false,

	$gridster : null,
	dragTarget : null,

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

		this.$gridster = $('.gridster');
	},

	/**
	 * on select item
	 *
	 * @param {event} e
	 */
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
			window.app.refs.container.refs.gridster.assignImage($(this.dragTarget), img);
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
            <div className="upload-files">
				<div className="wrap">
        			<ul ref="items">{items}</ul>
				</div>
        	</div>
		);
	}
});
