var gulp = require( 'gulp' ),
  plumber = require( 'gulp-plumber' ),
  watch = require( 'gulp-watch' ),
  livereload = require( 'gulp-livereload' ),
  cssnano = require( 'gulp-cssnano' ),
  jshint = require( 'gulp-jshint' ),
  stylish = require( 'jshint-stylish' ),
  uglify = require( 'gulp-uglify' ),
  rename = require( 'gulp-rename' ),
  notify = require( 'gulp-notify' ),
  concat = require('gulp-concat'),
  include = require( 'gulp-include' ),
  imagemin = require('gulp-imagemin'),
  sass = require( 'gulp-sass' ),
  gulpFilter = require('gulp-filter'),
  mainBowerFiles = require('gulp-main-bower-files');

// Include plugins
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
  replaceString: /\bgulp[\-.]/
});


var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var DEST_JS  = './includes/js/';
var DEST_CSS = './includes/css/';
var DEST_SASS = './includes/scss/custom.scss';
var DEST_IMG = './includes/img/';
var DEST_FONTS = './includes/fonts/';

// Static server
gulp.task('serve', function() {
    browserSync.init({
        proxy: "http://localhost:8888/siteurl",

      notify: false
    });
});

var onError = function( err ) {
  console.log( 'An error occurred:', err.message );
  this.emit( 'end' );
}

gulp.task('imagemin', function() {
    return gulp.src('./images/**/**.*')
           .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
           .pipe(gulp.dest(DEST_IMG));
});

gulp.task('compress', function() {
  gulp.src('./js/**/*.js')
    .pipe(uglify())
    .pipe( rename( { suffix: '.min' } ) )
    .pipe(gulp.dest(DEST_JS));
});

gulp.task('bower-fonts', function() {

    var filterFonts = gulpFilter('**/*.{eot,svg,ttf,woff,woff2}', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(filterFonts)
        .pipe(gulp.dest(DEST_FONTS));

});

gulp.task('bower-js', function() {

    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                "normalize-scss": {
                    main: [
                    ]
                }
            }
        }))
        .pipe(filterJS)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe( rename( { suffix: '.min' } ) )
        //.pipe(filterJS.restore)
        .pipe(gulp.dest(DEST_JS));

});

gulp.task('bower-css', function() {

     var filterCSS = gulpFilter('**/*.css', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                "bootstrap-sass": {
                    main: [
                    ]
                },
                "normalize-scss": {
                    main: [
                    ]
                }
            }
        }))
        .pipe(filterCSS)
        .pipe(concat('vendor.css'))
        .pipe( cssnano() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe(gulp.dest(DEST_CSS));
        //.pipe( reload({stream:true}));

});

gulp.task( 'scss', function() {
  return gulp.src( DEST_SASS )
    .pipe( plumber( { errorHandler: onError } ) )
    .pipe( sass() )
    .pipe( gulp.dest( DEST_CSS ) )
    .pipe( cssnano() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( DEST_CSS) );

} );

gulp.task( 'watch', function() {
  livereload.listen();
  gulp.watch( './includes/scss/**/*.scss', [ 'scss' ] ).on("change", browserSync.reload);
  gulp.watch( './js/**/*.js', [ 'compress' ] ).on("change", browserSync.reload);
  gulp.watch( './**/*.php' ).on("change", browserSync.reload);
} );

gulp.task( 'default', [ 'scss', 'watch', 'serve','imagemin','compress',  'bower-js', 'bower-css'], function() {

} );
