# vue-router-document-example

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




## 项目配置说明
- (1) 创建 `vue.config.js` 添加需要的配置
- (2) 编译错误提示:
  ```base
     1:1  error  Parsing error: Unexpected token <
  ``
  这个是没有安装 `eslint-plugin-vue` 的原因,
  ```shell
    npm install eslint-plugin-vue --save-dev
  ```
- (3) 编译报错:
  ```base
    1:1  error  Parsing error: Unexpected token <
  ```
  和 `(2)` 一样, 我方了(^_^), 问题原因可以参考 stackOverflow 上的这个问题
  https://stackoverflow.com/questions/36001552/eslint-parsing-error-unexpected-token
  
  解决方法, 安装 `babel-eslint`
  ```shell
    npm install babel-eslint --save-dev
  ```
  接着在 `.eslintrc` 中添加使用:
  {
      "parser": "babel-eslint"
  }

- (4) 使用 `npm run build` 打包后在本地预览的方法:
    + (1) 在 `vue.config.js` 中添加.
      ```js
        module.exports = {
            public: './'
        }
      ```
    + `dist` 目录需要启动一个 HTTP 服务器来访问(除非你已经将 `publicPath`
      配置为了一个相对的值), 所以以 `file://` 协议直接打开 `dist/index.html`
      是不会工作的. 在本地预览生产环境构建最简单的方式就是使用一个 Node.js
      静态服务器, 例如 [serve](https://github.com/vercel/serve):
      ```shell
        # 全局安装 serve
        npm install -g serve

        # 进入到项目文件中执行
        serve -s dist
        # -s 参数的意思就是将其假设在 Single-Page Application 模式下
        # 这个模式会处理即将提到的路由问题.
      ```

