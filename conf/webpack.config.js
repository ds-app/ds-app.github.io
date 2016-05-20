var config = require("./gulp.config.json");
var tool = require("./tool.js");


var webpackConfig = {
    entry: tool.globs(config.app.js),
    output: {
        filename: 'app.js'
    },
    resolve: {
        alias: {
            app: tool.base("app.js")
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'ng-annotate'
            }
        ]
    }
};

module.exports = webpackConfig;