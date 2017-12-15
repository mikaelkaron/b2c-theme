const gulp = require('gulp');
const del = require('del');
const metalsmith = require('gulp-metalsmith');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');

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
        markdown(),
        permalinks(),
        layouts({
          engine: 'handlebars',
          partials: 'partials'
        })
      ]
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['copy', 'metalsmith']);