/* jshint node: true */
/* jshint strict:false */

let gulp = require('gulp'),
  pug = require('gulp-pug'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	flatten = require('gulp-flatten'),
	sassLint = require('gulp-sass-lint'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps');

let src = {
	html: 'htdocs/*.html'
};


// BrowserSync init
gulp.task('bs-sync', function () {
	browserSync.init({
		notify: false,
		open: false,
		port: 3030,
		server: {
			baseDir: "htdocs",
			index: "index.html"
		},
		plugins: [
			{
				module: "bs-html-injector",
				options: {
					files: [src.html]
				}
			}
		]
	});
});

// BrowserSync reload
gulp.task('bs-reload', function () {
	browserSync.reload();
});

// Sass Lint
gulp.task('sassLint', function () {
	return gulp.src('./src/scss/**/*.scss')
	           .pipe(sassLint({
		           options: {
			           configFile: '.sass-lint.yml',
			           formatter: 'stylish'
		           }
	           }))
	           .pipe(sassLint.format())
	           .pipe(plumber())
	           .pipe(sassLint.failOnError());
});

// Build CSS
gulp.task('styles', ['sassLint'], function () {
	gulp.src('./src/scss/*.scss')
	    .pipe(sourcemaps.init())
	    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	    .pipe(flatten())
	    .pipe(autoprefixer({
		    browsers: ['last 2 versions'],
		    cascade: false
	    }))
	    .pipe(sourcemaps.write('.'))
	    .pipe(gulp.dest('htdocs/css'))
	    .pipe(browserSync.stream());
});

// Build JS
gulp.task('scripts', function() {
	gulp.src('src/js/*.js')
	    .pipe(concat('build.min.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('htdocs/js'));
});

// build html
gulp.task('views', function buildHTML () {
	return gulp.src('src/views/*.pug')
	           .pipe(pug({
		           // insert options
	           }))
	           .pipe(gulp.dest('htdocs'));
});

// Default gulp task
gulp.task('default', ['bs-sync'], function () {
	gulp.watch('src/scss/**/*.scss', ['styles']);
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/views/**/*.pug', ['views']);
	gulp.watch('src/htdocs/*.html', ['bs-reload']);
});