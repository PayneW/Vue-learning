## 使用 webpack 从头搭建一个 vue-loader 项目
   - 开头的讲解见: ZNS视频 P6 6.VueJS第三讲(二) 从 55 分钟左右开始。 

#### 简单的目录结构: 
    |- index.html   (手动创建)
    |- main.js          入口文件    (手动创建)
    |- App.vue          Vue 文件    (手动创建)
    |- package.json     [注:一个标准的 npm 说明文件，包括当前项目的依赖模块、名称、配置。 
                        更详细的语法: D:\git-clone\webpack-study\Webpack-语法.md]   (创建: npm init --yes)
    |- webpack.dev.config.js   webpack 配置文件  (手动创建)
    
#### ES6: 模块化开发
   - 导出模块: export default {} [注: 最常用的一种形式]
   - 引入模块: import 模块名 from 文件名
   
#### webpack 准备工作
   - npm install webpack (下载, 不带服务器的版本)
   - npm install webpack-dev-server (带服务器的版本)
   - 也可以执行一下下载2个模块: npm install webpack webpack-dev-server
   
   - vue 首先装的就是vue:  npm install vue
   
   - App.vue   -> 变成正常的代码需要: vue-loader， 需要在 webpack.dev.config.js 中配置loader
   
   - npm install vue-loader --save-dev
   - npm install vue-html-loader css-loader vue-style-loader vue-hot-reload-api --save-dev
   
   - babel-loader
   - babel-core
   - babel-plugin-transform-runtime
   - babel-preset-es2015
   - babel-runtime
   
 ***********************************************************
 
 <h2>上面写了很多，但还是启动报错，最后还是转而使用 vue-cli*</h2>  