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
		this.props.upload(e.target.files);

		// reset input[type=file]
		var $input = $(this.refs.inputFile);
		$input.replaceWith($input.val('').clone(true));
	},

	/**
	 * render
	 */
	render : function()
	{
		return (
            <nav className="nav-top">
        		<div className="wrap">
        			<button type="button" title="attach images" onClick={this.props.attach}>
						<i className="sp-ico ico-arrow-left abs">Moving the image to grid block</i>
					</button>
					<span title="upload images">
						<input type="file" ref="inputFile" onChange={this.upload} multiple />
						<i className="sp-ico ico-upload abs">upload images</i>
					</span>
					<button type="button" title="remove images" onClick={this.props.remove}>
						<i className="sp-ico ico-trash abs">remove images</i>
					</button>
				</div>
			</nav>
		);
	}
});
// <button type="button" onClick={this.upload}></button>
