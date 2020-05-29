# vue-todo-list

- 由于在 vue create 项目时忘记安装 postcss 所以单独安装，postcss 插件来 "优化/添加前缀/压缩css" 
    + npm install postcss postcss-loader autoprefixer  postcss-preset-env --save-dev
    + 创建 postcss 需要的相关文件: postcss.config.js 并添加配置

- 安装 stylus 
     + npm install stylus stylus-loader --save-dev
     + 注: vue 内部应该已经配置好了 stylus 的 loader, 无需手动再次配置
- 拷贝别的项目中的 .eslintrc.js 后 安装 
    +  npm install @vue/eslint-config-standard --save-dev





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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
