const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

modules.exports = {
    chainWebpack: config => {
        // - 修复热重载(HMR (hot module reload))
        config.resolve.symlinks(true),
    },
    css: {
        extract: IS_PROD,
        // sourceMap: true,
    }
}