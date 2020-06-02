const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].js'
    },
    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        inline: true,
        open: true,
        // - 在开发单页应用时非常有用, 它依赖于 HTML5 history API,
        //   如果设置为 true, 所有的跳转将指向 index.html
        historyApiFallback: true,
        host: 'localhost',
        port: '1369',
        compress: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
}