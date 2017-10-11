var gulp = require('gulp');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pump = require('pump');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2017-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/timothyhalley/<%= pkg.name %>/LICENSE)\n',
    ' */\n',
    ''
].join('');

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
    return gulp.src(['scss/grayscale.scss', 'scss/skicyclerun.scss', 'scss/alpha.scss'])
        .pipe(sass())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(changed('css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src(['css/grayscale.css', 'css/skicyclerun.css'])
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(changed('css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify custom JS
gulp.task('minify-js', function() {
    return gulp.src(['js/grayscale.js', 'js/skicyclerun.js', 'js/alpha.js'])
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(changed('js'))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// gulp.task('minify-js', function (cb) {
//   pump([
//         gulp.src('js/*.js'),
//         uglify(),
//         gulp.dest('js')
//     ],
//     cb
//   );
// });

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(changed('vendor/bootstrap'))
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(changed('vendor/jquery'))
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src(['node_modules/tether/dist/js/*.js'])
        .pipe(changed('vendor/tether'))
        .pipe(gulp.dest('vendor/tether'))

    gulp.src(['node_modules/jquery.easing/*.js'])
        .pipe(changed('vendor/jquery-easing'))
        .pipe(gulp.dest('vendor/jquery-easing'))

    gulp.src(['node_modules/normalize.css/*.css'])
        .pipe(changed('vendor/normalize.css'))
        .pipe(gulp.dest('vendor/normalize.css'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(changed('vendor/font-awesome'))
        .pipe(gulp.dest('vendor/font-awesome'))

    // scrollmagic min js files
    gulp.src(['node_modules/scrollmagic/scrollmagic/minified/**/*'])
        .pipe(changed('vendor/scrollmagic'))
        .pipe(gulp.dest('vendor/scrollmagic'))

    // GSAP (greensocks) min js files
    gulp.src(['node_modules/gsap/src/minified/**/*'])
        .pipe(changed('vendor/gsap'))
        .pipe(gulp.dest('vendor/gsap'))

})

// Default task
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'minify-css', 'minify-js'], function() {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
