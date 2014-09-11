(function() {
    'use strict';

    var angularHTMLify = require('gulp-angular-htmlify');
    var autoprefixer = require('gulp-autoprefixer');
    var del = require('del');
    var runSequence = require('run-sequence');
    var concat = require('gulp-concat');
    var changed = require("gulp-changed");
    var gulp = require('gulp');
    var htmlmin = require('gulp-htmlmin');
    var less = require('gulp-less');
    var minifyCSS = require('gulp-minify-css');
    var open = require("gulp-open");
    var rename = require("gulp-rename");
    var sourcemaps = require('gulp-sourcemaps');
    var streamify = require('gulp-streamify'); // wrap old gulp plugins to use streams: https://github.com/nfroidure/gulp-streamify
    var uglify = require('gulp-uglify');
    var webserver = require('gulp-webserver');


    var pkg = require('./package.json');
    var path = {
        src: './src/',
        build: './build/'
    };


    /**
     Clean
     */
        // build
    gulp.task('clean-build', function(cb) {
        del(['build/**/*.*'], cb);
    });


    /**
     Build
     */
    gulp.task('build', function(cb) {
        runSequence(
            'clean-build',
            [
                'build-fonts',
                'build-html',
                'build-img',
                'build-js',
                'build-less'
            ],
            cb
        );
    });

    gulp.task('build-fonts', function() {
        return gulp.src('src/fonts/*.*')
            .pipe(changed('build/fonts'))
            .pipe(gulp.dest('build/fonts'));
    });

    gulp.task('build-html', function() {
        return gulp.src('src/index.html')
            .pipe(angularHTMLify())
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('build'));
    });

    gulp.task('build-img', function() {
        return gulp.src('src/img/*.*')
            .pipe(changed('build/img'))
            .pipe(gulp.dest('build/img'));
    });

    gulp.task('build-js', function() {
        return gulp.src([
            'bower_components/angular-elastic/elastic.js',
            'src/js/vendor/*.js',
            'src/js/app.js',
            'src/js/controllers.js',
            'src/js/directives.js'
        ])
            .pipe(sourcemaps.init())
            .pipe(concat('ua_homework.min.js'))
            .pipe(sourcemaps.write())
            .pipe(streamify(uglify()))
            .pipe(gulp.dest('build/js'));
    });

    gulp.task('build-less', function() {
        return gulp.src('src/css/ua_framework.less')
            .pipe(rename("ua_framework.min.css"))
            .pipe(less())
            .pipe(autoprefixer())
            .pipe(minifyCSS({ keepSpecialComments: 0 }))
            .pipe(gulp.dest('build/css'));
    });


    /**
     Serve
     */
    gulp.task('serve', function() {
        gulp.src('build')
            .pipe(webserver({
                root: ['.'],
                livereload: true,
                fallback: 'index.html'
            }));
    });


    /**
     Open
     */
    gulp.task('open', function() {
        return gulp.src(pkg.main)
            .pipe(open("", { url: 'http://localhost:8000' }));
    });


    /**
     Watch
     */
    gulp.task('watch', function(cb) {
        runSequence(
            [
                'watch-fonts',
                'watch-html',
                'watch-img',
                'watch-js',
                'watch-less'
            ],
            cb
        );
    });

    gulp.task('watch-fonts', function() {
        return gulp.watch([ 'src/fonts/**/*.*'], ['build-fonts']);
    });

    gulp.task('watch-html', function() {
        return gulp.watch([ 'src/index.html'], ['build-html']);
    });

    gulp.task('watch-img', function() {
        return gulp.watch([ 'src/img/**/*.*'], ['build-img']);
    });

    gulp.task('watch-js', function() {
        return gulp.watch(['src/js/**/*.*'], ['build-js']);
    });

    gulp.task('watch-less', function() {
        return gulp.watch(['src/css/**/*.*'], ['build-less']);
    });


    /**
     Default
     */
    gulp.task('default', function(cb) {
        runSequence(
            'build',
            'serve',
            'watch',
            'open',
            cb
        );
    });

    gulp.task('heroku:production', ['build']);

}());
