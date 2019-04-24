const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

const axios = require("axios");
const bodyParser = require("body-parser");


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
        open: false,
        host: "0.0.0.0",
        port: 7400,
        https: false,
        hotOnly: false,

        // vue-cli proxy 解决开发环境的跨域问题(服务器与服务器之间产生了一个代理跨域问题)
        // webpack-dev-server 是使用了 http-proxy-middleware 来实现的 proxy。webpack-dev-server 是一个
        // 小型的 Node.js Express 服务器，它使用 webpack-dev-middleware 来为通过 webpack 打包生成的静态资源
        // 提供 web 服务。
        /*proxy: {
            "/api": {
                target: "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?",
                changeOrigin: true,
            },

            "/api/getSingerList": {
                target:  "https://u.y.qq.com/cgi-bin/musicu.fcg?",
                changeOrigin: true,
            },

            "/api/getDiscList": {
                target: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?",
                changeOrigin: true
            }
        },*/

        // devServer.before 配置: 在服务器内部的所有其他中间件之前，提供执行自定义中间件的功能。用来配置自定义处理程序
        before(app) {
            app.use(bodyParser.urlencoded({extended: true}));
            const querystring = require("querystring");

            // 获取歌单列表
            app.get('/api/getDiscList', function (req, res) {
                const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    // 将数据返回给前端
                    res.json(response.data)
                }).catch((e) => {
                    console.log(e)
                })
            });

            // 获取歌手列表 : 🔺 api 前面不要忘记 "/"
            /*app.get("/api/getSingerList", function(req,res) {
                const url = "https://u.y.qq.com/cgi-bin/musicu.fcg?";
                axios.get(url, {
                    headers: {
                        referer: "https://y.qq.com/portal/singer_list.html",
                        host: 'u.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.join(response.data);
                }).catch((e) => {
                    console.log("Error: ", e);
                })
            });*/

            // 获取歌手信息
            /*app.get("/api/getSingerDetail", function (req, res) {
                const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?";
                axios.get(url, {
                    headers: {
                        referer: "https://y.qq.com/",
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    console.log("response: ", response);
                    res.json(response.data)
                }).catch((e) => {
                    console.log("获取歌手信息 Error : ", e);
                })
            });*/

            app.post("/api/getPurlUrl", bodyParser.json(), function(req, res) {
                const url = "https://u.y.qq.com/cgi-bin/musicu.fcg";
                axios.post(url, req.body, {
                    headers: {
                        referer: "https://y.qq.com/",
                        origin: "https://y.qq.com",
                        "Content-type": "application/x-www-form-urlencoded"
                    }
                }).then((response) => {
                    res.json(response.data);
                }).catch((e) => {
                    console.log(e);
                })
            });

            app.get("/api/lyric", function(req, res) {
                // 7-19 歌词接口并没有改变
                const url = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg";
                axios.get(url, {
                    headers: {
                        referer: "https://c.y.qq.com/",
                        host: "c.y.qq.com"
                    },
                    params: req.query
                }).then((response) => {
                    let ret = response.data;
                    if (typeof ret === "string") {
                        // \w: 匹配数字字母下划线
                        const reg = /^\w+\(({.+})\)$/;
                        const matches = ret.match(reg);
                        if (matches) {
                            ret = JSON.parse(matches[1]);
                        }
                    }
                    res.json(ret)
                }).catch((e) => {
                    console.log("/api/lyric Error: ", e);
                })
            });


            // 8-2 add: 获取歌单里的歌曲
            app.get("/api/getCdInfo", function(req, res) {
                const url = "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg";
                axios.get(url, {
                    headers: {
                        referer: "https://c.y.qq.com/",
                        host: "c.y.qq.com"
                    },
                    params: req.query
                }).then((response) => {
                    // tips: 我们这里调试的 console 在哪里可以看到输出？ A: 在 gitBash 运行窗口总可以看到输出。
                    // 如果当前项目在 WebStorm 中的 Terminal 中运行，那么在 terminal 中也可以看到输出。
                    // console.log("response.data: ", response.data);

                    // 8-2: 为什么我们要在这里再次处理代码？ A: 当前接口是 get 请求，但从上面打印的
                    // response.data: jsonCallback({"code": 0, "subcode": 0, ......}) 可以看出，返回
                    // 的值并不是一个 json, 所以不可以直接利用 res.join(response.data) 方法来处理。 之前自己
                    // 在对比 QQ 官网接口来获取数据时，总是报参数错误，我想有一部分原因也出现在这里。(tips: 这种
                    // 返回 jsonp 格式的接口，也可以用 jsonp 调用 )
                    let ret = response.data;
                    if (typeof ret === "string") {
                        // \w: 匹配字母，数字，下划线
                        const reg = /^\w+\(({.+})\)$/;
                        const matches = ret.match(reg);
                        if (matches) {
                            ret = JSON.parse(matches[1]);
                        }
                    }
                    res.json(ret);
                }).catch((e) => {
                    console.log(e);
                })
            });


            // 9-1 add: 获取排行榜下的歌单
            app.get("/api/getTopList", function(req, res) {
                const url = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";
                axios.get(url, {
                    headers: {
                        referer: "https://c.y.qq.com/",
                        host: "c.y.qq.com"
                    },
                    params: req.query
                }).then((response) => {
                    let ret = response.data;
                    console.log(typeof ret);
                    if (typeof ret === "string") {
                        ret = ret.replace(/(^\s*)|(\s*$)/g, "");


                        let first = ret.indexOf("{");
                        let last = ret.lastIndexOf("}");
                        ret = JSON.parse(ret.substring(first, (last+1)));


                        // \w: 匹配字母，数字，下划线
                        // const reg = /^\w+\(({.+})\)$/;
                        // const matches = ret.match(reg);
                        // console.log(matches);
                        // if (matches) {
                        //     ret = JSON.parse(matches[1]);
                        // }

                    }
                    // console.log(ret);
                    res.json(ret);
                }).catch((e) => {
                    console.log(e);
                })
            });

            // 10-3 搜索页面下的热门搜索
            app.get("/api/getHotKey", function(req, res) {
                const url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg";
                axios.get(url, {
                    headers: {
                        referer: "https://c.y.qq.com/",
                        host: "c.y.qq.com"
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data);
                }).catch((e) => {
                    console.log(e);
                });
            });

            // 10-4: 搜索接口
            app.get("/api/search", function(req, res) {
                const  url = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp";
                axios.get(url, {
                    headers: {
                        referer: "https://c.y.qq.com/",
                        host: "c.y.qq.com"
                    },
                    params: req.query
                }).then((response) => {
                    let ret = response.data;
                    if (typeof ret === "string") {
                        ret = ret.replace(/(^\s*)|(\s*$)/g, "");

                        let first = ret.indexOf("{");
                        let last = ret.lastIndexOf("}");
                        ret = JSON.parse(ret.substring(first, (last+1)));

                    }
                    // console.log(ret);
                    res.json(ret);
                }).catch((e) => {
                    console.log(e);
                })
            })


        }
    },
};
