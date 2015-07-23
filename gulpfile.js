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
            './src/js/winston.js',
            './src/js/package.js',
            './src/js/storage.js',
            './src/js/pkg/core.js',
            './src/js/pkg/longwait.js',
            './src/js/pkg/whine.js',
            './src/js/pkg/bookmarks.js',
            './src/js/pkg/links.js',
            './src/js/pkg/history/history.js',
            './src/js/pkg/tabs.js',
            './src/js/pkg/calculator.js',
            './src/js/pkg/youtube.js',
            './src/js/pkg/pinterest.js',
            './src/js/pkg/salesforce.js',
            './src/js/pkg/stackoverflow.js',
            './src/js/pkg/google.js'
        ],
        img: [
            './src/img/**/*.png'
        ],
        styl: [
            './src/styl/**/*.styl'
        ],
        static: [
            './src/*.html',
            './src/manifest.json'
        ]
    },
    vendor: {
        js: [
            './bower_components/bluebird/js/browser/bluebird.js',
            './bower_components/react/react-with-addons.js',
            './bower_components/fuse.js/src/fuse.js',
            './bower_components/reqwest/reqwest.js',
            './bower_components/mathjs/dist/math.js'
        ],
        css: [
            './bower_components/fontawesome/css/font-awesome.min.css'
        ],
        fonts: [
            './bower_components/fontawesome/fonts/fontawesome-webfont.eot',
            './bower_components/fontawesome/fonts/fontawesome-webfont.svg',
            './bower_components/fontawesome/fonts/fontawesome-webfont.ttf',
            './bower_components/fontawesome/fonts/fontawesome-webfont.woff',
            './bower_components/fontawesome/fonts/fontawesome-webfont.woff2',
            './bower_components/fontawesome/fonts/FontAwesome.otf'
        ]
    }
};

gulp.task('stylus', function () {
  gulp.src(paths.app.styl)
    .pipe(stylus())
    .pipe(gulp.dest('./extension/css'));
});

gulp.task('jsx', function () {
    return gulp.src(paths.app.jsx)
        .pipe(react({harmony: true}))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./extension/js'));
});

gulp.task('appjs', function() {
  return gulp.src(paths.app.js)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./extension/js'));
});

gulp.task('vendorjs', function() {
  return gulp.src(paths.vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./extension/js'));
});

gulp.task('static', function() {
  return gulp.src(paths.app.static)
    .pipe(gulp.dest('./extension'));
});

gulp.task('staticjs', function() {
  return gulp.src(['./src/js/options.js','./src/js/popup.js','./src/js/content.js'])
    .pipe(gulp.dest('./extension/js'));
});

gulp.task('eventsjs', function() {
  return gulp.src(['./src/js/winston.js', './src/js/storage.js', './src/js/pkg/history/events.js', './src/js/pkg/clipboard/events.js'])
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

gulp.task('vendorfonts', function() {
  return gulp.src(paths.vendor.fonts)
    .pipe(gulp.dest('./extension/fonts'));
});

gulp.task('default', ['appjs', 'vendorjs', 'staticjs', 'eventsjs', 'vendorcss', 'vendorfonts', 'jsx', 'stylus', 'appimg', 'static']);
