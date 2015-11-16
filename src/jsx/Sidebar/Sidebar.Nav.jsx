var Sidebar_Nav = React.createClass({

	displayName : 'Navigation',

	getInitialState : function()
	{
		return {
			inputFile : <input type="file" onChange={this.upload} multiple />
		};
	},

	/**
	 * Attach images
	 */
	attachImages : function()
	{
		log('attach image to grid block');
	},

	/**
	 * Upload images
	 */
	upload : function(e)
	{
		// TODO : 업로드된 이미지 데이터를 Sidebar 컴포넌트에 등록하기
		for (var i=0; i<e.target.files.length; i++)
		{
			log(e.target.files[i]);
		}

		// reset input[type=file]
		var $input = $(this.refs.inputFile);
		$input.replaceWith($input.val('').clone(true));
	},

	/**
	 * Remove images
	 */
	remove : function()
	{
		log('remove image');
	},

	/**
	 * render
	 */
	render : function()
	{
		return (
            <nav className="nav-top">
        		<div className="wrap">
        			<button type="button" title="attach images" onClick={this.attachImages}>
						<i className="sp-ico ico-arrow-left abs">Moving the image to grid block</i>
					</button>
					<span title="upload images">
						<input type="file" ref="inputFile" onChange={this.upload} multiple />
						<i className="sp-ico ico-upload abs">upload images</i>
					</span>
					<button type="button" title="remove images" onClick={this.remove}>
						<i className="sp-ico ico-trash abs">remove images</i>
					</button>
				</div>
			</nav>
		);
	}
});
// <button type="button" onClick={this.upload}></button>
