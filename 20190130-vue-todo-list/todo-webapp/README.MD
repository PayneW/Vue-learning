## Vue + Webpack 打造 todo 应用

- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- 尼玛实在不能不吐槽: (webpack-4 没有创建成功)
    + 正常安装 webpack-dev-server 后运行 npm run build 后报错, 错误内容为: 
        - `'NODE_ENV' ▒▒▒▒▒ڲ▒▒▒▒ⲿ▒▒▒Ҳ▒▒▒ǿ▒▒▒▒еĳ▒▒▒ ▒▒▒▒▒▒▒▒▒ļ▒▒▒ events.js:167 
            throw er; // Unhandled 'error' event ^ Error: spawn NODE_ENV ENOENT`
          搜了很久找到解决方法说是: webpack-dev-server: "^2.9.7" 只能用 2.xx 的版本，
          不能用 3.xx; 好这个就到此打住不说了。
          
        - 来看一下此时 package.json 中的 devDependencies 中的 webpack 相关依赖版本: 
        ```json
            {
                "devDependencies": {
                    "webpack": "^4.29.0",
                    "webpack-cli": "^3.2.1",
                    "webpack-dev-server": "^2.9.7"
                }
            }
        ```
        - 接着来运行 npm run dev: 报错为 
            ```Error: Cannot find module 'webpack/bin/config-yargs```,
          去 google 搜索解决方法，全是英文没有找到合适的结果，然后换 baidu 查到说是 webpack 和 webpack-dev-server
          版本不兼容, 接着卸载 npm uninstall webpack webpack-cli (注: 因为 webpack-4 把 webpack-cli 单独分离出来
          维护所以需要一起卸载，因为 webpack-3 内是集成在内的，无需单独安装) 
          安装 npm install webpack@3.12.0 --save-dev (注: npm info webpack 可以查看)
          
        - 然后又报别的错误: 
            ``Invalid configuration object. Webpack has been initialised using a configuration object 
            that does not match the API schema.`` 
          这一段的意思是 webpack.config.js 错误，原因是这个配置文件的版本和我们当前安装的 webpack 的版本不匹配。 
          
        - 那此时我把 webpack.config.js 删除重建后，去除内部 webpack-4 需要的配置，然后删除 node_modules 重新 npm install
          接下来我们在 Git bash 中会看到如下提示 
          ```
              npm WARN css-loader@2.1.0 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies yourself.
              npm WARN file-loader@3.0.1 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies yourself.
              npm WARN vue-loader@15.6.2 requires a peer of webpack@^4.1.0 || ^5.0.0-0 but none is installed. You must install peer dependencies yourself.
          ```
          这里的提示就很明白明显了，我们默认安装 css-loader file-loader vue-loader 都是当前日期来说默认最新的稳定版本，
          所以相应的 webpack 版本也需要最新的。
          
          **............ 到此时真的什么都不想改了，
          默默拷贝了问答里别人写好的项目中 devDependencies 中的依赖接着下面的写**
- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~



- 使用 npm init 创建 package.json 文件，创建一个 node 项目

- 使用 npm 安装 webpack vue vue-loader
    + npm install webpack webpack-cli vue vue-loader --save-dev
    
- 安装 style-loader: 
    + npm install style-loader --save-dev
        
- 安装 vue-loader 需要的 css-loader  vue-template-compiler
    + npm install css-loader vue-template-compiler --save-dev
    
- 创建 src 文件夹
    + 再文件夹下添加 App.vue 和 index.js
    
- 创建 webpack.config.js 文件，添加配置

- 安装 postcss 插件来 "优化/添加前缀/压缩css" 
    + npm install postcss postcss-loader autoprefixer cssnano postcss-preset-env --save-dev
    + 创建 postcss 需要的相关文件: postcss.config.js 和 .browserlistrc 并添加配置

- 安装 mini-css-extract-plugin 来提取 css
    + npm install mini-css-extract-plugin --save-dev
    + 在 webpack.config.js 中配置 mini-css-extract-plugin
    ```javascript
      const MiniCssExtractPlugin = require("mini-css-extract-plugin");
      new MiniCssExtractPlugin({
          // 提取的 css 文件名
          filename: "[name].min.css"
      })
    ```
    
- 安装 babel-loader 插件用来处理 js
    + npm install babel-loader @babel/core @babel/preset-env  --save-dev
    + 在 webpack.config.js 中配置 babel-loader
    + 创建 .babelrc 并添加配置
    
- 配置好 url-loader 和参数之后安装 url-loader， url-loader 需要 file-loader
   所以需要安装 file-loader 
   + 注: 
    - CSS 中引入的图片: file-loader
    - 自动合成雪碧图: postcss-sprites
    - 压缩图片: img-loader
    - Base64 编码: url-loader
   + npm install file-loader  url-loader --save-dev
   
- 安装 stylus 
   + npm install stylus stylus-loader --save-dev
  
- 安装 webpack-dev-server: webpack 官方提供给我们的开发服务器。 **[详见: webpack-study\imooc-unlock-webpack\5-4-模块热更新\README-5-2.MD]**
    + npm install webpack-dev-server --save-dev 
    + 在 package.json 中配置添加 : 
        - script 对象中添加 'dev': 'webpack-dev-server --config webpack.config.js'
- 安装 cross-env : 解决不同平台设置环境变量的不同的问题
    + npm install cross-env --save-dev
- 生成 html 文件 : **[详见: webpack-study\imooc-unlock-webpack\5-4-模块热更新\README-5-2.MD]**
    + npm install html-webpack-plugin --save-dev
    + 配置 plugins: 
    ```javascript
      const htmlWebpackPlugin = require("html-webpack-plugin");
      module.exports = {
          // ... other coder
          plugs: [
              new htmlWebpackPlugin({
                  // 编译生成后的 html 文件也可以指定 hash (哈希)
                  filename: "index.html",
                  // 模板文件
                  template: "./index.html",
                  // 指定把编译后的 js/css 放在 "head"||"body"||false 标签中
                  inject: "body",
                  // 上线压缩 : 这些配置可以去 github 的 html-webpack-plugin 库中查看
                  minify: {
                      removeComments: false,
                      // 删除空格
                      collapseWhitespace: false,
                  }
              })
          ]
      }
    ```    
      