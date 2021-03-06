const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
    publicPath: './',

    chainWebpack: config => {
        // - 修复热重载(HMR (hot module reload))
        config.resolve.symlinks(true)
    },
    css: {
        extract: IS_PROD,
        // sourceMap: true,
    },

    devServer: {
        open: true,
        host: 'localhost',
        port: '1366',
        https: false,
    },
}
