let babelify = require('babelify');
let browserify = require('browserify')
let buffer = require('vinyl-buffer');
let concat = require('gulp-concat');
let del = require('del');
let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let gulpif = require('gulp-if');
let minifyCSS = require('gulp-csso');
let pug = require('gulp-pug');
let sass = require('gulp-sass');
let source = require('vinyl-source-stream');
let sourcemaps = require('gulp-sourcemaps');
let sync = require('browser-sync').create();
let uglify = require('gulp-uglify');

let isProd = process.env.NODE_ENV === 'production';


/**
 * SCSS
 */
function scss() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpif(isProd, minifyCSS()))
        .pipe(gulpif(!isProd, sourcemaps.write('.')))
        .pipe(gulp.dest('dist/css'))
        .pipe(sync.stream());
}

function html() {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist/'));
}

/**
 * JS
 */
// TODO: GULP PATH FOR JS
function js() {
    return browserify({entries: ['app/**/*.js'], debug: true})
        .transform(babelify, {presets: 'es2015'})
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulpif(!isProd, sourcemaps.init({loadMaps: true})))
        .pipe(uglify())
        .pipe(gulpif(!isProd, sourcemaps.write('.')))
        .pipe(gulp.dest('app/js'))
        .pipe(sync.stream());
}

/**
 * IMAGES
 */

function images() {
    return gulp.src('app/img/**/*')
        .pipe(gulpif(isProd, imagemin({verbose: true})))
        .pipe(gulp.dest('dist/img'));
}

/**
 * FONTS
 */
function fonts() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
}

/**
 * GLOBAL
 */
function clean() {
    return del(['dist']);
}


// TODO: ADD GULP JS TO PARALLEL
gulp.task('build', gulp.series(clean, gulp.parallel(html, scss, images, fonts )));

gulp.task('default', gulp.parallel(html, scss, images, fonts, function(done) {
    sync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('app/**/*.scss', scss);
   // gulp.watch('src/**/*.js', js);

    done();

}));
