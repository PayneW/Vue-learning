# music-webapp (vue cli 2.0 脚手架创建)

## 安装插件:
- 安装 vuex
    + npm install vuex --save
    
- 安装 stylus [stylus 官网](https://stylus.bootcss.com/)
    + npm install stylus stylus-loader --save-dev

- Babel 的 2 个插件: 
    + 作用: 实现像 Generator、Set、Map、Array.from、Array.prototype.includes 
    这些还不支持的函数和方法. *(详细使用: webpack-study\imooc-unlock-webpack\3-3\README-3-3 视频笔记.md)*
    + Babel Runtime Transform (运行时变换) : 局部垫片，不会污染全局变量，为 "开发框架准备的"
      - 安装: 
          + 安装最新版本的方法:  
          + 普通按安装命令: 
              - npm install babel-runtime --save
              
      - 使用: 项目根目录新建 .babelrc 文件，配置 plugin

- 安装原生 jsonp 实现库 (原生 jsonp 代码讲解: js-sundry-goods\JS-实现效果\2019-01-20-手写JSONP\jsonp.html)
    + npm install jsonp --save

- 安装 better-scroll (滚动插件)
    + npm install better-scroll --save

- 安装 express 和 axios
    + npm install express --save-dev
    + npm install axios --save

- 安装 compression 和 body-parser
    + npm install compression compression-webpack-plugin --save-dev
    + npm install body-parser --save-dev
    




### ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
