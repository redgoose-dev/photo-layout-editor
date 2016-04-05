module.exports = React.createClass({

	displayName : 'NavTop-Color',
	$color : null,

	getInitialState()
	{
		return {
			show : false,
			currentColor : window.plePreference.block.defaultColor
		};
	},

	componentDidMount()
	{
		// set $color element
		this.$color = $(ReactDOM.findDOMNode(this.refs.color));

		// init plugin
		setTimeout(() => {
			this.$color.minicolors({
				inline : true,
				defaultValue : '#DDDDDD',
				letterCase: 'uppercase',
				changeDelay: 0,
				change : (hex, opacity) => {
					this.updatePreview(hex);
				}
			});
		}, 0);
	},

	/**
	 * Get contrast YIQ
	 * 배경색과 어울리는 글자색을 가져오기 위하여 색을 확인하여 밝은색을 리턴할지 어두운색을 리턴할지 결정한다.
	 *
	 * @param {string} hexcolor
	 * @return {string}
	 *
	 */
	getContrastYIQ(hexcolor)
	{
		hexcolor = hexcolor.replace('#', '');
		var r = parseInt(hexcolor.substr(0,2),16);
		var g = parseInt(hexcolor.substr(2,2),16);
		var b = parseInt(hexcolor.substr(4,2),16);
		var yiq = ((r*299)+(g*587)+(b*114))/1000;
		return (yiq >= 128) ? '#000' : '#eee';
	},

	/**
	 * Import
	 *
	 * @param {string} getColor
	 *
	 */
	import(getColor)
	{
		this.$color.minicolors('value', getColor);
	},

	/**
	 * Update preview
	 *
	 * @param {string} color
	 *
	 */
	updatePreview(color)
	{
		this.setState({
			currentColor: color.toUpperCase()
		});
	},

	/**
	 * Update input event
	 *
	 * @param {event} e
	 *
	 */
	update(e)
	{
		updatePreview(e.target.value.toUpperCase());
	},

	/**
	 * Submit form
	 *
	 * @param {event} e
	 *
	 */
	submit(e)
	{
		e.preventDefault();
		this.props.updateColor(this.state.currentColor);
	},

	/**
	 * render
	 */
	render()
	{
		var previewStyle = {
			backgroundColor : this.state.currentColor,
			color : this.getContrastYIQ(this.state.currentColor)
		};

		return (
			<article className="form edit-color">
				<form onSubmit={this.submit}>
					<fieldset>
						<legend className="blind">Edit color form</legend>
						<input type="hidden" ref="color" />
						<div className="preview">
							<input type="text" style={previewStyle} defaultValue="#DDDDDD" value={this.state.currentColor} onChange={this.update} />
						</div>
					</fieldset>
					<nav>
						<span><button type="submit" className="submit">Apply</button></span>
					</nav>
				</form>
			</article>
		);
	}
	
});