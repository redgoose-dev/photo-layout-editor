var log = function(o) { console.log(o); };

// log modules
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var scss = require('gulp-sass');
var rename = require('gulp-rename');

var webpack = require('webpack-stream');


// set directory
var src = './src';
var dist = './dist';
var maps = 'maps';


/**
 * make external resource
 *
 * @param {string} type
 * @param {string} extType
 * @param {boolean} isDevelop
 * @return {array}
 */
var externalResource = function(type, extType, isDevelop)
{
	switch(type)
	{
		case 'minify':
			switch(extType)
			{
				case 'js':
					return [
						src + '/vendor/ducksboard-gridster.js/dist/jquery.gridster.js'
					];
					break;
				case 'css':
					return [
						src + '/vendor/jquery-minicolors/jquery.minicolors.css'
					];
					break;
			}
			break;
		case 'vendor':
			switch(extType)
			{
				case 'js':
					return [
						(
							(isDevelop) ?
								'./node_modules/react/dist/react.js' :
								'./node_modules/react/dist/react.min.js'
						),
						'./node_modules/react-dom/dist/react-dom.min.js',
						'./node_modules/jquery/dist/jquery.min.js',
						src + '/vendor/ducksboard-gridster.js/dist/jquery.gridster.min.js',
						src + '/vendor/jquery-minicolors/jquery.minicolors.min.js'
					];
					break;
				case 'css':
					return [
						src + '/vendor/ducksboard-gridster.js/dist/jquery.gridster.min.css',
						src + '/vendor/jquery-minicolors/jquery.minicolors.min.css'
					];
					break;
			}
			break;
	}
	return [];
};


// Minify files
gulp.task('minify', function(){
	if (externalResource('minify', 'js', false).length)
	{
		externalResource('minify', 'js', false).forEach(function(o){
			var dir = o.substring(0,o.lastIndexOf("/")+1);
			gulp.src(o)
				.pipe(uglify())
				.pipe(rename({ suffix : '.min' }))
				.pipe(gulp.dest(dir));
		});
	}
	if (externalResource('minify', 'css', false).length)
	{
		externalResource('minify', 'css', false).forEach(function(o){
			var dir = o.substring(0,o.lastIndexOf("/")+1);
			gulp.src(o)
				.pipe(scss({
					outputStyle: 'compressed'
				}).on('error', scss.logError))
				.pipe(rename({ suffix : '.min' }))
				.pipe(gulp.dest(dir));
		});
	}
});


// build vendor files
gulp.task('vendor', function(){
	gulp.src(externalResource('vendor', 'js', true))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(concat('vendor.pkgd.js', { newLine: '\n\n' }))
		.pipe(sourcemaps.write(maps))
		.pipe(gulp.dest(dist + '/js'));

	gulp.src(externalResource('vendor', 'js', false))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(concat('vendor.pkgd.min.js', { newLine: '\n\n' }))
		.pipe(sourcemaps.write(maps))
		.pipe(gulp.dest(dist + '/js'));

	gulp.src(externalResource('vendor', 'css', false))
		.pipe(sourcemaps.init())
		.pipe(scss({
			outputStyle: 'compressed'
		}).on('error', scss.logError))
		.pipe(concat('vendor.pkgd.css', { newLine: '\n\n' }))
		.pipe(sourcemaps.write(maps))
		.pipe(gulp.dest(dist + '/css'));
});


// build scss
gulp.task('scss', function(){
	gulp.src(src + '/scss/app.scss')
		.pipe(sourcemaps.init())
		.pipe(scss({
			//outputStyle : 'compact'
			outputStyle: 'compressed'
		}).on('error', scss.logError))
		.pipe(rename({ suffix: '.pkgd' }))
		.pipe(sourcemaps.write(maps))
		.pipe(gulp.dest(dist + '/css'));
});
gulp.task('scss:watch', function(){
	gulp.watch(src + '/scss/*.scss', ['scss']);
});


gulp.task('js', function() {
	return gulp.src(src + '/jsx/App.jsx')
		.pipe(
			webpack(
				require('./webpack.config.js')
			)
		)
		.pipe(gulp.dest(dist + '/js/'));
});