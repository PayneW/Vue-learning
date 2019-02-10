
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack  = require('webpack')
const merge = require('webpack-merge')
const HTMLPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
]

const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    hot: true
}

let config

if( isDev ) {
const baseConfig = require('./webpack.config.base')
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                },
            ]
        },
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin()
            // new webpack.NoEmitOnErrorsPlugin()
        ])
    })

} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/index.js')
        },
        output: {
            filename:  '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        miniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new miniCssExtractPlugin({filename: 'styles.[contenthash:8].css'})
        ]),
        optimization: {
            splitChunks: {
                chunks: 'all'
            },
            untimechunk: true
        }
    })
}

module.exports= config
