var gulp = require('gulp'),
	connect = require('gulp-connect'),
  minifyCss = require('gulp-minify-css');


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

gulp.task('compress', function() {
  return gulp.src('public/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('minify_css', function () {
  
});

gulp.task('default', ['connect', 'watch']);
gulp.task('uglify', ['compress', 'minify_css']);