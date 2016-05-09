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
		var type = e.type;

		// TODO : 터치 드래그 이벤트 때문에 드래그 컴포넌트를 만들어야할거 같음.
		// TODO : 드래그 시작하면 타겟을 복제해야함. 그리고 마우스 위치를 따라가게 하기 위해서 move 이벤트를 추가할 필요가 있음.
		// TODO : 마우스 포인트가 대상 영역에 들어가면 마우스 포인트가 변하게 해야함.
		// TODO : end 이벤트가 일어났으면 복제한 타겟을 삭제하고 드래그 이벤트를 전부 off시킴
		// TODO : 대상에 들어갔는지 확인하고 대상에다 놓았으면 gridster 업데이트.

		// switch(e.type)
		// {
		// 	//case 'dragstart':
		// 	case 'touchstart':
		// 		this.$gridster.find('li').on('dragover', (e) => {
		// 			e.preventDefault();
		// 			$(e.currentTarget).addClass('hover');
		// 		}).on('dragleave', (e) => {
		// 			e.preventDefault();
		// 			$(e.currentTarget).removeClass('hover');
		// 		}).on('drop', (e) => {
		// 			e.preventDefault();
		// 			this.dragTarget = e.currentTarget;
		// 		});
		// 		break;
		//
		// 	//case 'touchstart':
		// 	case 'dragstart':
		// 		log(e.currentTarget);
		//
		// 		break;
		// }
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
			window.PLE.refs.container.refs.gridster.assignImage($(this.dragTarget), img, null);
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
				<li key={key} data-key={key} draggable="false"
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
