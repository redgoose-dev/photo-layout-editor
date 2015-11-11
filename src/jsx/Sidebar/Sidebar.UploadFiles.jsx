var Sidebar_UploadFiles = React.createClass({

	displayName : 'UploadFiles',

	/**
	 * render
	 */
	render : function()
	{
		var style = [
			{ backgroundImage : 'url(./assets/img/tmp-simg-01.jpg)' },
			{ backgroundImage : 'url(./assets/img/tmp-simg-02.jpg)' },
			{ backgroundImage : 'url(./assets/img/tmp-simg-03.jpg)' },
			{ backgroundImage : 'url(./assets/img/tmp-simg-04.jpg)' }
		]
		return (
            <div className="upload-files">
        		<ul>
        			<li><span style={style[0]}>.img</span></li>
					<li><span style={style[1]}>.img</span></li>
					<li><span style={style[2]}>.img</span></li>
					<li><span style={style[3]}>.img</span></li>
        		</ul>
        	</div>
		);
	}
});
