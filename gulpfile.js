var gulp = require('gulp');
var config = require('./conf/gulp.config.json');
var webpackConfig = require("./conf/webpack.config.js");

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gutil = require("gulp-util");

var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var cssmin = require('gulp-clean-css');
var html2js = require('gulp-ng-html2js');

var webpack = require("webpack");
var webpackStream = require("webpack-stream");
var WebpackDevServer = require("webpack-dev-server");





function errHandler() {
    this.emit("end");
}

function errHandlerWithLog(err) {
    console.log(err.toString());
    this.emit("end");
}

gulp.task("index", function () {
    gulp.src(config.app.index, {
        base : "src"
    }).pipe(gulp.dest('dist'));
});

gulp.task("images", function () {
    gulp.src(config.app.images, {
        base : "src"
    }).pipe(gulp.dest('dist'));
});

gulp.task("font", function () {
    gulp.src(config.app.font, {
        base : "src"
    }).pipe(gulp.dest('dist'));
});

gulp.task("libraries", function () {
    gulp.src(config.app.libraries, {
        base : "src"
    }).pipe(gulp.dest('dist'));
});

gulp.task("styles", function () {
    gulp.src(config.app.styles)
        .pipe(sass.sync())
        .on("error", errHandlerWithLog)
        .pipe(cssmin())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest('dist'));
});

gulp.task("templates", function () {
    gulp.src(config.app.templates)
        .pipe(htmlmin({
            collapseWhitespace : true,
            minifyCSS : true,
            minifyJS : true
        }))
        .pipe(html2js({
            moduleName: "templates-html"
        }))
        .on("error", errHandlerWithLog)
        .pipe(concat("templates.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

gulp.task("pack", function () {
    gulp.src(config.app.js)
        .pipe(webpackStream(webpackConfig))
        .on("error", errHandler)
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest('dist'));
});

gulp.task("build", ["styles", "templates", "pack"]);

gulp.task("default", ["index", "images", "font", "libraries", "build"]);

gulp.task("watch", ["default"], function () {
    gulp.watch(config.app.js, ["pack"]);
    gulp.watch(config.app.templates, ["templates"]);
    gulp.watch(config.app.styles, ["styles"]);
    gulp.watch(config.app.images, ["images"]);
    gulp.watch(config.app.index, ["index"]);
    gulp.watch(config.app.libraries, ["libraries"]);
});


/** Webpack Dev Server **/
gulp.task("serve", ["build", "watch"], function() {
    // modify some webpack config options
    var options = Object.create(webpackConfig);
    
    options.devtool = "eval";
    options.debug = true;

    gutil.log("Starting [webpack-dev-server]...");

    // Start a webpack-dev-server
    return new WebpackDevServer(webpack(options), {
        contentBase: "./dist",
        stats: {
            hash: false,
            version: false,
            colors: true,
            chunks: false
        }
    }).listen(8080, "localhost", function(err) {
        if (err) {
            throw new gutil.PluginError("webpack-dev-server", err);
        }
        gutil.log("[webpack-dev-server]", "Server is Running on http://localhost:8090/webpack-dev-server/index.html");
    });
});