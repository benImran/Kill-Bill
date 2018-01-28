// ---------------------------------------------------------------
// Include Plugins
// ---------------------------------------------------------------
var gulp = require('gulp');

// Pour le sass / css
var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var notify = require('gulp-notify');


// ---------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------
var path = {
	sass: 'scss/**/*.scss',
	css: 'css/',
	js: 'js/**/*.js'
};

var autoprefixerOptions = {
	browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie >= 9']
};


// Watch task
gulp.task('watch', ['sass'], function() {
	gulp.watch(path.sass, ['sass']);
});

// + cache modified files
// + size the final css filereload on change
// + refresh stream
gulp.task('sass', function() {
	return gulp
		.src(path.sass)
		.pipe(sass())
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(cleanCSS({ debug: true }))
		.pipe(gulp.dest(path.css))
        .pipe(notify({ message: 'SASS recompilé'}));
});


gulp.task('default', ['watch'], function() {});

