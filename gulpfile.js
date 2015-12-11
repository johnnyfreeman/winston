'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');

var paths = {
		app: {
				img: [
						'./src/img/**/*.png'
				],
				styl: [
						'./src/styl/**/*.styl'
				],
				static: [
						'./src/*.html',
						'./src/manifest.json'
				],
				eventjs: [
						'./src/js/winston.js', 
						'./src/js/storage.js', 
						'./src/js/pkg/history/events.js', 
						'./src/js/pkg/clipboard/events.js'
				]
		},
		vendor: {
				css: [
						'./node_modules/font-awesome/css/font-awesome.min.css'
				],
				fonts: [
						'./node_modules/font-awesome/fonts/fontawesome-webfont.eot',
						'./node_modules/font-awesome/fonts/fontawesome-webfont.svg',
						'./node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
						'./node_modules/font-awesome/fonts/fontawesome-webfont.woff',
						'./node_modules/font-awesome/fonts/fontawesome-webfont.woff2',
						'./node_modules/font-awesome/fonts/FontAwesome.otf'
				]
		}
};


var React = require('react');
var ReactDOMServer = require('react-dom/server');
var through = require('through2');
require('node-jsx').install();
var App = React.createFactory(require('./src/jsx/app.jsx'));

gulp.task('prerender', function () {
	gulp.src('./src/popup.html').pipe(through.obj(function(file, enc, cb) {

		// return empty file
	    if (file.isNull()) {
	      return cb(null, file);
	    }

	    if (file.isBuffer()) {
	    	var html = file.contents.toString('utf8');
	    	html = html.replace('{{APP}}', ReactDOMServer.renderToString(App()));
	    	file.contents = new Buffer(html);
	    }

	    // if (file.isStream()) {
	      // file.contents = file.contents.pipe(prefixStream(prefixText));
	    // }

	    cb(null, file);

	}))
	.pipe(gulp.dest('./extension'));
});

gulp.task('stylus', function () {
	gulp.src(paths.app.styl)
		.pipe(stylus())
		.pipe(gulp.dest('./extension/css'));
});

gulp.task('popupjs', function () {
	return browserify({
			entries: './src/js/popup.js',
			debug: true
		})
		.transform(babelify, {presets: ['es2015', 'react']})
		.bundle()
		.pipe(source('popup.js'))

		// because some gulp plugins don't support streams,
		// but do support buffers
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
				// Add transformation tasks to the pipeline here.
				// .pipe(uglify())
				.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./extension/js/'));
});

gulp.task('optionsjs', function () {
	return browserify({
			entries: './src/js/options.js',
			debug: true
		})
		.transform(babelify, {presets: ['es2015', 'react']})
		.bundle()
		.pipe(source('options.js'))

		// because some gulp plugins don't support streams,
		// but do support buffers
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
				// Add transformation tasks to the pipeline here.
				// .pipe(uglify())
				.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./extension/js/'));
});

gulp.task('contentjs', function () {
	return browserify({
			entries: './src/js/content.js',
			debug: true
		})
		.transform(babelify, {presets: ['es2015', 'react']})
		.bundle()
		.pipe(source('content.js'))

		// because some gulp plugins don't support streams,
		// but do support buffers
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
				// Add transformation tasks to the pipeline here.
				// .pipe(uglify())
				.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./extension/js/'));
});

gulp.task('static', function() {
	return gulp.src(paths.app.static)
		.pipe(gulp.dest('./extension'));
});

gulp.task('eventsjs', function() {
	return gulp.src(paths.app.eventjs)
		.pipe(concat('events.js'))
		.pipe(gulp.dest('./extension/js'));
});

gulp.task('appimg', function() {
	return gulp.src(paths.app.img)
		.pipe(gulp.dest('./extension/img'));
});

gulp.task('vendorcss', function() {
	return gulp.src(paths.vendor.css)
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('./extension/css'));
});

gulp.task('fonts', function() {
	return gulp.src(paths.vendor.fonts)
		.pipe(gulp.dest('./extension/fonts'));
});

gulp.task('default', ['popupjs', 'optionsjs', 'contentjs', 'eventsjs', 'vendorcss', 'fonts', 'stylus', 'appimg', 'static']);


gulp.task('watch', function() {
	gulp.watch(paths.app.styl, ['stylus']);
	gulp.watch(paths.vendor.js, ['vendorjs']);
	gulp.watch(paths.app.static, ['static']);
	gulp.watch(paths.app.eventjs, ['eventjs']);
	gulp.watch(paths.app.img, ['appimg']);
	gulp.watch(paths.vendor.css, ['vendorcss']);
	gulp.watch(paths.vendor.fonts, ['fonts']);
	gulp.watch(['./src/popup.html', './src/jsx/**.jsx'], ['prerender']);
});