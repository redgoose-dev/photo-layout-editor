module.exports = {
	watch: true,
	devtool: 'eval',
	resolve: {
		modulesDirectories: ['src/js'],
		extensions: ['', '.js']
	},
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
		loaders: [
			{
				test: /\.(js)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['babel-preset-es2015', 'babel-preset-react']
				}
			}
		]
	}
};