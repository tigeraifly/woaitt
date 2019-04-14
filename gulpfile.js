const gulp = require('gulp');
const gulpuglify = require('gulp-uglify')
const server = require('gulp-webserver')
gulp.task('script', () => {
    gulp.src(['./src/js/*.js'])
        .pipe(gulpuglify())
        .pipe(gulp.dest('build/js'))
})
gulp.task('webserver', () => {
    gulp.src('.')
        .pipe(server({
            port: 8686,
            open: true,
            livereload: true,
            middleware: (req, res) => {
                if (req.url == '/api') {
                    const result = JSON.stringify([1, 2, 3, 4, 5])
                    res.end(result)
                } else {
                    res.end(JSON.stringify([7, 8, 9]))
                }
            }

        }))

})
gulp.task('default', ['webserver', 'script'], () => {
    gulp.watch('./js/*.js', ['js'])
})