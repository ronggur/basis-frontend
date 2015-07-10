var gulp   = require('gulp'), 
swig       = require('gulp-swig'),
notify     = require("gulp-notify"),
concat     = require("gulp-concat"),
uglify     = require("gulp-uglify"),
sass       = require("gulp-sass"),
sourcemaps = require('gulp-sourcemaps'),
minifyCss  = require('gulp-minify-css'),
rename     = require('gulp-rename'),
prettify   = require('gulp-prettify'),
foreach    = require('gulp-foreach');

var dist = '../dist';

var distPaths = {
	'assets' : dist+'/assets'
};

var moveJs = [
	'bower_components/modernizr/modernizr.js',
	'bower_components/jquery/dist/jquery.min.js',
];

var moveVendorJs = [
	'bower_components/html5shiv/**/*.*',
];

var moveCss = [
	'bower_components/animate.css/animate.min.css'
];


/* libs css */

gulp.task('css-libs', function() {
 	gulp.src(moveCss)
 		.pipe(sourcemaps.init({loadMaps: true}))
 		.pipe( concat('libs.css') )
 		.pipe( sourcemaps.write('maps') )
 		.pipe( gulp.dest(distPaths.assets+'/css') )
 		.pipe(notify({message: 'libs.css created', onLast: true}));
});

/* libs js */

gulp.task('scripts-libs', function() {
 	gulp.src(moveJs)
 		.pipe(sourcemaps.init({loadMaps: true}))
 		.pipe( concat('libs.js') )
 		.pipe( sourcemaps.write('maps') )
 		.pipe( gulp.dest(distPaths.assets+'/js') )
 		.pipe(notify({message: 'libs.js created', onLast: true}));
});

/* move vendor */

gulp.task('scripts-vendor', function() {
 	gulp.src(moveVendorJs, { base: './bower_components' })
 		.pipe( gulp.dest(distPaths.assets+'/js/vendor') )
 		.pipe(notify({message: 'vendor moved', onLast: true}));
});

/* app js */

gulp.task('scripts-main', function() {
 	gulp.src('assets/js/app.js')
 		.pipe(sourcemaps.init({loadMaps: true}))
 		.pipe( sourcemaps.write('maps') )
 		.pipe( gulp.dest(distPaths.assets+'/js') )
 		.pipe(notify({message: 'app.js created', onLast: true}));
});

/* html */

gulp.task('html', function() {
 	gulp.src('templates/*.html')
 		.pipe(swig({ defaults: { cache: false } }))
 		.pipe(prettify({indent_size: 4}))
 		.pipe( gulp.dest(dist) )
 		.pipe(notify({message: 'html moved', onLast: true}));
});

/* scss */

gulp.task('sass', function () {
  gulp.src('assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe( minifyCss() )
    .pipe(gulp.dest(dist+'/assets/css'))
    .pipe(notify({message: 'app.css create', onLast: true}));
});

/* image min */

gulp.task('images', function() {
 	gulp.src('assets/images/**/*')
 		.pipe( gulp.dest(dist+'/assets/images') )
 		.pipe(notify({message: 'images moved', onLast: true}));
});

/* move fonts */

gulp.task('fonts', function() {
 	gulp.src('assets/fonts/**/*')
 		.pipe( gulp.dest(dist+'/assets/fonts') )
 		.pipe(notify({message: 'fonts moved', onLast: true}));
});

/* default task */

/* watch */
gulp.task('watch', function() {
	gulp.watch('assets/js/app.js', ['scripts-main']);
	gulp.watch('assets/scss/**/*.scss', ['sass']);
	gulp.watch('assets/images/**/*', ['images']);
	gulp.watch('assets/fonts/**/*', ['fonts']);
	gulp.watch('templates/**/*.html', ['html']);
});

gulp.task('default', ['scripts-libs','css-libs','scripts-main','sass','html','images','fonts','watch']);