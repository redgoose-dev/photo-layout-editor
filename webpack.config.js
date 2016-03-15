'use strict';

module.exports = {
	devtool: 'eval',
	resolve: {
		modulesDirectories: ['src/js'],
		extensions: ['', '.jsx', '.js']
	},
	entry: {
		'main': './src/js/App'
	},
	output: {
		path: 'dist/js/',
		filename: 'app.pkgd.js',
		sourceMapFilename: 'maps/app.pkgd.js.map'
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