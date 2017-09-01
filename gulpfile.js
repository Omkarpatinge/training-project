'use strict';
/*
gulp file for 
1. Compling es6 with babel
2. Converting scss to css using sass 
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  })
})
gulp.task('babel', function () {
 // console.log("babel");
  return gulp.src('es6/*.js')
    .pipe(babel({
        presets: ['env']
    })).on('error',console.error.bind(console))
    .pipe(gulp.dest('script'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('sass', function () {
  return gulp.src(['scss/*.scss','scss/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
}); 	
gulp.task('watch',['browserSync','sass','babel'], function () {
  gulp.watch(['scss/*.scss','scss/**/*.scss'], ['sass']);
  gulp.watch(['es6/*.js','es6/**/*.js'], ['babel']);
});

gulp.task('default',['sass','babel','watch']);