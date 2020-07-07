const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
    publicPath: './',
    chainWebpack: config => {
        // - 修复热重载(hot module reload)
        config.resolve.symlinks(true);

        // 添加别名
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("views", resolve("src/views"))
            .set("router", resolve("src/router"))
            .set("store", resolve("src/store"))
    },
    css: {
        extract: IS_PROD,
        // sourceMap: true
    },
    devServer: {
        overlay: {
            // - 让浏览器 overlay 同时显示警告和错误
            warnings: false,
            errors: false
        },
        open: true,
        host: 'localhost',
        port: 13400,
        https: false,
    }
}
