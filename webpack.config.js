module.exports = {
	watch: true,
	devtool: 'eval',
	resolve: {
		modulesDirectories: ['src/js'],
		extensions: ['', '.jsx', '.js']
	},
	output: {
		filename: 'app.pkgd.js'
	},
	externals: {
		'jquery': '$',
		'React': 'React',
		'ReactDOM': 'ReactDOM',
		'fastclick': 'fastclick',
		'imagesLoaded': 'imagesLoaded'
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['babel-preset-es2015', 'babel-preset-react']
				}
			}
		]
	}
};