//Konfiguracja Webpack

const path = require("path");
module.exports = {
    entry: "./js/workshops.jsx",
    output: {
        path: path.resolve("js"),
        filename: "out.js"
    },
    devServer: {
        inline: true,
        contentBase: './',
        port: 3001
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.jsx$/, exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-2', 'react']
            }
        }]
    }
}


const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: { // you can use __dirname or fs module to create path
        'out.js': './src/app.js',
        'style.css~': './src/app.scss', //temporary file
    },
    output: {
        filename: '[name]',
    },
    watch: true,
    devtool: 'inline-source-map', // more info: https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
    module: {
        loaders: [
            {
                test: /\.js$/, // searching .js files
                exclude: /node_modules/, // don't search in node_modules
                loader: 'babel-loader', // loader name
                query: {
                    presets: ['es2015'] // set source type
                }
            },
        ],

        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('./style.css'),
    ]
}