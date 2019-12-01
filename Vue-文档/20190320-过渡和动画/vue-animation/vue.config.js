const path = require("path");

module.exports = {
  publicPath: "./",
  productionSourceMap: false,

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装后生效
  lintOnSave: true,

  css: {
    sourceMap: true,
    modules: false,
  },

  devServer: {
    open: false,
    port: 7000,
    https: false,
    hotOnly: false,
    proxy: null,
  },
};
