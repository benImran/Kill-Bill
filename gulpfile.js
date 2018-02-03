// ---------------------------------------------------------------
// Include Plugins
// ---------------------------------------------------------------
let gulp = require('gulp');

// Serveur local
let browserSync = require('browser-sync');

// Pour le sass / css
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let stripCssComments = require('gulp-strip-css-comments');

// Pour le JS
let uglify = require('gulp-uglify');

// Pour les images
let imagemin = require('gulp-imagemin');

// Concatenation des imports HTML
let usemin = require('gulp-usemin');

// Gestion des erreurs / notifs
let plumber = require('gulp-plumber');
let gutil = require('gulp-util');
let notify = require('gulp-notify');

// Autres
let del = require('del');
let size = require('gulp-size');

// ---------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------
let path = {
	sass: 'app/scss/**/*.scss',
	css: 'app/css/**/*.css',
  	devcss: 'app/css/',
	js: 'app/js/**/*.js',
	img: 'app/img/**/*',
	icons: 'app/icons/*.svg',
	svgSprite: 'app/icons/dest',
	fonts: 'app/fonts/*.{ttf,woff,eof,svg,otf}',
	html: 'app/*.html',
	json: 'app/js/**/*.json',
  	resources: './app/resources/**/*',

	dist: 'dist/',
	dist_jsFiles: 'dist/js/**/*.js',
	dist_js: 'dist/js/',
	dist_cssFiles: 'dist/css/**/*.css',
	dist_css: 'dist/css/',
	dist_img: 'dist/img/',
	dist_fonts: 'dist/fonts/',
	dist_icons: 'dist/icons/',
	dist_resources: './dist/resources'
};

let autoprefixerOptions = {
	browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie >= 9']
};

let reload = browserSync.reload;

// gulp-plumber + gulp-util are used for proper error handling and formatting
// see source : https://www.timroes.de/2015/01/06/proper-error-handling-in-gulp-js/
let gulp_src = gulp.src;
gulp.src = function() {
	return gulp_src.apply(gulp, arguments)
		.pipe(plumber(function(error) {
			// Output an error message
			gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
			// emit the end event, to properly end the task
			this.emit('end');
		}));
};

// ---------------------------------------------------------------
// MICRO TASKS
// ---------------------------------------------------------------

// Static Server
gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

// Watch task
gulp.task('watch', ['sass','serve'], function() {
	gulp.watch(path.sass, ['sass']);
	gulp.watch(path.html, reload);
	gulp.watch(path.js, reload);
});

// Add Sourcemaps + Autoprefixer
// + cache modified files
// + size the final css filereload on change
// + refresh stream
gulp.task('sass', function() {
	return gulp
		.src(path.sass)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(sourcemaps.write())
		.pipe(cleanCSS({ debug: true }))
		.pipe(gulp.dest(path.devcss))
		.pipe(size())
		.pipe(reload({ stream: true }))
        .pipe(notify({ message: 'SASS recompilé'}));
});



// Production Assets : Use HTML to find and concat all CSS and JS files
// and move HTML, CSS and JS in dist in the good folder
gulp.task('js-css-html-prod', function() {
	return gulp.src(path.html)
		.pipe(usemin({
			cssmin: cleanCSS({ debug: true }),
			jsmin: uglify()
		}))
		.pipe(gulp.dest(path.dist));
});

gulp.task('css-prod', ['js-css-html-prod'], function() {
	return gulp.src(path.dist_cssFiles)
		.pipe(cleanCSS({ debug: true }))
		.pipe(gulp.dest(path.dist_css))
        .pipe(notify({ message: 'CSS prod minifié'}));
});

gulp.task('js-prod', ['js-css-html-prod'], function() {
	return gulp.src(path.dist_jsFiles)
		.pipe(uglify())
		.pipe(gulp.dest(path.dist_js))
        .pipe(notify({ message: 'JS prod minifié'}));
});

// Production : Minification des JS dynamiquements crées par js-css-html-prod
gulp.task('assets-prod', ['js-css-html-prod', 'css-prod', 'js-prod'], function() {
});

// Compress Images
gulp.task('img', function() {
	return gulp
		.src(path.img)
		.pipe(imagemin([
			imagemin.jpegtran({progressive: true}), // JPEG opti
			imagemin.optipng({optimizationLevel: 5}), // PNG opti
			imagemin.svgo({plugins: [{removeViewBox: true}]}) // SVG opti
		]))
		.pipe(gulp.dest(path.dist_img))
        .pipe(notify({ message: 'IMG minified'}));
});

// Deleting all dist content
gulp.task('clean', function() {
	return del.sync('dist');
});

// ---------------------------------------------------------------
// MACRO TASKS
// ---------------------------------------------------------------

gulp.task('default', ['watch'], function() {});

gulp.task('production', ['clean', 'assets-prod', 'img'], function() {

	// Copy fonts files to dist
	gulp.src(path.fonts)
		.pipe(gulp.dest(path.dist_fonts));

		// Copy fonts files to dist
		gulp.src(path.json)
			.pipe(gulp.dest(path.dist_js))


	// Copy SVG icons to dist
	gulp.src(path.icons)
		.pipe(gulp.dest(path.dist_icons));

	// Copy SVG sprite & PNG fallbacks to dist
	gulp.src('app/icons/dest/*.{svg,png}')
		.pipe(gulp.dest(path.dist_icons + 'dest/'));

	// Copy js vendor files to dist
	// PAS utile, tous les vendors minifiés dans main.min.js au build !
	// gulp.src('app/js/vendor/*.js')
	// 	.pipe(gulp.dest('dist/js/vendor'));

	// Copy resources to dist
	gulp.src( path.resources )
		.pipe( gulp.dest( path.dist_resources ) );
});
