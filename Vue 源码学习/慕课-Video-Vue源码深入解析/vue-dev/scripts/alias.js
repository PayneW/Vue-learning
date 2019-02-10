const path = require('path')

// const resolve = p => path.resolve(__dirname, '../', p);
const resolve = function(p) {
  path.resolve(__dirname, "../", p);
};

// 此 alias 文件提供了一个到最终真实环境的一个映射关系

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  entries: resolve('src/entries'),
  sfc: resolve('src/sfc')
}
