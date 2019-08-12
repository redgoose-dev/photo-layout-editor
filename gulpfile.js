const gulp = require('gulp');
const shell = require('shelljs');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');


// set files location
const files = {
	input: './src/PhotoLayoutEditor.js',
	output: './build/PhotoLayoutEditor.js',
	output_min: './dist/PhotoLayoutEditor.min.js',
};


// make vendor
gulp.task('make-vendor', function() {
	try {
		// remove `build` directory
		shell.rm('-rf', 'vendor');
		// make `build` directory
		shell.mkdir('-p', 'vendor');
		// copy react
		shell.cp('-R', 'node_modules/react/umd/react.production.min.js', 'vendor/');
		shell.cp('-R', 'node_modules/react-dom/umd/react-dom.production.min.js', 'vendor/');
		// copy jquery
		shell.cp('-R', 'node_modules/jquery/dist/jquery.slim.min.js', 'vendor/');
		// copy `build`
		shell.cp('-R', 'node_modules/react-photo-layout-editor/build/*', 'vendor/');

		console.log('Complete make build');
	} catch(e) {
		console.error(e);
	}
});


// build function
async function build()
{
	try {
		const bundle = await rollup.rollup({
			input: files.input,
			plugins: [ babel() ],
			external: [
				'React',
				'ReactDOM',
				'PLE',
			],
		});
		bundle.write({
			file: files.output,
			format: 'umd',
			name: 'PhotoLayoutEditor',
			sourcemap: true,
			globals: {
				React: 'React',
				ReactDOM: 'ReactDOM',
				PLE: 'PhotoLayoutEditor',
			},
		});
		return null;
	} catch(e) {
		console.error(e);
	}
}


// build src
gulp.task('build', build);

// watch build src
gulp.task('build:watch', function() {
	gulp.watch('./src/**/*.js', async function(e) {
		await build();
		console.warn(new Date());
		console.log(`${e.type} - ${e.path}`);
	});
});
