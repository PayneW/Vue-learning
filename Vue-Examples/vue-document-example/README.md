# vue-document-learning-example

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


## 添加安装插件说明:

### 1. 安装 Stylus 
```shell
    npm install stylus stylus-loader --save-dev
```

### 2. 安装 lodash
```shell
    # 升级 npm 的 shell 命令
  npm i -g npm 

  npm install --save-dev lodash
```

### 3. 安装 tween.js
```shell
    npm install @tweenjs/tween.js@^18
```
使用 : `const TWEEN = require('@tweenjs/tween.js')`

### 4. vue-router
- 安装: 
  ```shell
    npm install vue-router
  ```
- 使用: 在 src 文件夹下添加 `router.js` 文件, 在内部添加
  ```js
    import Vue from 'vue';
    import Router from 'vue-router';
    
    import App from './App';
    
    Vue.use(Router);
    
    export default new Router({
        mode:'history',
        base: process.env.BASE_URL,
        routes: [
            {
                path: '/',
                redirect: '/app'
            },
            {
                path: '/app',
                component: App
            }
        ]
    })
  ```
  接着在 `main.js` 中引入 `router.js`
  ```js
    import Vue from 'vue'
    import App from './App.vue'
    import router from './router'
    
    Vue.config.productionTip = false
    
    
    new Vue({
        router,
        render: h => h(App),
    }).$mount('#app')
  ```
