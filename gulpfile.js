const gulp = require('gulp');
const del = require('del');
const each = require('async').each;
const metalsmith = require('gulp-metalsmith');
const layouts = require('metalsmith-layouts');
const partials = require('metalsmith-discover-partials');
const helpers = require('metalsmith-discover-helpers');
const link = require('metalsmith-relative-links');
const ancestry = require('metalsmith-ancestry');
const re = /([\"\'])\^(.+?)\1/g;

gulp.task('clean', () => {
  return del('build');
});

gulp.task('copy', ['clean'], () => {
  return gulp.src('assets/**')
    .pipe(gulp.dest('build/assets'));
});

gulp.task('metalsmith', ['clean'], () => {
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
        }),
        (files, ms, done) => {
          each(Object.keys(files), (name, cb) => {
            const file = files[name];
            file.contents = new Buffer(file.contents.toString().replace(re, (match, separator, path) => {
              return separator + file.link.to(path) + separator;
            }));
            cb();
          }, done);
        }
      ]
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['copy', 'metalsmith']);