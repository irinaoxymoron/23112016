'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('autoprefixer'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create();

var app_dir = 'app';
var wp_dir = 'dist';

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: wp_dir
        }
    });
});

gulp.task('sass', function () {
    return gulp.src(app_dir + '/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest(wp_dir + '/css'));
});

gulp.task('moveJs', function () {
    return gulp.src([
        app_dir + '/js/main.js'
    ])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(wp_dir + '/js'));
});

gulp.task('moveHtml', function () {
    return gulp.src(app_dir + '/*.html')
        .pipe(fileinclude())
        .pipe(gulp.dest(wp_dir));
});

gulp.task('watch', function () {
    gulp.watch(app_dir + '/scss/**/*.scss', gulp.series('sass'));
    gulp.watch(app_dir + '/js/*.js', gulp.series('moveJs'));
    gulp.watch(app_dir + '/**/*.html', gulp.series('moveHtml'));
});

gulp.task('rebase', gulp.series(
    'moveHtml',
    'moveJs',
    'sass'
));

gulp.task('default', gulp.series('rebase', gulp.parallel('browser-sync', 'watch')));

var onError = function(err) {
    notify.onError({
        title: "Error in " + err.plugin
    })(err);
    this.emit('end');
};