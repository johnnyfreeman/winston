var gulp = require('gulp');
var react = require('gulp-react');
var stylus = require('gulp-stylus');

gulp.task('stylus', function () {
  gulp.src('./src/styl/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('jsx', function () {
    return gulp.src('./src/jsx/**/*.jsx')
        .pipe(react({harmony: true}))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['jsx', 'stylus']);
