var webpack = require("webpack");
var htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // devtool: "source-map",
    /**
     * entry 入口属性:
     *  1. 单个入口语法: entry：string | Array<string>
     *      + --> entry: "./src/main.js"
     *      + --> entry: ["main.js", "a.js"] : 含义是: --> 2 个平行的互相依赖的文件打包在一起，生成一个打包文件时
     *  2. 多个入口写法:(不管单个还是多个文件入口，这种方式都用的更多一些)
     *     {
     *          entry: {
     *              // 如果 entry 中只有一个 main 入口，编译生成后的文件就是: ./dist/main.js
     *              main: "./src/main.js",
     *              // 如果有多个入口，编译后也会有对应的文件出现: ./dist/a.js
     *              a: "./src/a.js"
     *          },
     *          output: {
     *              // [name] 后可以添加:
     *              //  1. -[hush]: 本次打包的哈希(文件名哈希和最上面打包的哈希都一样)  --> [name]-[hash].js
     *              //  2. -[chunkhash]: 文件名上的哈希各不一样值并且和打包时的哈希值也不一样，
     *              //      文件名上的哈希值只有当文件内容改变后才会更新，更新项目后可以根据次特点只上线更新好的文件。
     *              filename: "[name].js",
     *              path: __dirname + "/dist"
     *          }
     *     }
     */
    entry: {
        main: "./src/js/main.js",
        a: "./src/js/a.js",
        b: "./src/js/b.js",
        c: "./src/js/c.js",
    },
    output: {
        // __filename变量: 获取当前模块文件的带有完整绝对路径的文件名。
        // 3.3.2 __dirname变量: 获取当前模块文件所在目录的完整绝对路径。

        // "/dist" 这样是把生成的 index.html 放在 dist 文件夹下
        path: __dirname + "/dist",

        // "js/...": js/ 表示把 js 文件生成到 dist 目录下的 js 目录中
        filename: "js/[name]-[chunkhash].js",

        // 配置上线路径
        // publicPath: "http://cdn.com/"
    },
    module: {
        rules:[
            {
                test:/\.css$/,
                loader:["style-loader","css-loader"]
            }
        ]
    },

    plugins: [
        // 使用 html-webpack-plugin 插件，利用 new 初始化来调用
        new htmlWebpackPlugin({
            // 编译生成后的 html 文件也可以指定 hash (哈希)
            filename: "a.html",

            template: "index.html",

            // 指定把编译后的 js/css 放在 "head"||"body"||false 标签中
            inject: "body",

            // (3-2) 在根目录下的 index.html 中设置
            // `<title><%= htmlWebpackPlugin.options.title %></title>`
            // <%= %> 是 EJS 的语法
            title: "webpack is good",
            date: new Date(),

            // 上线压缩 : 这些配置可以去 github 的 html-webpack-plugin 库中查看
            minify: {
                removeComments: false,
                // 删除空格
                collapseWhitespace: false,
            },
            chunks: ["main", "a"],
        }),

        // 生成多个页面的就是定义多个 new htmlWebpackPlugin()
        new htmlWebpackPlugin({
            // 编译生成后的 html 文件也可以指定 hash (哈希)
            filename: "b.html",
            template: "index.html",
            inject: "body",
            title: "this is b.html",
            minify: {
                removeComments: false,
                collapseWhitespace: false,
            },
            chunks: ["main", "b"],

            // 如果不使用上面的 chunks 也可以使用这样的属性
            // excludeChunks: ["a", "c"]
        }),

        new htmlWebpackPlugin({
            // 编译生成后的 html 文件也可以指定 hash (哈希)
            filename: "c.html",
            template: "index.html",
            inject: false,
            title: "this is c.html",
            minify: {
                removeComments: false,
                collapseWhitespace: false,
            },
            chunks: ["c"],
        }),
    ]
};