'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('connect');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

var watching = false;

// Handle SIGTERM for PID 1
process.on('SIGTERM', function() {
  process.exit();
});

// Tasks
gulp.task('default', ['watch', 'serve']);

gulp.task('watch', ['build'], function() {
  watching = true;

  gulp.watch(['src/index.html'], ['index']);
  gulp.watch(['src/content/**/*'], ['assets']);
  gulp.watch(['src/app/**/*.html'], ['templates']);
  gulp.watch(['src/app/**/*.sass', 'src/app/**/*.scss'], ['styles']);
  gulp.watch(['src/app/**/*.js'], ['scripts']);
});

gulp.task('build', function(cb) {
  runSequence('clean', 'assets', 'styles', 'scripts', 'templates', 'index', cb);
});

gulp.task('clean', function() {
  var del = require('del');

  return del(['www/app', 'www/content']);
});

gulp.task('assets', function() {
  return gulp.src('src/content/**/*')
    .pipe(gulp.dest('www/content'));
});

gulp.task('index', function() {
  var inject = require('gulp-inject');

  return gulp.src('src/index.html')
    .pipe(inject(gulp.src(['www/app/**/*.js', 'www/app/**/*.css'], {read: false}), {
      ignorePath: ['www'],
      addRootSlash: false
    }))
    .pipe(gulp.dest('www'));
});

gulp.task('styles', function() {
  var sass = require('gulp-sass');

  return gulp.src(['src/app/**/*.sass', 'src/app/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', onError))
    .pipe(sourcemaps.write('.', {sourceRoot: '../src/app'}))
    .pipe(gulp.dest('www/app'));
});

gulp.task('scripts', function() {
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');

  return gulp.src('src/app/**/!(*.spec).js')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write('.', {sourceRoot: '../src/app'}))
    .pipe(gulp.dest('www/app'));
});

gulp.task('templates', function() {
  var templateCache = require('gulp-angular-templatecache');

  return gulp.src('src/app/**/*.html')
    .pipe(templateCache({
      filename: 'app.tpl.js',
      module: 'maclev',
      root: 'app'
    }))
    .pipe(gulp.dest('www/app'));
});

gulp.task('serve', function() {
  var app = connect();
  var serveStatic = require('serve-static');
  var vhost = require('vhost');
  var proxy = require('proxy-middleware');
  var cors = require('cors');
  var url = require('url');
  var options = url.parse('http://proxy');

  options.preserveHost = true;

  app.use(cors());
  app.use(vhost('*.maclev.local', proxy(options)));
  app.use(serveStatic('www'));

  app.listen(3000);
});

// Helpers
function onError(e) {
  gutil.log(gutil.colors.red('Error in plugin'), '\'' + gutil.colors.cyan(e.plugin) + '\'');

  console.log('Message:');
  console.log(e.message);

  if (watching) {
    this.emit('end');
  } else {
    throw e;
  }
}
