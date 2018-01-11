var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-clean-css');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');

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

gulp.task('regscripts', function(){
  return gulp.src('nmjs/registration/*.js')
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('appscripts', function(){
  return gulp.src('nmjs/app/*.js')
    .pipe(concat('app.js'))
    .pipe(babel({presets: ['env']}))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('build', function(){
  return gulp.src('js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("nmcss/*.css", ['styles']);
  gulp.watch("nmjs/registration/*.js", ['regscripts']);
  gulp.watch("nmjs/app/*.js", ['appscripts']);
  gulp.watch("*.html", ['bs-reload']);
});