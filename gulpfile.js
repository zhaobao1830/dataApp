var gulp = require('gulp'),  
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    babel = require("gulp-babel"),
    uglify = require('gulp-uglify'),
    es2015 = require('babel-preset-es2015'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    reload = browserSync.reload,
    notify = require('gulp-notify');


/*
gulp.task('task-name', function() {
    console.log('Hello, Gulp!'); 
});

gulp.task('styles', function() {
	return gulp.src('css/*.sass')
		.pipe(sass({ style: 'expanded' }))
		//.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    	.pipe(gulp.dest('./dist/assets/css'))/*
    	.pipe(rename({suffix: '.min'}))
	    .pipe(minifycss())
	    .pipe(gulp.dest('dist/assets/css'))
	    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('default', ['task-name','styles']);

*/
//检查js文件
gulp.task('jshint',function(){
	gulp.src('./js/ES6test.js')
	.pipe(jshint())
	.pipe(jshint.reporter(jshintStylish));
});





//编译ES6的js文件
gulp.task('jsfile',function(){
    return gulp.src('./js/ES6test.js')
    .pipe( babel({presets:[es2015]}) )
    .pipe( uglify() )//代码压缩
    .pipe( gulp.dest( './dist/js' ) );
});

//编译scss文件
gulp.task('sassfile',function(){
    console.log('sassfile success')
    return gulp.src('./css/*.scss')
	.pipe(sass({ style: 'expanded' }))
    .pipe( gulp.dest( './dist/css' ) )
    .pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
    .pipe( gulp.dest( './dist/css' ) )
    .pipe(notify({ message: 'Styles task complete' }));;
});

//压缩图片
gulp.task('compress-images',function(){
	gulp.src('pre-images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('post-images'))
});

//开启服务器
gulp.task('server',['compress-images'],function(){
	browserSync({
		files:'**',
		server:{
			baseDir:"./"
		}
	});
	gulp.watch("css/*.scss",['sassfile']);
	//gulp.watch("js/*.js",['jsfile']);
	gulp.watch("./*.html").on("change",reload);
});
gulp.task('default',['server'], function(){
console.log('gulp success')
});


