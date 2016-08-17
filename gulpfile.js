'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const sass = require('gulp-sass')
const concat = require('gulp-concat')

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

gulp.task('start', ['sass:watch'], () => {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development', 'DEBUG': 'http,worker' },
    watch: ['server.js', 'routes.js', 'app/*.js']
  })
})

gulp.task('build', ['font-awesome', 'sass'])

gulp.task('sass:watch', () => {
  gulp.watch('./public/sass/*.scss', ['sass'])
})
