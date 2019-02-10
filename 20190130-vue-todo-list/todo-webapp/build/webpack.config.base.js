
const path = require('path')
const webpack  = require('webpack')
const isDev = process.env.NODE_ENV === 'development'

const config = {
    mode: process.env.NODE_ENV || 'production', // development || production
    target: 'web',
    entry:  path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: __dirname +  'node_modules',
                options: {
                    preets: ['env']
                }
            },{
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}
module.exports= config
