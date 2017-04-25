// log modules
const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const scss = require('gulp-sass');
const rename = require('gulp-rename');


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
					return (isDevelop) ? [
						'./node_modules/jquery/dist/jquery.slim.js',
						'./node_modules/react/dist/react.js',
						'./node_modules/react-dom/dist/react-dom.js',
						'./node_modules/redux/dist/redux.js',
						'./node_modules/react-redux/dist/react-redux.js',
						'./node_modules/axios/dist/axios.js',
						'./node_modules/react-grid-layout/dist/react-grid-layout.min.js',
						'./node_modules/react-simple-colorpicker/umd/index.js',
					] : [
						'./node_modules/jquery/dist/jquery.slim.min.js',
						'./node_modules/react/dist/react.min.js',
						'./node_modules/react-dom/dist/react-dom.min.js',
						'./node_modules/redux/dist/redux.min.js',
						'./node_modules/react-redux/dist/react-redux.min.js',
						'./node_modules/axios/dist/axios.min.js',
						'./node_modules/react-grid-layout/dist/react-grid-layout.min.js',
						'./node_modules/react-simple-colorpicker/umd/index.js',
					];
					break;
				case 'css':
					return [
						'./node_modules/react-grid-layout/css/styles.css',
						'/node_modules/react-resizable/css/styles.css',
					];
					break;
			}
			break;
	}
	return [];
};


// build development vendor
gulp.task('vendor', function(){
	gulp.src(externalResource('vendor', 'js', true))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write(null, {addComment: false}))
		.pipe(concat('photoLayoutEditor.vendors.dev.js', { newLine: '\n\n' }))
		.pipe(gulp.dest(dist));

	gulp.src(externalResource('vendor', 'css', false))
		.pipe(scss({
			outputStyle: 'compressed'
		}).on('error', scss.logError))
		.pipe(concat('photoLayoutEditor.vendors.dev.css', { newLine: '\n\n' }))
		.pipe(gulp.dest(dist));
});
// build production vendor
gulp.task('vendor-pro', function(){
	gulp.src(externalResource('vendor', 'js', false))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write(null, {addComment: false}))
		.pipe(concat('photoLayoutEditor.vendors.js', { newLine: '\n\n' }))
		.pipe(gulp.dest(dist));

	gulp.src(externalResource('vendor', 'css', false))
		.pipe(scss({
			outputStyle: 'compressed'
		}).on('error', scss.logError))
		.pipe(concat('photoLayoutEditor.vendors.css', { newLine: '\n\n' }))
		.pipe(gulp.dest(dist));
});


function cssBuild(type=null)
{
	if (type === 'pro')
	{
		gulp.src(`${src}/App/style/app.scss`)
			.pipe(scss({
				outputStyle: 'compressed'
			}).on('error', scss.logError))
			.pipe(rename('photoLayoutEditor.css'))
			.pipe(gulp.dest(dist));
	}
	else
	{
		gulp.src(`${src}/App/style/app.scss`)
			.pipe(sourcemaps.init())
			.pipe(scss({
				outputStyle: 'compact'
			}).on('error', scss.logError))
			.pipe(rename('photoLayoutEditor.dev.css'))
			.pipe(sourcemaps.write(maps))
			.pipe(gulp.dest(dist));
	}
}

// build scss
gulp.task('scss', () => cssBuild());
gulp.task('scss:watch', function(){
	gulp.watch(`${src}/App/style/**/*.scss`, ['scss']);
});
gulp.task('scss-pro', () => cssBuild('pro'));
