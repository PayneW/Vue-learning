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

  [npkg.com](https://unpkg.com/) 提供了基于 NPM 的 CDN 链接. 
  上面的链接会一直指向在 NPM 发布的最新版本. 你也可以像
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
> 注意: 教程中的案例代码使用
 [ES2015](https://github.com/lukehoban/es6features) 来编写.

> 同时, 所有的例子都将使用完整版的 Vue 以解析模板. 更多细节请 `移步这里`(即:
  Vue 官网教程 `../../01-Vue.js/01-基础.md` -- `1.1 安装`)

#### 3.1 起步
- 用 Vue.js + Vue Router 创建单页应用, 是非常简单的. 使用 Vue.js,
  我们已经可以通过组合组件来组成应用程序, 当你要把 Vue Router 添加进来, 
  我们需要做的是, 将组件 (components) 映射到路由 (routes), 然后告诉
  Vue Router 在哪里渲染它们. 下面是个基本例子:
- 因为当前示例是使用完整版(即: 通过 `script` 标签来引入 vue 和 vue-router)的,
  所以此处就不再粘贴代码了, 想看 html 页面写法的直接看官网教程即可,
  下面把官网的示例改为单文件组件的写法. 详细代码见: `../../../Vue-Examples/vue-router-document-example`
    + (1) 先在 components 文件夹下创建 3.1 文件夹, 在其内部创建 `3.1.vue`
    和 2 个子组件(路由组件) `foo.vue` 和 `bar.vue`;
    + (2) 在 `App.vue` 中导入 `3.1.vue` 组件,
    + (3) 我们在当前项目的主入口文件 `main.js` 中引入全局需要的 CSS 文件, 和
      `vue-router` 插件, 然后在 new Vue() 实例中, 通过 `router`
      配置参数注入路由, 从而让整个应用都有路由功能.

      通过注入路由, 我们可以在任何组件内通过 `this.$router` 访问路由器, 
      也可以通过 `this.$route` 访问当前路由:
      ```html
        <!-- - 例如我们在 3.1.vue 中添加如下代码 -->
        <template>
            // ... 其他代码
             <p>{{username}}</p>
        </template>

        <script>
            export default {
                name: 'Demo31',
                computed: {
                    username() {
                        // - 因为我们在项目主入口文件 main.js 中引入了 router 路由实例,
                        //   所以可以在任何组件内通过 `this.$router`(使用见下面的 methods
                        //   内 goBack 方法内) 访问到路由器; 
                        //   也可以通过 `this.$route` 访问到当前路由.(tip: Vue
                        //   内部还是做了封装的, 具体实现以后看了源码便知.)
                        console.log(this.$route);
                        return null;
                    }
                },
                methods: {
                    goBack() {
                        window.history.length > 1
                            ? this.$router.go(-1)
                            : this.$router.push('/')
                    }
                }
            }
        </script>
      ```
    + (4) 最后我们在 src/router 下的 index.js 文件夹中, 导入 `App.vue` /
      `foo.vue` / `bar.vue`, 在 `routes` 数组中定义路由,
      每个路由应该映射一个组件. `component` 属性的值便是导入的组件,
      最后使用 new VueRouter() 创建 router 路由示例, 把 `routers` 传入.

#### 3.2 动态路由匹配
- 我们经常需要把某种模式匹配到的所有路由, 全都映射到同一个组件. 例如, 我们有一个
  `User` 组件, 对于所有 ID 各不相同的用户, 都要使用这个组件来渲染. 那么,
  我们可以在 `vue-router` 的路由路径中使用 "动态路径参数"(dynamic segment)
  来达到这个效果:
  ```js
    const User = {
        template: '<div>User</div>'
    };
    const router = new VueRouter({
        routes: [
            // - 动态路径参数以冒号开头
            {path: '/user/:id', component: User}
        ]
    });
  ```
  现在呢, 项 `/user/foo` 和 `user/bar` 都将映射到相同的路由.

  一个 "路径参数" 使用冒号 `:` 标记. 当匹配到一个路由时, 参数值会被设置到
  `this.$route.params`, 可以在每个组件内使用. 于是, 我们可以更新 `User` 模板,
  输出当前用的 ID:
  ```js
    const User = {
        template: '<div>User {{$route.params.id}}</div>'
    }
  ```
  你可以看看这个[在线例子](https://jsfiddle.net/yyx990803/4xfa2f19/).

  你可以在一个路由中设置多端 "路径参数", 对应的值都会设置到 `$route.params` 中.
  例如:
  
  |      模式       |     匹配路径     |     `$route.params`    |
  |    :---   |   :---    |    :---    |
  | /user/:username | /user/evan     | `{username: 'evan'}` |
  | /user/:username/post/:post_id | /user/evan/post123 | `{username: 'evan', post_id: '123'}` |

  除了 `$route.params` 外, `$route` 对象还提供了其他有用的信息, 例如,
  `$route.query`(如果 URL 中有查询参数), `$route.pash` 等等. 你可以查看
  [API 文档](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
  
  **Hint:** 上面示例的单文件写法见: `../../../Vue-Examples/vue-router-document-example/src/components/3.2`
##### 3.2.1 响应路由参数的变化
- 提醒一下, 当使用路由参数时, 例如从 `/user/foo` 导航到 `/user/bar`,
  **原来的组件会被复用.** 因为两个路由都渲染同个组件, 比起销毁再创建,
  复用则显得更高效. **不过, 这也意味着组件的生命周期钩子不会再被调用.**

  复用组件时, 想对路由参数的变化作出响应的话, 你可以简单地 watch(检测变化)
  `$route` 路由信息对象:
  ```js
    const User = {
        template; '..',
        watch: {
            $route(to, from) {
                // - 对路由变化作出响应...
            }
        }
    }
  ```
  或者使用 2.2 中引入的 `beforeRouteUpdate`
  [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB):
  ```js
    const User = {
        template: '..',
        beforeRouteUpdate(to, from , next) {
            // react to route changes...
            // don't forget to call next()
        }
    }
  ```
##### 3.2.2 捕获所有路由或 404 Not found 路由
- 常规阐述只会匹配被 `/` 分隔的 URL 片段中的字符. 如果想匹配 **任意路径**,
  我们可以使用通配符 (`*`):
  ```js
    {
        // - 会匹配所有路径
        path: '*'
    }
    {
        // - 会匹配以 `/user-` 开头的任意路径
        path: '/user-*'
    }
  ```
  当使用通配符路由时, 请确保路由的顺序是正确的, 也就是说含有通配符的路由应该放在最后.
  路由 `{ path: '*' }` 通常用于客户端 404 错误. 如果你使用了 History 模式,
  请确保[正确配置你的服务器](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90). 

  当使用一个通配符时, `$route.params`(tip: 为一个对象, 在 `/3.2/user.vue` 中查看)
  内会自动添加一个名为 `pathMatch` 参数. 它包含了 `URL` 通过通配符被匹配的部分:
  ```js
    // - 给出一个路由 { path: '/user-*' }
    this.$router.push('/user-admin');
    console.log(this.$route.params.pathMatch)   // 'admin'
    
    // - 给出一个路由 { path: '*' }
    this.$router.push('/non-existing');     // - 设置一个不存在的 route
    console.log(this.$route.params.pathMath);   // '/non-existing'
  ```
##### 3.2.3 高级匹配模式
- `vue-router` 使用 [path-to-regexp]() 作为路径匹配引擎,
  所以支持很多高级的匹配模式, 例如: 可选的动态路径参数、匹配零个或多个、一个或多个,
  甚至是自定义正则匹配。查看它的[文档]()学习高阶的路径匹配, 还有这个例子 展示 vue-router 怎么使用这类匹配。
##### 3.2.4 匹配优先级

  

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



