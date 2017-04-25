const path = require('path');
const webpack = require('webpack');

const prod = process.env.NODE_ENV === 'production';


module.exports = {
	watch: !prod,
	devtool: prod ? 'cheap-module-source-map' : 'eval',
	entry: './src/App/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: `photoLayoutEditor${prod ? '' : '.dev'}.js`
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