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
       baseDir: "./public"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('styles', function(){
  gulp.src(['./public/nmcss/*.css'])
    .pipe(autoprefixer('last 2 versions'))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('appstyles', function(){
  gulp.src(['./public/nmcss/app/*.css'])
    .pipe(autoprefixer('last 2 versions'))
    .pipe(concat('app.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('regscripts', function(){
  return gulp.src('./public/nmjs/registration/*.js')
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('appscripts', function(){
  return gulp.src('./public/nmjs/app/*.js')
    .pipe(concat('app.js'))
    .pipe(babel({presets: ['env']}))
    .pipe(gulp.dest('./public/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('build', function(){
  return gulp.src('./public/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("./public/nmcss/*.css", ['styles']);
  gulp.watch("./public/nmcss/app/*.css", ['appstyles']);
  gulp.watch("./public/nmjs/registration/*.js", ['regscripts']);
  gulp.watch("./public/nmjs/app/*.js", ['appscripts']);
  gulp.watch("./public/*.html", ['bs-reload']);
});