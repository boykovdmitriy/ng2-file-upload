const webpack                  = require("webpack"),
      path                     = require("path"),
      ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");
const ExtractTextPlugin        = require("extract-text-webpack-plugin");
const CleanWebpackPlugin       = require('clean-webpack-plugin');

module.exports = {
    devtool  : "source-map",
    entry    : {
        "app"   : "./app/boot.ts",
        "vendor": [
            'core-js',
            'zone.js/dist/zone',
            'zone.js/dist/long-stack-trace-zone',
            "@angular/common",
            "@angular/compiler",
            "@angular/core",
            "@angular/forms",
            "@angular/router",
            '@angular/platform-browser-dynamic',
            '@angular/platform-browser',
            "rxjs"
        ],
        "styles": [
            "./app/sharedStyles/index.css"
        ]
    },
    output   : {
        filename: "[name].js",
        path    : path.resolve(__dirname, './public')
    },
    resolve  : {
        extensions: [".js", ".ts", ".css", 'html']
    },
    module   : {
        loaders: [
            {
                test   : /\.ts/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader?keepUrl=true'],
            },
            {
                /*for styles and templates included in app*/
                test   : /\.(html|css)$/,
                loader : 'file-loader',
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    path.resolve(__dirname, "app/sharedStyles")
                ]
            }, {
                test   : /\.css$/,
                loader : ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use     : "css-loader"
                }),
                include: [
                    path.resolve(__dirname, "app/sharedStyles")
                ]
            }, {
                test  : /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins  : [
        /*clean build path*/
        new CleanWebpackPlugin('public', {
            exclude: ['index.html']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name     : 'vendor',
            filename : 'vendor.js',
            minChunks: 2
        }), new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, '../src')
        ),
        /*extract styles from style.js*/
        new ExtractTextPlugin("styles.css")
    ],
    devServer: {
        contentBase       : path.join(__dirname, "public"),
        historyApiFallback: true,
        compress          : true,
        quiet             : false,
        headers           : {"X-Custom-Header": "yes"},
        stats             : {colors: true},
        port              : 5000,
        inline            : true
    }
};