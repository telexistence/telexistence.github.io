var gulp = require("gulp");
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var bower = require('gulp-bower');

gulp.task('bower', function() {
    return bower({ directory: 'src/bower_components' });
});

gulp.task('usemin', function() {
    return gulp.src('src/index.html')
        .pipe(usemin({
            js: [ uglify(), rev() ],
            inlinejs: [ uglify() ]
        }))
        .pipe(gulp.dest('./'));
});
