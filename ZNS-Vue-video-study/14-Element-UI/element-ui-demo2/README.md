# element-ui-demo2

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



## 按需引入 Element-UI
   借助 babel-plugin-component,我们可以只引入需要的组件，已达到减小项目体积的目的。
1. 首先安装 babel-plugin-component
    + npm install babel-plugin-component --save-dev
2. 配置 babel.config.js
   ```base
       module.exports = {
           presets: [
               '@vue/app'
           ],
           plugins: [
               [
                   "component",
                   {
                       "libraryName": "element-ui",
                       "styleLibraryName": "theme-chalk"
                   }
               ]
           ]
       };
   ```
3. 接下来如果只希望引入部分组件，比如 Button 和 Select, 那么需要在 main.js 中写入一下内容
   ```
      import Vue from "vue";
      import {Button, Select} from "element-ui";
      import App from "./App.vue";
      
      Vue.use(Button);
      Vue.use(Select);
      
      new Vue({
         el: "#app",
         render: h => h(App)
      })
   ```
  