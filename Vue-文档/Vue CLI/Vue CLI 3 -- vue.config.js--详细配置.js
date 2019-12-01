/**
 *   [Vue CLI 3 配置参考](https://cli.vuejs.org/zh/config/)
 *   vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级) 根目录中存在这个文件，
 * 那么它会被 @vue/cli-service 自动加载。你也可以使用 package.json 中的 vue 字段， 但是注意这
 * 种写法需要你严格遵照 JSON 的格式来写。
 *   这个文件应该导出一个包含了选项的对象:
 *   ```base
 *      // vue.config.js
 *      module.exports = {
 *          // 选项...
 *      }
 *   ```
 * */

/* [参考文章](https://blog.csdn.net/sunny_desmond/article/details/80916706) */

/*
 * reproduce /riːprə'djuːs/ vt & vi. 复制，重现
 * deterministic /dɪ,tɝmɪn'ɪstɪk/ adj. 确定性的
 * parallel  /'pærəlel/  n. 纬线，对比   adj. 平行线，并行
 * integrity /ɪn'tegrɪtɪ/ n. 正直，诚实
 * extract /ɪk'strækt/ vt. 提取，摘录
 */



// module.exports / exports 为 Node.js 导出
module.exports = {
    /**
     * 部署应用时的基本 URL:
     *    用法和 webpack 本身的 output.publicPath 一致， 但是
     * Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 baseUrl 而不是直接修改
     * webpack 的 output.publicPath.
     *    这个值也可以被设置为空字符串 ("") 或时相对路径 ("./")，这样所有的资源都会被链接
     * 为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova Hybrid 这样
     * 的文件系统中。
     * */
    baseUrl: "/",

    /**
     * 输出文件目录 :
     *    当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意
     * 目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)
     * */
    outputDir: "dist",


    /**
     * asserts directory 资源目录 :
     *    放置生成的静态资源 (js, css, img, fonts) 的 (相对于 outputDir 的)目录。
     * */
    assetsDir: "",


    /** 指定生成的 index.html 的输出路径 (相对于 outputDir)。 也可以时一个绝对路径。*/
    indexPath: "index.html",


    /** 文件名哈希:
     *    默认情况下，生成的静态资源在他们的文件名中包含了 hash 以便更好的控制缓存。然而，这也
     * 要求 index 的 HTML 时被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index
     * HTML, 你可以通过将这个选项设为 false 来关闭文件名哈希。
     * */
    filenameHashing: "true",

    /** 在 multi-page (多页) 模式下构建应用:
     *   每个 "page" 应该都有一个对应的 js 入口文件。其值应该是一个对象，对象的 key 是入口的名字，
     * value 是:
     *    + 一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外
     *     都是可选的);
     *    + 或一个指定其 entry 的字符串。
     *  ```base
     *      module.exports = {
     *          pages: {
     *              index: {
     *                  // page 的入口
     *                  entry: "src/index/main.js",
     *                  // 模板来源
     *                  template: "public/index.html",
     *                  // 在 dist/index.html 的输出
     *                  filename: "index.html",
     *                  // 当使用 title 选项时 template 中的 title 标签需要是
     *                  // <title><%= htmlWebpackPlugin.options.title %></title>
     *                  title: "Index Page",
     *                  // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk.
     *                  chunks: ["chunk-vendors", "chunk-common", "index"]
     *              },
     *              // 当使用只有入口的字符串格式时，模板会被推导为 `public/subpage.html`
     *              // 并且如果找不到的话，就回退到 `public/index.html`。
     *              // 输出文件名会被推到为 `subpage.html`
     *              subpage: "src/subpage/main.js"
     *          }
     *      }
     *  ```
     * */




    /**
     *    是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint
     * 被安装后生效。
     *    当 lintOnSave 是一个 truthy 的值时， eslint-loader 在开发和生产构建下都会被启动。如果你想要在
     * 生产构建时禁用 eslint-loader, 你可以用如下配置:
     *    ``` lintOnSave: process.env.NODE_ENV !== "production" ```
     */
    lintOnSave: true,


    // 通过 Babel 显式编译一个依赖
    transpileDependencies: [],

    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,

    crossorigin: undefined,

    integrity: false,


    // use the full build with in-browser compiler? 使用浏览器内编译器的完整版本？
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    compile: false,

    // webpack 配置
    // 详细介绍见: Vue CLI 3 官方文档 (webpack 相关)
    chainWebpack: () => {},
    configureWebpack: () => {},

    // vue-loader 配置项: https://vue-loader.vuejs.org/zh/
    vueLoader: {},

    // configureWebpack

    // chainWebpack



    // css 相关配置
    css: {
        // 是否使用 css 分离插件 ExtractTextPlugin
        extract: true,
        // 是否为 css 开启 source map. 设置为 true 之后可能会影响构建的性能。
        sourceMap: false,
        // css 预设器配置项
        loaderOptions: {},
        // 启动 css modules for all css / pre-processor files.
        modules: false
    },

    // use thread-loader(线程加载器) for babel & TypeScript in production build
    // enabled by default if the machine has more than 1 cores
    // parallel: require("os").cpus().length > 1,

    // 是否启用 dll
    dll: false,

    // PWA 插件相关配置
    pwa: {},


    /** 所有 webpack-dev-server 的选项都支持。 */
    devServer: {
        /* 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API
         * 请求代理到 API 服务器。 这个问题可以通过 vue.config.js 中的 devServer.proxy
         * 选项来配置。
         *  devServer.proxy 可以式一个指向开发环境 API 服务器的字符串:
         *  这会告诉开发服务器将任何未知请求(没有匹配到静态文件的请求)代理到 http://localhost:4000.
         *  ```proxy: "http://localhost: 4000",```
         * */
        // 设置代理
        proxy: null,
        /* open: process.platform === "darwin",*/
        // 编译完后是否在浏览器中自动打开
        open: true,
        hots: "0.0.0.0",
        port: "8080",
        https: false,
        before: app => {},
    },

    // 第三方插件
    pluginOptions: {}


};