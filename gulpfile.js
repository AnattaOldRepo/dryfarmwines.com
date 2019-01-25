const gulp = require('gulp'),
  babel = require('gulp-babel'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify')

gulp.task('vue-account-portal', function() {
  return gulp
    .src(['src/vue-account-portal/dist/vue-account-portal.js'])
    .pipe(sourcemaps.init())
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('assets'))
})

gulp.task('watch', function() {
  gulp.watch(
    'src/vue-account-portal/dist/vue-account-portal.js',
    gulp.series('vue-account-portal')
  )
})
