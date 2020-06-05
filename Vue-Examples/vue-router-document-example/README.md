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


