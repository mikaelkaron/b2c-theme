const gulp = require('gulp');
const del = require('del');
const metalsmith = require('gulp-metalsmith');
const layouts = require('metalsmith-layouts');
const partials = require('metalsmith-discover-partials');
const helpers = require('metalsmith-discover-helpers');
const link = require('metalsmith-relative-links');
const ancestry = require('metalsmith-ancestry');

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', [ 'clean' ], function () {
  return gulp.src('assets/**')
    .pipe(gulp.dest('build/assets'));
});

gulp.task('metalsmith', [ 'clean' ], function() {
  return gulp.src('src/**')
    .pipe(metalsmith({
      metadata: {
        body: 'layout-page',
        nav: 'bg-white fixed-top',
        scroll: 500
      },
      use: [
        ancestry(),
        link(),
        partials({
          directory: 'partials',
          pattern: /\.html$/
        }),
        helpers({
          directory: 'helpers',
          pattern: /\.js$/
        }),
        layouts({
          engine: 'handlebars'
        })
      ]
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['copy', 'metalsmith']);