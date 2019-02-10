/**
 * Vue CLI 3 更改了项目的文件结构，之前 2.0 项目的 build 和 config 文件夹移除。如果需要自定义配置，
 * 需要在项目的 "根目录" 下添加一个 vue.config.js 文件。 在这个文件中，我们可以进行一些个性化定制。
 * */

// module.exports / exports 为 Node.js 导出
module.exports = {
    // 基本路径
    baseUrl: "./",
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 服务器端口号
    devServer: {
        port: 1234
    }
};