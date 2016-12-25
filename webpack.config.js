const path = require('path');
const webpack = require ('webpack');
const projectRoot = path.join(__dirname);
const assetPath = path.join(projectRoot, 'dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevMiddleWare = require('webpack-dev-middleware');


module.exports = {
    context: projectRoot,
    entry: './src/index.js',

    output: {
        path: assetPath,
        publicPath: '',
        filename: 'bundle.js',
        historyApiFallback: true
    },
    devServer: {
        inline: true
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['', '.js', '.jsx', '.json']
    },
    stats: {
        inline: true,
        colors: true,
        reasons: true,
        chunks: false
    },
    module:{
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // loader: 'babel-loader'

                loaders: [ 'babel-loader?presets[]=react' ]
            },
            {
                test: /\.html$/, loader: 'html-loader'
            }
        ]
    },
    plugins: [

        new webpack.DefinePlugin({

            'myKey': JSON.stringify(process.env.PROPUBLICA)

        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            files: {
                'js': ['bundle.js']
            }
        }),
        new webpack.HotModuleReplacementPlugin()


    ]

};
