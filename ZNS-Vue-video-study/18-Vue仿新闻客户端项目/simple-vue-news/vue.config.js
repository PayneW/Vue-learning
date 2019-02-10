const path = require("path");
const webpack = require("webpack");


// 前端自行测试模拟数据和接口: 安装 express
const express = require("express");
const app = express();
const indexData = require("./src/static/index.json");
const articleData = require("./src/static/article.json");
const followData = require("./src/static/follow.json");
const apiRoutes = express.Router();
app.use("/api", apiRoutes);

module.exports = {
    // 基本路径
    baseUrl: "./",
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,

    // webpack 相关配置
    configureWebpack: {

        resolve: {
            // alias 别名
            alias: {
                // 指定本地 jquery 的路径, jquery 和下面的 webpack.ProvidePlugin 中的配置相对应
                // @ === src : vue cli 3.x 中/node_modules/@vue/cli-service/lib/config/base.js中已经配好的@路径
                "jquery": path.resolve(__dirname, "@/assets/js/jquery-1.7.2.js"),
            }
        },

        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
            })
        ]
    },


    css: {
        // 是否使用 css 分离插件 ExtractTextPlugin
        // extract: true,
        // 开发环境中查看源 css 文件在哪一行
        sourceMap: true,
        // css 预设器配置项
        // loaderOptions: {},
        // 启动 css modules for all css / pre-processor files.
        modules: false
    },


    devServer: {
        open: true,
        port: 7650,
        host: "localhost",
        https: false,

        // 发布路径
        // assetsPublicPath: "/",
        // 静态资源文件夹 (vue 中默认的静态资源文件夹就是 static)
        // assetsSubDirectory: "static",
        // vue-cli proxyTable 解决开发环境的跨域问题(服务器与服务器之间产生了一个代理跨域问题)
        /*proxy: {
            // "/api": {
            //     target: "http://api.xxxx.com", // e.g: http://news-at.zhihu.com
            //     // changeOrigin 设置为 true, 那么本地就会虚拟一个服务端接收你的代码
            //     // 请求并代你发送该请求，这样就不会有跨域问题了，当然这只适用于开发环境。
            //     changeOrigin: true,
            //     pathRewrite: {
            //         // 这种接口配置出来: http://xxx.xx.xx.xx:8083/api/login
            //         "^/api": "/api",
            //
            //         // 这种接口配置出来: http://xxx.xx.xx.xx:8083/login
            //         // "^/api": "/"
            //
            //     }
            // }
        },*/




        // before() 在服务内部的所有其他中间件之前，提供执行自定义中间件的功能。这可以用来配置自定义处理程序。
        before: function (app) {
            app.get("/api/indexData", function(request, response) {
                response.json(indexData)
            });
            app.get("/api/articleData", function(request, response) {
                response.json(articleData)
            });
            app.get("/api/followData", function(request, response) {
                response.json(followData)
            });
        }
    }
};
