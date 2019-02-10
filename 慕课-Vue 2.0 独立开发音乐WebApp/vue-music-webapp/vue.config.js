const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

const express = require("express");
const webpack = require("webpack");
const axios = require("axios");

const app = express();
const apiRoutes = express.Router();


apiRoutes.get("/api/getDiscList", function(req, res) {
    const url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?";
    debugger;
    axios.get(url, {
        headers: {
            // 欺骗的手段
            referer: "https://c.y.qq.com/",
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        res.join(response.data);
    }).catch((e) => {
        console.log("Error: ", e)
    })
});

app.use("/api", apiRoutes);


module.exports = {
    publicPath: "./",
    productionSourceMap: false,

    // webpack 相关配置
    configureWebpack: function (config) {
        /* if (process.env.NODE_ENV === "production") {
             // 为生产环境修改配置
         } else {
             // 为开发环境修改配置
         }*/

        return {
            resolve: {
                extensions: ['.js', '.vue', '.json'],
                alias: {
                    // "vue$": "vue/dist/vue.esm.js",
                    "src": resolve("src"),
                    "assets": resolve("src/assets"),
                    "components": resolve("src/components"),
                    "api": resolve("src/api"),
                    "base": resolve("src/base"),
                }
            },

        }

    },

    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装后生效
    lintOnSave: true,

    // Vue 3.0 通过 webpack-chain 链式 API 的调用方式配置别名(alias)
    // chainWebpack: function(config) {
    //     config.resolve.alias
    //         .set("src", resolve("src"))
    //         .set("@", resolve("src"))
    //         .set("common", resolve("src/common"))
    // },


    css: {
        // 是否使用 css 分离插件 ExtractTextPlugin
        // extract: true,
        // 开发环境中查看源 css 文件在哪一行
        sourceMap: true,
        // css 预设器配置项
        // loaderOptions: {},
        // 启动 css modules for all css / pre-processor files.
        modules: false,
    },


    /** 所有 webpack-dev-server 的选项都支持。*/
    devServer: {
        open: true,
        host: "0.0.0.0",
        port: 7400,
        https: false,
        hotOnly: false,



        // vue-cli proxy 解决开发环境的跨域问题(服务器与服务器之间产生了一个代理跨域问题)
        proxy: {
            "/api": {
                target: "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?",
                changeOrigin: true,
            }
        },


        // devServer.before 配置: 在服务器内部的所有其他中间件之前，提供执行自定义中间件的功能。用来配置自定义处理程序
        before(app) {
            app.get('/api/getDiscList', function (req, res) {
                const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    console.log(e)
                })
            })
        }
    },
};
