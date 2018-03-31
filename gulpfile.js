var gulp = require('gulp');
var connect = require('gulp-connect');
var flipper = require('gulp-css-flipper');
var scssToCss = require('gulp-sass');
var del = require('del');

gulp.task('connect', function(){
    connect.server({
        root: 'build',
        livereload: true,
        port:8080

    });
});

gulp.task('clean',function() {
    return del ('build');
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());

});

gulp.task('js', function(){
    return gulp.src('src/js/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(connect.reload());

});

gulp.task('images', function(){
    return gulp.src('src/images/*.*')
    .pipe(gulp.dest('build/images'))
    .pipe(connect.reload());

});

gulp.task('fonts', function(){
    return gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('build/fonts'))
    .pipe(connect.reload());

});

gulp.task('css',function(){
    var flip = gulp.src(['src/css/*.css']).pipe(flipper());
    return flip
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});

gulp.task('scss', function(){
    return gulp.src('src/scss/*.scss')
    .pipe(scssToCss({outputStyle: 'compressed'}))
    .pipe(gulp.dest('build/css'));

});


gulp.task('build', ['html','css','js','images','fonts', 'scss']);

gulp.task('watch',function(){
    return gulp.watch('src/**/*',['build']);
});

gulp.task('default',['build','connect','watch']);


    

