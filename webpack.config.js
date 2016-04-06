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
		'ReactDOM': 'ReactDOM'
	},
	module: {
		loaders: [
			{
				test: /\.(jsx|js)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['babel-preset-es2015', 'babel-preset-react']
				}
			}
		]
	}
};