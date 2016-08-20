'use strict'

const gulp = require('gulp')

const nodemon = require('gulp-nodemon')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const eslint = require('gulp-eslint')

const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

const browserify = require('browserify')
const watchify = require('watchify')
const babelify = require('babelify')

gulp.task('fonts', () => {
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./public/fonts'))
})

gulp.task('font-awesome', ['fonts'], () => {
  return gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('./public/css'))
})

gulp.task('sass', () => {
  return gulp.src('./public/sass/*.scss')
    .pipe(concat('./public/css/app.css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./'))
})

function bundleJs (bundler) {
  return bundler
    .bundle()
    .on('error', function (err) {
      console.error(err)
      this.emit('end')
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public/js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
      // capture sourcemaps from transforms
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
}

gulp.task('start', ['sass:watch', 'js:watchify'], () => {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development', 'DEBUG': 'http,worker' },
    watch: ['server.js', 'routes.js', 'app'],
    ignore: ['app/views/*.jsx', 'app/react/*.js']
  })
})

gulp.task('build', ['font-awesome', 'sass'], () => {
  var bundler = browserify('./app/react/main.js', { debug: false })
    .transform(babelify, { presets: ['es2015', 'react'] })
  bundleJs(bundler)
})

gulp.task('sass:watch', () => {
  gulp.watch('./public/sass/*.scss', ['sass'])
})

gulp.task('js:watchify', function () {
  var bundler = watchify(browserify('./app/react/main.js', { debug: true }))
    .transform(babelify, { presets: ['es2015', 'react'] })
  bundleJs(bundler)
  bundler.on('update', () => bundleJs(bundler))
})

gulp.task('lint', () => {
  return gulp.src(['*.js', '**/*.js', '**/*.jsx', '!node_modules/**', '!public/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
