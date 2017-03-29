const path = require('path');

module.exports = {
	watch: true,
	devtool: 'eval',
	entry: './src/js/App.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'photoLayoutEditor.js'
	},
	externals: {
		'jquery': '$',
		'react': 'React',
		'react-dom': 'ReactDOM',
		'redux': 'Redux',
		'react-redux': 'ReactRedux',
		'axios': 'axios',
		'ReactGridLayout': 'ReactGridLayout',
		'react-simple-colorpicker': 'ColorPicker',
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			}
		]
	},

	plugins: [],

};