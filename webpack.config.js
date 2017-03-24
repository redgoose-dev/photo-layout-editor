module.exports = {
	watch: false,
	devtool: 'eval',
	output: {
		filename: 'photoLayoutEditor.js'
	},
	externals: {
		'jquery': '$',
		'react': 'React',
		'react-dom': 'ReactDOM',
		'redux' : 'Redux',
		'react-redux' : 'ReactRedux',
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ 'es2015', 'stage-0', 'react' ],
					}
				},
			}
		]
	}

};