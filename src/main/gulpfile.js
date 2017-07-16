// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');//安装    cnpm install jshint gulp-jshint --save-dev
var ngAnnotate = require('gulp-ng-annotate');//安装   cnpm install gulp-ng-annotate --save-dev
var concat = require('gulp-concat');//安装    cnpm install gulp-concat --save-dev
var uglify = require('gulp-uglify');//安装    cnpm install gulp-uglify --save-dev
var rename = require('gulp-rename');//安装    cnpm install gulp-rename --save-dev
var minifyCss = require('gulp-minify-css');//安装     cnpm install gulp-minify-css --save-dev



gulp.task('lint', function() {
    gulp.src([
        './webapp/risk/js/controller/**/*.js',
        './webapp/risk/js/controller/**/*.js'

    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});




//合并，压缩平台登录css文件
gulp.task('login_css', function() {
    gulp.src([				//需要操作的文件
        './webapp/common/css/default_login.css',//登录整体全局css
        './webapp/common/css/login.css' ,//登录css
        './webapp/common/css/gotoSystem.css', //选择系统css
        './webapp/common/css/sweetalert.css' //弹出框
    ])
        .pipe(concat('all.min.css')) //合并成一个文件
        .pipe(minifyCss())			//压缩css成一行
        .pipe(gulp.dest('./webapp/common/dist'));   //输出文件夹
});


//合并，压缩平台的js文件
gulp.task('risk_scripts', function() {
    gulp.src([
        './webapp/risk/js/config/app.js', //加载APP模块
        './webapp/risk/js/config/route*.js', //加载route模块
    ])
        .pipe(ngAnnotate())
        .pipe(uglify())//压缩
        .pipe(concat('all.min.js'))
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
        }))
        .pipe(gulp.dest('./webapp/risk/dist'));
});
//合并，压缩平台的controller文件
gulp.task('risk_controllers', function() {
    gulp.src([
        './webapp/risk/js/controller/**/*.js', //加载angular模块
    ])
        .pipe(ngAnnotate())
        .pipe(uglify())//压缩
        .pipe(concat('controller.min.js'))
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
        }))
        .pipe(gulp.dest('./webapp/risk/dist'));
});
//合并，压缩平台的service文件
gulp.task('risk_services', function() {
    gulp.src([
        './webapp/risk/js/service/*.js', //加载angular模块
    ])
        .pipe(ngAnnotate())
        .pipe(uglify())//压缩
        .pipe(concat('service.min.js'))
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
        }))
        .pipe(gulp.dest('./webapp/risk/dist'));
});

//合并，压缩平台的service文件
gulp.task('risk_directive', function() {
    gulp.src([
        './webapp/risk/js/directive/*.js', //加载angular模块
    ])
        .pipe(ngAnnotate())
        .pipe(uglify())//压缩
        .pipe(concat('directive.min.js'))
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
        }))
        .pipe(gulp.dest('./webapp/risk/dist'));
});



// 默认任务
gulp.task('default', function(){
    gulp.run('lint','login_css','risk_scripts','risk_services','risk_directive','risk_controllers');

    //考勤系统平台登录css
    gulp.watch('./webapp/common/css/*.css',function () {
        gulp.run('login_css');
    });

    //监听all.min.js的变动
    gulp.watch('./webapp/risk/js/**/*.js', function(){
        gulp.run('risk_scripts');
    });

    //监听service的变动
    gulp.watch('./webapp/risk/js/service/*.js', function(){
        gulp.run('risk_services');
    });

    //监听service的变动
    gulp.watch('./webapp/risk/js/directive/*.js', function(){
        gulp.run('risk_directive');
    });

    //监听controller的变动
    gulp.watch('./webapp/risk/js/controller/**/*.js', function(){
        gulp.run('risk_controllers');
    });


});