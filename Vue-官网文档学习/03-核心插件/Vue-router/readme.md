# Vue Router 文档


## Catalog
1. 安装
2. 介绍
3. 基础
    + 3.1 起步
    + 3.2 动态路由匹配
    + 3.3 嵌套路由
    + 3.4 编程式的导航
    + 3.5 命令路由
    + 3.6 命名视图
    + 3.7 重定向和别名
    + 3.8 路由组件传参
    + 3.9 HTML5 History 模式
4. 进阶 
    + 4.1 导航守卫
    + 4.2 路由元信息
    + 4.3 过渡动效
    + 4.4 数据获取
    + 4.5 滚动行为
    + 4.6 路由懒加载




## New Words
- **route [rut] --n.路线; 航线; 路径; 线路;** 
    + an air route. 航空线路
    + The route passes close by the town. 这条路从镇子旁边经过.
    + We stopped for a picnic en route. 我们中途停下来野餐.
    + They marched the route in a day. 他们在一天内走完了全程.
    + The route is shorter than this one. 那条路比这条短.
- **discrete [dɪ'skriːt] --adj. 分离的, 不相关联的**
- **authorization [ɔːθəraɪ'zeɪʃ(ə)n]{UK} --n.授权, 批准**
    + Seeking authorization to begin construction. 请求批准开始建造.




## Pre-knowledge Content
- 如果你对下面几个知识点不熟悉, 请一定先看下当前目录的:
  `./前端路由实现原理/前端路由实现原理.md`
    + (1) history 对象
    + (2) history 对象上的 `length`/`state` 属性, `history.forward()`/
      `history.back()`/`history.go()` 方法
    + (3) `hashchange` 事件
    + (4) `pushState()`/`replaceState()` 方法
    + (5) `popstate` 事件


## Content
### 1. 安装
#### 1.1 直接下载 / CDN
- [https://unpkg.com/vue-router/dist/vue-router.js](https://unpkg.com/vue-router/dist/vue-router.js)

  [npkg.com](https://unpkg.com/) 提供了基于 NPM 的 CDN 链接。
  上面的链接会一直指向在 NPM 发布的最新版本。你也可以像
  `https://unpkg.com/vue-router@2.0.0/dist/vue-router.js` 这样指定
  版本号 或者 Tag.

  在 Vue 后面加载 `vue-router`, 它会自动安装的.
  ```js
    <script src="/path/to/vue.js"></script>
    <script src="/path/to/vue-router.js"></script>
  ```

#### 1.2 NPM
- shell 脚本:
  ```shell
    npm install vue-router
  ```
  如果在一个模块化工程中使用它, 必修通过 `Vue.use()` 明确地安装路由功能:
  ```js
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    Vue.use(VueRouter);
  ```
  如果使用全局的 script 标签, 则无须如此(手动安装).
#### 1.3 构建开发版
- 如果你想使用最新的开发版, 就得从 Github 上直接 clone, 然后自己 build 一个
  `vue-router`.
  ```shell
    git clone https://github.com/vuejs/vue-router.git node_modules/vue-router
    cd node_modules/vue-router
    npm install
    npm run build
  ```


### 2. 介绍
> 版本说明: 对于 TypeScript 用户来说, `vue-router@3.0+` 依赖 `vue@2.5+`,
  反之亦然.
- Vue Router 是 [Vue.js](https://cn.vuejs.org/) 官方的路由管理器. 它和 Vue.js
  的核心深度集成, 让构建单页面引用变得易如反掌. 包含的功能有:
    + (1) 嵌套的路由/视图表
    + (2) 模块化的, 基于组件的路由配置
    + (3) 路由参数, 查询, 通配符
    + (4) 基于 Vue.js 过渡系统的试图过渡效果
    + (5) 细粒度的导航控制
    + (6) 带有自动激活的 CSS class 的链接
    + (7) HTML5 历史模式(history) 模式或 hash 模式, 在 IE9 中自动降级
    + (8) 自定义的滚动条行为
  现在开始[起步](https://router.vuejs.org/zh/guide/)或尝试一下我们的
  [示例](https://github.com/vuejs/vue-router/tree/dev/examples)吧
  (常看仓库的 `README.md` 来运行它们).
- 添加上面 `示例`(examples) 下的各个文件的中英对照:
    + (1) `active-links`(激活连接)
    + (2) `auth-flow`(授权流程)
    + (3) `basic`(基础的)
    + (4) `data-fetching`(获取数据)
    + (5) `discrete-components`(分离组件)
    + (6) `hash-mode`(哈希模式)
    + (7) `hash-scroll-behavior`(哈希滚动行为)
    + (8) `keepalive-view`(keepalive 视图)
    + (9) `lazy-loading`(懒加载)
    + (10) `lazy-loading-before-mount`(懒加载编译之前)
    + (11) `multi-app`(多应用)
    + (12) `named-routes`(命名路线)
    + (13) `named-views`(命名视图)
    + (14) `navigation-guards`(导航守卫)
    + (15) `nested-router`(嵌套路由器)
    + (16) `nested-routes`(嵌套路线)
    + (17) `redirect`(重定向)
    + (18) `route-alias`(路线别名)
    + (19) `route-props`(路线 prop)
    + (20) `router-errors`(路由错误)
    + (21) `transitions`(过渡)
- **Tip:** 在 vue-router 中 `router` 是 VueRouter 的实例, `route`
  是路由信息对象,


### 3. 基础
> 注意: 教程中的案例代码使用 [ES2015](https://github.com/lukehoban/es6features) 来编写.

> 同时, 所有的例子都将使用完整版的 Vue 以解析模板. 更多细节请 `移步这里`(即:
  Vue 官网教程 `../../01-Vue.js/01-基础.md` -- `1.1 安装`)

- 用 Vue.js + Vue Router 创建单页应用，是非常简单的。使用 Vue.js,
  我们已经可以通过组合组件来组成应用程序，当你要把 Vue Router 添加进来，
  我们需要做的是，将组件 (components) 映射到路由 (routes)，然后告诉
  Vue Router 在哪里渲染它们。下面是个基本例子:
#### 3.1 HTML
- 因为当前示例是使用完整版(即: 通过 `script` 标签来引入 vue 和 vue-router)的,
  所以此处就不再粘贴代码了, 想看 html 页面写法的直接看官网教程即可,
  下面把官网的示例改为单文件组件的写法.



#### 3.2 JavaScript

#### 3.1 起步
#### 3.2 动态路由匹配
#### 3.3 嵌套路由
#### 3.4 编程式的导航
#### 3.5 命令路由
#### 3.6 命名视图
#### 3.7 重定向和别名
#### 3.8 路由组件传参
#### 3.9 HTML5 History 模式


### 4. 进阶 
#### 4.1 导航守卫
#### 4.2 路由元信息
#### 4.3 过渡动效
#### 4.4 数据获取
#### 4.5 滚动行为
#### 4.6 路由懒加载



