
var gulp = require('gulp');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
let uglify = require('gulp-uglify-es').default;
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
  ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2018 - SkiCycleRun' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> repository <%= pkg.repository.url %>\n',
  ' */\n',
  ''
].join('');

// Minify compiled CSS
gulp.task('sass', function(done) {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    //.pipe(changed('../css'))
    //.pipe(changed('./scss/*.scss'))
    .pipe(gulp.dest('../css'));

  done();

});
// gulp.task('sass', function() {
//   return gulp.src(['scss/skicyclerun.scss', './scss/alpha.scss'])
//     .pipe(sass().on('error', sass.logError))
//     .pipe(header(banner, {
//       pkg: pkg
//     }))
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(changed('../css'))
//     .pipe(gulp.dest('../css'));
// });

// Minify custom JS
gulp.task('minify-js', function(done) {
  return gulp.src(['js/skicyclerun.js', 'js/alpha.js', 'js/alphamap.js', 'js/skicyclerunmap.js'])
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    //.pipe(changed('../js'))
    .pipe(gulp.dest('../js'))

  done();

});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function(done) {

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(changed('../vendor/jquery'))
    .pipe(gulp.dest('../vendor/jquery'))

  gulp.src(['node_modules/tether/dist/js/*.js'])
    .pipe(changed('../vendor/tether'))
    .pipe(gulp.dest('../vendor/tether'))

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(changed('../vendor/jquery-easing'))
    .pipe(gulp.dest('../vendor/jquery-easing'))

  gulp.src(['node_modules/normalize.css/*.css'])
    .pipe(changed('../vendor/normalize.css'))
    .pipe(gulp.dest('../vendor/normalize.css'))

  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(changed('../vendor/font-awesome'))
    .pipe(gulp.dest('../vendor/font-awesome'))

  // scrollmagic min js files
  gulp.src(['node_modules/scrollmagic/scrollmagic/minified/**/*'])
    .pipe(changed('../vendor/scrollmagic'))
    .pipe(gulp.dest('../vendor/scrollmagic'))

  // GSAP (greensocks) min js files
  gulp.src(['node_modules/gsap/src/minified/**/*'])
    .pipe(changed('../vendor/gsap'))
    .pipe(gulp.dest('../vendor/gsap'))

  // masonry-layout for photo GRID CSS
  gulp.src(['node_modules/masonry-layout/dist/masonry.pkgd.min.js'])
    .pipe(changed('../vendor/masonry'))
    .pipe(gulp.dest('../vendor/masonry'))


  done();

})

// Default Task
gulp.task('default', gulp.series(['sass', 'minify-js', 'copy'], function(done) {
  // do more stuff
  done();
}));
