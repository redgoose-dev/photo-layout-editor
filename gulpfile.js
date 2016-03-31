var log = function(o) { console.log(o); }

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


// set vendor files
var minifis = {
	js : [
		src + '/vendor/ducksboard-gridster.js/dist/jquery.gridster.js'
	],
	css : []
};
var vendors = {
	js : [
		'./node_modules/react/dist/react.js',
		'./node_modules/react-dom/dist/react-dom.min.js',
		'./node_modules/jquery/dist/jquery.min.js',
		src + '/vendor/ducksboard-gridster.js/dist/jquery.gridster.min.js'
	],
	css : [
		src + '/vendor/ducksboard-gridster.js/dist/jquery.gridster.min.css'
	]
};


// Minify files
gulp.task('minify', function(){
	if (minifis.js.length)
	{
		minifis.js.forEach(function(o){
			var dir = o.substring(0,o.lastIndexOf("/")+1);
			gulp.src(o)
				.pipe(uglify())
				.pipe(rename({ suffix : '.min' }))
				.pipe(gulp.dest(dir));
		});
	}
	if (minifis.css.length)
	{
		minifis.css.forEach(function(o){
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
	gulp.src(vendors.js)
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(concat('vendor.pkgd.js', { newLine: '\n\n' }))
		.pipe(sourcemaps.write(maps))
		.pipe(gulp.dest(dist + '/js'));

	gulp.src(vendors.css)
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
		.pipe(webpack( require('./webpack.config.js') ))
		.pipe(gulp.dest(dist + '/js/'));
});