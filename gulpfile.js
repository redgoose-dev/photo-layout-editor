// log modules
const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const scss = require('gulp-sass');
const rename = require('gulp-rename');

const webpack = require('webpack');
const webpackStream = require('webpack2-stream-watch');


// set directory
const src = './src';
const dist = './dist';
const maps = 'maps';


/**
 * make external resource
 *
 * @param {String} type
 * @param {String} extType
 * @param {Boolean} isDevelop
 * @return {Array}
 */
const externalResource = function(type, extType, isDevelop)
{
	switch(type)
	{
		case 'vendor':
			switch(extType)
			{
				case 'js':
					return [
						(isDevelop) ?
							'./node_modules/react/dist/react.js' :
							'./node_modules/react/dist/react.min.js',
						(isDevelop) ?
							'./node_modules/react-dom/dist/react-dom.js' :
							'./node_modules/react-dom/dist/react-dom.min.js',
						(isDevelop) ?
							'./node_modules/redux/dist/redux.js' :
							'./node_modules/redux/dist/redux.min.js',
						(isDevelop) ?
							'./node_modules/react-redux/dist/react-redux.js' :
							'./node_modules/react-redux/dist/react-redux.min.js',
						'./node_modules/jquery/dist/jquery.min.js',
						'./vendors/gridster.js/jquery.gridster.min.js',
						'./vendors/jquery-minicolors/jquery.minicolors.min.js',
					];
					break;
				case 'css':
					return [
						'./vendors/gridster.js/jquery.gridster.min.css',
						'./vendors/jquery-minicolors/jquery.minicolors.min.css',
					];
					break;
			}
			break;
	}
	return [];
};


// build vendor files
gulp.task('vendor', function(){
	// development vendors
	gulp.src(externalResource('vendor', 'js', true))
		.pipe(concat('photoLayoutEditor.vendors.dev.js', { newLine: '\n\n' }))
		.pipe(gulp.dest(dist));

	// production vendors
	gulp.src(externalResource('vendor', 'js', false))
		.pipe(concat('photoLayoutEditor.vendors.js', { newLine: '\n\n' }))
		.pipe(gulp.dest(dist));

	gulp.src(externalResource('vendor', 'css', false))
		.pipe(scss({
			outputStyle: 'compressed'
		}).on('error', scss.logError))
		.pipe(concat('photoLayoutEditor.vendors.css', { newLine: '\n\n' }))
		.pipe(gulp.dest(dist));
});


// build scss
gulp.task('scss', function(){
	gulp.src(`${src}/scss/app.scss`)
		.pipe(sourcemaps.init())
		.pipe(scss({
			//outputStyle : 'compact'
			outputStyle: 'compressed'
		}).on('error', scss.logError))
		.pipe(rename('photoLayoutEditor.css'))
		.pipe(sourcemaps.write(maps))
		.pipe(gulp.dest(dist));
});
gulp.task('scss:watch', function(){
	gulp.watch(`${src}/scss/*.scss`, ['scss']);
});


gulp.task('js', function() {
	return gulp.src(`${src}/js/App.js`)
		.pipe(
			webpackStream(
				require('./webpack.config.js'),
				webpack
			)
		)
		.pipe(gulp.dest(dist));
});