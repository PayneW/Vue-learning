
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack  = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry:  path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'docs')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ]
}

if( isDev ) {
    config.module.rules.push({
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'less-loader'
        ]
    })
    config.devtool = '#cheap-module-eval-source-map',
        config.devServer = {
            port: 8000,
            host: '0.0.0.0',
            overlay: {
                errors: true
            },
            hot: true
        },
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        )

} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.less$/,
        use: [
            miniCssExtractPlugin.loader,
            "css-loader",
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'less-loader'
        ]
    })
    config.plugins.push(
        new miniCssExtractPlugin({filename: 'styles.[contenthash:8].css'}),
    )
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}

module.exports= config
