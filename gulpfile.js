var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css');

var del = require('del');

gulp.task('clean:dist', function () {
  return del.sync([
    'dist/**/*',
  ]);
});

gulp.task('html', function () {
    return gulp.src(['app/**/*.html','!app/bower/**/*.html'])
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function () {
    return gulp.src('app/images/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('default',['clean:dist','html','fonts','images'])