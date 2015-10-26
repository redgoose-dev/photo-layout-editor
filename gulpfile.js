var gulp = require('gulp');
var concat = require('gulp-concat');
var scss = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');


// react.js compile
gulp.task('react', function(){
	return gulp.src('src/jsx/*.jsx')
		.pipe(concat('PhotoLayoutEditor.js', { newLine: '\n' }))
		.pipe(babel())
		.pipe(gulp.dest('src/js/'));
});
// concat javascript files
gulp.task('javascript', function(){
	gulp.src('src/js/PhotoLayoutEditor.js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest('dist/js/'))
	;
});
// react and javascript
gulp.task('react_and_javascript', function(callback){
	runSequence(
		'react',
		['javascript'],
		callback
	);
});
// watch react and javascript
gulp.task('react_and_javascript:watch', function(){
	gulp.watch('src/jsx/*.jsx', ['react_and_javascript']);
});


// scss to css
gulp.task('scss', function(){
	gulp.src([ 'src/scss/index.scss' ])
		.pipe(sourcemaps.init())
		.pipe(scss({
			outputStyle: 'compact'
			//outputStyle: 'compressed'
		}).on('error', scss.logError))
		.pipe(concat('PhotoLayoutEditor.css', { newLine: '\n' }))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest('dist/css/'));
});
gulp.task('scss:watch', function(){
	gulp.watch([ 'src/scss/index.scss' ], ['scss']);
});


// default
gulp.task('default', function(){
    console.log('hello');
});