const React = require('React');
const ReactDOM = require('ReactDOM');

module.exports = React.createClass({

	displayName : 'NavTop-Color',
	$color : null,

	getInitialState()
	{
		this.root = this.props.root;

		return {
			show : false,
			currentColor : this.root.preference.gridster.blockColor
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
		this.updatePreview(e.target.value.toUpperCase());
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
			backgroundColor : this.state.currentColor
		};

		return (
			<article className="form edit-color">
				<form onSubmit={this.submit}>
					<fieldset>
						<legend className="blind">Edit color form</legend>
						<input type="hidden" ref="color" />
						<div className="preview">
							<input
								type="text"
								maxLength="7"
								value={this.state.currentColor}
								onChange={this.update} />
							<span style={previewStyle}></span>
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