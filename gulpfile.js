var gulp = require('gulp'),
	connect = require('gulp-connect'),
  //uglify = require('gulp-uglify'),
  //obfuscate = require('gulp-obfuscate'),
  //minifyCss = require('gulp-minify-css'),
  //sourcemaps = require('gulp-sourcemaps'),
  //imagemin = require('gulp-imagemin'),
  //pngquant = require('imagemin-pngquant')
  ;


gulp.task('html', function () {
  gulp.src('./public/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./public/css/*.css')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./public/js/**/*.js')
    .pipe(connect.reload());
});


gulp.task('watch', function () {
  gulp.watch(['./public/*.html'], ['html']);
  gulp.watch(['./public/css/*.css'], ['css']);
  gulp.watch(['./public/js/**/*.js'], ['js']);
});

gulp.task('connect', function () {
	connect.server({
		port: 1337,
		livereload: true,
		root: './public'
	});
});

//gulp.task('compress', function() {
//  return gulp.src('public/js/**/*.js')
//    .pipe(obfuscate())
//    .pipe(uglify({
//      mangle:false
//    }))
//    .pipe(gulp.dest('dist/js'));
//});
//
//
//
//gulp.task('minify-css', function () {
//  return gulp.src('public/css/*.css')
//    .pipe(sourcemaps.init())
//    .pipe(minifyCss())
//    .pipe(sourcemaps.write())
//    .pipe(gulp.dest('dist/css'));
//});
//
//
//gulp.task('imagemin', function () {
//    return gulp.src('public/img/*')
//        .pipe(imagemin({
//            progressive: true,
//            svgoPlugins: [{removeViewBox: false}],
//            use: [pngquant()]
//        }))
//        .pipe(gulp.dest('dist/img'));
//});
//
//gulp.task('minify-html', function() {
//  var opts = {
//    conditionals: true,
//    spare: true
//  };
// 
//  return gulp.src('public/templates/*.html')
//    .pipe(minifyHTML(opts))
//    .pipe(gulp.dest('public/dist/templates'));
//});

gulp.task('default', ['connect', 'watch']);
// gulp.task('uglify', ['compress', 'minify-css', 'imagemin'/*, 'minify-html'*/]);