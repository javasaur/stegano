const gulp = require('gulp')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')

const tsProject = ts.createProject('tsconfig.json')

gulp.task('transpile', () => {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})

gulp.task('build', gulp.series('transpile'))

gulp.task('watch', () => {
    gulp.watch('src/**/*.ts').on('all', gulp.series('build'))
})