const React = require('React');

module.exports = React.createClass({

	displayName: 'Result',

	getInitialState()
	{
		return {
			show : false,
			result : 'result',
			show_code : false,
			show_image : false
		};
	},

	/**
	 * Update
	 *
	 * @param {string} str
	 */
	update(str)
	{
		this.setState({
			result : str
		});
	},

	/**
	 * Open
	 *
	 * @param {string} resultText
	 * @param {string} type(code|image)
	 */
	open(resultText, type)
	{
		$('html').addClass('ple-popup-mode');
		this.setState({
			show : true,
			result : resultText,
			show_code : (type == 'code'),
			show_image : (type == 'image')
		});
	},

	/**
	 * Close
	 *
	 */
	close()
	{
		$('html').removeClass('ple-popup-mode');
		ReactDOM.findDOMNode(this.refs.code).scrollTop = 0;
		this.setState({
			show : false,
			result : '',
			show_code : false,
			show_image : false
		});
	},
	
	/**
	 * render
	 */
	render()
	{
		return (
			<article className={'ple-result' + ((this.state.show) ? ' show' : '')}>
				<div className="wrap">
					<h1>Result</h1>
					<textarea
						ref="code"
						className={(this.state.show_code) ? 'show' : ''}
						value={(this.state.show_code) ? this.state.result : ''} />
					<figure ref="image" className={(this.state.show_image) ? 'show' : ''}>
						<img src={(this.state.show_image) ? this.state.result : ''} alt="result image"/>
					</figure>
					<button type="button" className="close" onClick={this.close}><i>close</i></button>
				</div>
			</article>
		);
	}
});