var path = require("path");
var util = require("util");
var glob = require("glob");
var gutil = require("gulp-util");
var config = require("./gulp.config.json");
var __root = path.join(__dirname, '..');

var slice = Array.prototype.slice;

function _join(b, args) {
    return path.join.apply(path, b.concat(args));
}

function join() {
    var args = slice.call(arguments);
    return _join([__root], args);
}

function base(dir) {
    var args = slice.call(arguments);
    return _join([__root, "src/app"], args);
}

function globs(dirs) {

    if (!util.isArray(dirs)) {
        dirs = [dirs];
    }

    return dirs.map(function (dir) {
        return glob.sync(join(dir));
    }).reduce(function (l, r) {
        return l.concat(r);
    });
}

function log(template, opt) {
    opt.file = opt.file || "";
    gutil.log(gutil.template(template, opt));
}

module.exports = {
    join : join,
    base : base,
    log : log,
    globs : globs
};