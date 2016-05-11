module.exports = React.createClass({

	displayName: 'UploadFiles',

	propTypes: {
		uploadImages: React.PropTypes.array,
		update: React.PropTypes.func
	},

	$gridster : null,
	dragTarget : null,

	$dragEl : null,
	dragType : null,
	dragPosition : [],

	getInitialState()
	{
		return {}
	},

	componentDidMount()
	{
		this.$gridster = $('#' + window.plePreference.gridster.nameID);
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

		if (window.PLE.keyboardEvent.readySelect)
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
	 */
	onUnselect()
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
		this.dragType = e.type;

		switch(this.dragType)
		{
			case 'dragstart':
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
				break;

			case 'touchstart':
				this.$dragEl = $(e.currentTarget)
					.clone()
					.removeAttr('draggable')
					.addClass('ple-sidebar-placeholder')
					.width($(e.currentTarget).width())
					.height($(e.currentTarget).height())
				;

				$('body').append(this.$dragEl);
				$(e.currentTarget).on('touchmove', (te) => {
					te.preventDefault();

					var touch = te.originalEvent.touches[0];
					this.dragPosition = [touch.pageX, touch.pageY];
					this.$dragEl.css({
						top : touch.pageY - (this.$dragEl.width() * 0.5),
						left : touch.pageX - (this.$dragEl.height() * 0.5)
					});
				});
				break;
		}
	},

	/**
	 * on drag end
	 *
	 * @param {event} e
	 */
	onDragEnd(e)
	{
		switch(this.dragType)
		{
			case 'dragstart':
				this.$gridster.find('li')
					.removeClass('hover')
					.off('dragover dragleave drop');

				break;

			case 'touchstart':
				this.$dragEl.remove();
				this.$dragEl = null;
				$(e.currentTarget).off('touchmove');

				// check gridster item area
				this.dragTarget = this.getGridsterItem()
				break;
		}

		if (this.dragTarget)
		{
			let img = this.props.uploadImages[parseInt(e.currentTarget.getAttribute('data-key'))].image;
			window.PLE.refs.container.refs.gridster.assignImage($(this.dragTarget), img, null);
			this.dragTarget = null;
		}
	},

	/**
	 * get gridster item
	 * 포인트 위치에 있는 gridster블럭을 가져온다.
	 *
	 * @return {Object} gridster item
	 */
	getGridsterItem()
	{
		var $result = null;
		this.$gridster.find('li').each((n, el) => {
			var $this = $(el);
			var pos = $this.offset();
			if (pos.left < this.dragPosition[0] &&
				(pos.left + $this.width()) > this.dragPosition[0] &&
				pos.top < this.dragPosition[1] &&
				(pos.top + $this.height()) > this.dragPosition[1])
			{
				$result = el;
				return false;
			}
		});
		return $result;
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
					onDragEnd={this.onDragEnd}
					onTouchStart={this.onDragStart}
					onTouchEnd={this.onDragEnd}>
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
