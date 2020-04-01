const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);


module.exports = {
    chainWebpack: config => {
        // - 修复 HMR (hot module reload)
        // - Tip: 如果用 V2Ray 开着全局代理, 也是无法热更新的, 这一点要记得.
        config.resolve.symlinks(true);
    },

    css: {
        extract: IS_PROD,
        // sourceMap: true,
    }
};
