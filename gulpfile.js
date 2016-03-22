var gulp = require("gulp");
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var bower = require('gulp-bower');
var runSequence = require('run-sequence');

gulp.task('default', function(callback){
    return runSequence(
        'bower', 'usemin', callback);
});

gulp.task('bower', function() {
    return bower({ directory: 'src/bower_components' });
});

gulp.task('usemin', function() {
    return gulp.src('src/*.html')
        .pipe(usemin({
            js: [ uglify(), rev() ],
            js_pepper: [ uglify(), rev() ],
            js_pepper_robot: [ uglify(), rev() ],
            js_conf: [ uglify(), rev() ],
            js_mute: [ uglify(), rev() ],
            js_vp8: [ uglify(), rev() ],
            js_vp9: [ uglify(), rev() ],
            js_theta: [ uglify(), rev() ],
            js_theta_src: [ uglify(), rev() ],
            js_keybind: [ uglify(), rev() ],
            js_keybinds: [ uglify(), rev() ],
            asics_client: [ uglify(), rev() ],
            asics_client_auto: [ uglify(), rev() ],
            asics_theta: [ uglify(), rev() ],
            asics_theta_auto: [ uglify(), rev() ],
            inlinejs: [ uglify() ]
        }))
        .pipe(gulp.dest('./'));
});
