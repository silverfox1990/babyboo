var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var stylus = require('gulp-stylus');

gulp.task('jade', function () {
  gulp.src('./jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/'))
});

gulp.task('vendor-css', function () {
  return gulp.src(
    ['./node_modules/bootstrap/dist/css/bootstrap.css'])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'))
});

gulp.task('sass', function () {
  return gulp.src('./sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('stylus', function () {
  return gulp.src('./styl/main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('js', function () {
  return gulp.src(
    ['./node_modules/jquery/dist/jquery.js',
      './node_modules/bootstrap/dist/js/bootstrap.js',
      './node_modules/bootstrap-3-typeahead/bootstrap3-typeahead.js',
      './node_modules/select2/dist/js/select2.js',
      './javascript/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./build/js/'))
});

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
});

//assets static files (imgs, fonts)
gulp.task('assets',['vendor-css'], function(){
  return gulp.src(
    ['./assets/**/*'])
    .pipe(gulp.dest('./build/'))
})

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

  browserSync.init({
    server: "./build"
  });

  //gulp.watch('./sass/**/*.sass', ['sass']);
  gulp.watch('./styl/**/*.styl', ['stylus']);
  gulp.watch('./jade/**/*.jade', ['jade']);
  gulp.watch('./javascript/**/*.js', ['js']);
  gulp.watch("build/**/*.*").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src('./sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());

});


gulp.task('default', ['assets', 'jade', 'stylus', 'js']);
