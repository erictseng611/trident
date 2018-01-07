var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-clean-css');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('styles', function(){
  gulp.src(['nmcss/*.css'])
    .pipe(autoprefixer('last 2 versions'))
    .pipe(minifycss())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('nmjs/*.js')
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("nmcss/*.css", ['styles']);
  gulp.watch("nmjs/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});