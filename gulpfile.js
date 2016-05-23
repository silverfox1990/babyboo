var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('jade', function() {
  gulp.src('./jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/'))
});



gulp.task('sass', function () {
  return gulp.src('./sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});



// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "./build"
  });

  gulp.watch('./sass/**/*.sass', ['sass']);
  gulp.watch('./jade/**/*.jade', ['jade']);
  gulp.watch("build/**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('./sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());

});





gulp.task('default', ['jade','sass']);