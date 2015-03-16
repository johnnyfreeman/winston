var gulp = require('gulp');
var react = require('gulp-react');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');

var paths = {
    app: {
        jsx: [
            './src/jsx/icon.jsx',
            './src/jsx/result.jsx',
            './src/jsx/resultslist.jsx',
            './src/jsx/searchbox.jsx',
            './src/jsx/app.jsx',
            './src/jsx/popup.jsx'
        ],
        js: [
            './src/js/bookmarks.js',
            './src/js/calculator.js',
            './src/js/youtube.js',
            './src/js/google.js'//,
            // './src/js/command.js'
        ],
        img: [],
        styl: [
            './src/styl/**/*.styl'
        ]
    },
    vendor: {
        js: [
            './bower_components/q/q.js',
            './bower_components/react/react-with-addons.js',
            './bower_components/fuse.js/src/fuse.js',
            './bower_components/mathjs/dist/math.js'
        ]
    }
};

gulp.task('stylus', function () {
  gulp.src(paths.app.styl)
    .pipe(stylus())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('jsx', function () {
    return gulp.src(paths.app.jsx)
        .pipe(react({harmony: true}))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('appjs', function() {
  return gulp.src(paths.app.js)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/js'));
});
gulp.task('vendorjs', function() {
  return gulp.src(paths.vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['appjs', 'vendorjs', 'jsx', 'stylus']);
