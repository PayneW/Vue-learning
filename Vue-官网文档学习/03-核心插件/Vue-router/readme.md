# Vue Router 文档


## Catalog
1. 安装
2. 介绍
3. 基础
    + 3.1 起步
    + 3.2 动态路由匹配
        - 3.2.1 响应路由参数的变化
        - 3.2.2 捕获所有路由或 404 Not found 路由
        - 3.2.3 高级匹配模式
        - 3.2.4 匹配优先级
    + 3.3 嵌套路由
    + 3.4 编程式的导航
        - 3.4.1 `router.push(location, onComplete?, onAbort?)`
        - 3.4.2 `router.replace(location, onComplete?, onAbort?)`
        - 3.4.3 `router.go(n)`
        - 3.4.4 操作 History
    + 3.5 命名路由
    + 3.6 命名视图
        - 3.6.1 嵌套命名视图
    + 3.7 重定向和别名
        - 3.7.1 重定向
        - 3.7.2 别名
    + 3.8 路由组件传参
        - 3.8.1 布尔模式
        - 3.8.2 对象模式
        - 3.8.3 函数模式
    + 3.9 HTML5 History 模式
        - 3.9.1 后端配置例子
4. 进阶 
    + 4.1 导航守卫
        - 4.1.1 全局前置守卫 
        - 4.1.2 全局解析守卫
        - 4.1.3 全局后置钩子
        - 4.1.4 路由独享守卫
        - 4.1.5 组件内的守卫
        - 4.1.6 完整的导航解析流程
    + 4.2 路由元信息
    + 4.3 过渡动效
        - 4.3.1 单个路由的过渡
        - 4.3.2 基于路由的动态过渡
    + 4.4 数据获取
        - 4.4.1 导航完成后获取数据 
        - 4.4.2 
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
- `vue-router` 使用
  [path-to-regexp](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0)
  作为路径匹配引擎, 所以支持很多高级的匹配模式, 例如: 可选的动态路径参数、
  匹配零个或多个、一个或多个, 甚至是自定义正则匹配. 查看它的
  [文档](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0#parameters)
  学习高阶的路径匹配, 还有
  [这个例子](https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js)
  展示 `vue-router` 怎么使用这类匹配.
##### 3.2.4 匹配优先级
- 有时候, 同一个路径可以匹配多个路由, 此时, 匹配的优先级就按照路由的定义顺序:
  谁先定义的, 谁的优先级就最高.


#### 3.3 嵌套路由
- 实际生活中的应用界面, 通常由多层嵌套的组件组合而成. 同样地, 
  URL 中各段动态路径也按某种结构对应嵌套的各层组件, 例如:
  ```base
    /user/foo/profile                     /user/foo/posts
    +------------------+                  +-----------------+
    | User             |                  | User            |
    | +--------------+ |                  | +-------------+ |
    | | Profile      | |  +------------>  | | Posts       | |
    | |              | |                  | |             | |
    | +--------------+ |                  | +-------------+ |
    +------------------+                  +-----------------+
  ```
  借助 `vue-router`, 使用嵌套路由配置, 就可以很简单地表达这种关系.

  接着上节创建的 app:
  ```html
    <div id="app">
        <router-view></router-view>
    </div>
  ```
  ```js
    const User = {
        template: '<div>User {{ $route.params.id }}</div>'
    }
    const router = new VueRouter({
        routes: [
            {path: '/user/:id', component: User}
        ]
    })
  ```
  这里的 `<router-view>` 是最顶层的出口, 渲染最高级路由匹配到的组件. 同样地, 
  一个被渲染组件同样可以包含自己的嵌套 `<router-view>`. 例如, 在 User
  组件的模板添加一个 `<router-view>`:
  ```js
    const User = {
        template: `
            <div class="user">
                <h2>User {{ $route.params.id }}</h2>
                <router-view></router-view>
            </div>
        `
    }
  ```
  要在嵌套的出口中渲染组件, 需要在 VueRouter 的参数中使用 children 配置：
  ```js
    const router = new VueRouter({
    routes: [
        { 
            path: '/user/:id',
            component: User,
            children: [
                {
                    // - 当 /user/:id/profile 匹配成功, UserProfile
                    //   会被渲染在 User 的 <router-view> 中
                    path: 'profile',
                    component: UserProfile
                },
                {
                    // - 当 /user/:id/posts 匹配成功 UserPosts
                    //   会被渲染在 User 的 <router-view> 中
                    path: 'posts',
                    component: UserPosts
                }
            ]
        }
    ]
    })
  ```
  **要注意, 以 `/` 开头的嵌套路径会被当作根路径.
  这让你充分的使用嵌套组件而无须设置嵌套的路径.**

  你会发现, ` children` 配置就是像 `routes` 配置一样的路由配置数组, 所以呢,
  你可以嵌套多层路由.

  此时, 基于上面的配置, 当你访问 `/user/foo` 时, `User` 的出口是不会渲染任何东西,
  这是因为没有匹配到合适的子路由. 如果你想要渲染点什么, 可以提供一个空的子路由:
  ```js
    const router = new VueRouter({
        routes: [
            {
                path: '/user/:id',
                component: User,
                children: [
                    // - 当 /user/:id 匹配成功, UserHome 不会被渲染在
                    //   User 的 <router-view> 中
                    {
                        path: '',
                        component: UserHome
                    },
                ]
            }
        ]
    })
  ```
  提供以上案例的可运行代码请[移步这里](https://jsfiddle.net/yyx990803/L7hscd8h/)

  **Hint:** 此章节的单组件示例详见:
  `../../../Vue-Examples/vue-router-document-example/src/components/3.3`.
  
  在 `3.3.vue` 组件中, 因为 `user` 作为路径字符已经在 `3.2.vue` 中使用过了,
  所以我更改 `user` 为 `worker`. 

#### 3.4 编程式的导航(Programmatic Navigator)
- 除了使用 `<router-link>` 创建 a 标签来定义导航链接, 我们还可以借助 router
  的实例方法, 通过编写代码来实现.
##### 3.4.1 `router.push(location, onComplete?, onAbort?)`
- **注意:** 在 Vue 实例内部, 你可以通过 `$router`来访问路由实例.
  因此(在组建内)你可以调用 `this.$router.push()`.

  想要导航到不同的 URL, 则使用 `router.push` 方法. 这个方法会向 history
  栈添加一个新的记录, 所以, 当用户点击浏览器后退按钮时, 则回到之前的 URL. 
  
  当你点击 `<router-link>` 时, 这个方法会在内部调用, 所以说, 点击
  `<router-link :to="...">` 等同于调用 `router.push(...)`. 
  
  | 声明式                    | 编程式             |
  | :-------------------------: | :------------------: |
  | `<router-link :to="...">` | `router.push(...)` |
  
  **Additional Info:** 比如在单组件内使用, 举个例子:
  ```js
    methods: {
        selectSinger(singer) {
            this.$router.push({
                path: `/singer/${singer.id}`
            });
            // {avatar: "https://xxxx", id: "0025Nh1xxx", name: "xxx"}
            console.log("singer 数据内容为: ", singer);
        },
    }
  ```
  该方法的参数可以是一个字符串路径, 或者一个描述地址的对象. 例如:
  ```js
    // - 字符串
    router.push('home');

    // - 对象: 如上示例代码.
    router.push({path: 'home'});

    // - 命名的路由
    router.push({name: 'user', params: {userId: '123'}})

    // - 带查询参数, 编程 /register?plan=private
    router.push({path: 'register', query: {plan: 'private'}})
  ```
  注意: 如果提供了 `path`, `params` 会被忽略, 上述例子中的 `query`
  并不属于这种情况. 取而代之的是下面例子的做法, 你需要提供路由的 `name`
  或手写完整的带有参数的 `path`:
  ```js
    const userId = '123';
    router.push({name: 'user', params: {userId}});  // - /user/123
    router.push({path: `/user/${userId}`});         // - /user/123
    // - 这里的 params 不生效
    router.push({path: '/user/', params: {userId}}) // - /user
  ```
  同样的规则也适用于 `router-link` 组件的 `to` 属性.

  在 2.2.0+, 可选的在 `router.push` 或 `router.replace` 中提供 `onComplete`
  和 `onAbort` 回调作为第 2 个和 第 3 个参数.
  这些回调将会在导航成功完成(在所有的异步钩子被解析之后)或终止(导航到相同的路由,
  或在当前导航完成之前导航到另一个不同的路由)的时候进行相应的调用. 在 3.1.0+,
  可以省略第二个和第三个参数, 此时如果支持 Promise, `router.push` 或
  `router.replace` 将返回一个 Promise.

  注意: 如果目的地和当前路由相同, 只有(查询)参数(query)发生了改变
  (比如从一个用户资料到另一个 `/users/1` --> `/users/2`), 你需要使用
  `beforeRouteUpdate` 来响应这个变化(比如抓取用户信息.)

##### 3.4.2 `router.replace(location, onComplete?, onAbort?)`
- 跟 `router.push` 很像, 唯一的不同就是, 它不会向 history 添加新记录,
  而是跟它的方法名一样 -- 替换掉当前的 history 记录. 
  
  | 声明式                            | 编程式                |
  | :-------------------------: | :------------------: |
  | `<router-link :to="..." replace>` | `router.replace(...)` |

##### 3.4.3 `router.go(n)`
- 这个方法的参数是一个整数, 意思是在 history 记录中向前或者后退多少步, 类似
  `window.history.go(n)`. 例子:
  ```js
    // 在浏览器记录中前进一步, 等同于 history.forward()
    router.go(1)

    // 后退一步记录, 等同于 history.back()
    router.go(-1)

    // 前进 3 步记录
    router.go(3)

    // 如果 history 记录不够用, 那就默默地失败呗
    router.go(-100)
    router.go(100)
  ```
##### 3.4.4 操作 History
- 你也许注意到 `router.push`、`router.replace` 和 `router.go` 跟
  [`window.history.pushState`、`window.history.replaceState` 和 `window.history.go`](https://developer.mozilla.org/en-US/docs/Web/API/History)
  好像, 实际上它们确实是效仿 `window.history` API 的.
  
  因此, 如果你已经熟悉
  [Browser History APIs](https://developer.mozilla.org/en-US/docs/Web/API/History_API), 那么在 Vue Router 中操作 history 就是超级简单的.
  
  还有值得提及的, Vue Router 的导航方法(`push`、 `replace`、 `go`)
  在各类路由模式 (`history`、 `hash` 和 `abstract`) 下表现一致.

  **Tip:** 这章节的内容不多, 暂时不添加但组件示例.

#### 3.5 命名路由(Named Views)
- 有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，
  或者是执行一些跳转的时候. 你可以在创建 Router 实例的时候，在 `routes`
  配置中给某个路由设置名称. 
  ```js
    const router = new VueRouter({
    routes: [
        {
        path: '/user/:userId',
        name: 'user',
        component: User
        }
    ]
    })
  ```
  要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象：
  ```html
    <router-link :to="{ name: 'user', params: { userId: 123 }}">
        User
    </router-link>
  ```
  这跟代码调用 `router.push()` 是一回事：
  ```js
    router.push({ name: 'user', params: { userId: 123 }})
  ```
  这两种方式都会把路由导航到 `/user/123` 路径. 
  
  完整的例子请[移步这里](https://github.com/vuejs/vue-router/blob/dev/examples/named-routes/app.js).

  下面为上一行示例代码的 copy: (tip: 代码结构比较简单, 不再添加单文件组件写法.)
  ```js
    import Vue from 'vue'
    import VueRouter from 'vue-router'

    Vue.use(VueRouter)

    const Home = { template: '<div>This is Home</div>' }
    const Foo = { template: '<div>This is Foo</div>' }
    const Bar = { template: '<div>This is Bar {{ $route.params.id }}</div>' }

    const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/foo', name: 'foo', component: Foo },
        { path: '/bar/:id', name: 'bar', component: Bar }
    ]
    })

    new Vue({
    router,
    template: `
        <div id="app">
        <h1>Named Routes</h1>
        <p>Current route name: {{ $route.name }}</p>
        <ul>
            <li><router-link :to="{ name: 'home' }">home</router-link></li>
            <li><router-link :to="{ name: 'foo' }">foo</router-link></li>
            <li><router-link :to="{ name: 'bar', params: { id: 123 }}">bar</router-link></li>
        </ul>
        <router-view class="view"></router-view>
        </div>
    `
    }).$mount('#app')
  ```


#### 3.6 命名视图(Named Views)
- 有时候你需要同时展示多个视图(multiple views), 而不是嵌套(nesting)它们, 例如.
  创建一个布局, 含有 `sidebar` 视图和 `main` 视图. 这个时候命名视图派就派上用场了.
  你可以在界面中拥有多个单独命名的视图, 而不是只有一个单独的出口. 如果 `router-view`
  没有设置名字, 那么默认为 `default`.
  ```html
    <router-view class="view one"></router-view>
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>
  ```
  一个视图使用一个组件渲染, 因此对于同个路由, 多个视图就需要多个组件. 确保正确使用
  `components` 配置(带上 s):
  ```js
    const router = new VueRouter({
        routes: [
            {
                path: '/',
                components: {
                    default: Foo,
                    a: Bar,
                    b: Baz
                }
            }
        ]
    })
  ```
  以上案例相关的可运行代码请[移步这里](https://jsfiddle.net/posva/6du90epg/). 
##### 3.6.1 嵌套命名视图
- 我们也有可能使用命名视图创建嵌套视图的复杂布局. 这时你也需要命名用到的嵌套
  `router-view` 组件. 我们以一个设置面板为例：
  ```text
    /settings/emails                                       /settings/profile
    +-----------------------------------+                  +------------------------------+
    | UserSettings                      |                  | UserSettings                 |
    | +-----+-------------------------+ |                  | +-----+--------------------+ |
    | | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
    | |     +-------------------------+ |                  | |     +--------------------+ |
    | |     |                         | |                  | |     | UserProfilePreview | |
    | +-----+-------------------------+ |                  | +-----+--------------------+ |
    +-----------------------------------+                  +------------------------------+
  ```
- `Nav` 只是一个常规组件. 
- `UserSettings` 是一个视图组件. 
- `UserEmailsSubscriptions`、`UserProfile`、`UserProfilePreview` 是嵌套的视图组件. 

- **注意**：我们先忘记 HTML/CSS 具体的布局的样子，只专注在用到的组件上.

  `UserSettings` 组件的 `<template>` 部分应该是类似下面的这段代码：
  ```html
    <!-- UserSettings.vue -->
    <div>
        <h1>User Settings</h1>
        <NavBar/>
        <router-view/>    
        <router-view name="helper"/>
    </div>
  ```
  *嵌套的视图组件在此已经被忽略了，但是你可以在
  [这里](https://jsfiddle.net/posva/22wgksa3/)找到完整的源代码.*

  然后你可以用这个路由配置完成该布局：
  ```js
    {
        path: '/settings',
        // 你也可以在顶级路由就配置命名视图
        component: UserSettings,
        children: [
            {
                path: 'emails',
                component: UserEmailsSubscriptions
            },
            {
                path: 'profile',
                // - components 是有 s 的!
                components: {
                    default: UserProfile,
                    // - 注意上面的命名视图 name="helper", 在这里定义.
                    helper: UserProfilePreview
                }
            }
        ]
    }
  ```
  一个可以工作的示例的 demo 在[这里](https://jsfiddle.net/posva/22wgksa3/). 

- **Additional Info:** 当前 `3.6.1` 的示例, 单文件组件的写法在
  `../../../Vue-Examples/vue-router-document-example/src/components/3.6-2`
  文件夹中, 请一定自己写一遍, 这个示例应该算是比较绕的.



#### 3.7 重定向和别名
##### 3.7.1 重定向
- 重定向也是通过 `routes` 配置来完成，下面例子是从 `/a` 重定向到 `/b`：
  ```js
    const router = new VueRouter({
        routes: [
            { path: '/a', redirect: '/b' }
        ]
    })
  ```
  重定向的目标也可以是一个命名的路由：
  ```js
    const router = new VueRouter({
        routes: [
            { path: '/a', redirect: { name: 'foo' }}
        ]
    })
  ```
  甚至是一个方法，动态返回重定向目标：
  ```js
    const router = new VueRouter({
        routes: [
            { 
                path: '/a',
                redirect: to => {
                    // 方法接收 目标路由 作为参数
                    // return 重定向的 字符串路径/路径对象
                }
            }
        ]
    })
  ```
  注意
  [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)
  并没有应用在跳转路由上，而仅仅应用在其目标上。在下面这个例子中，为 `/a` 路由添加一个
  `beforeEach` 守卫并不会有任何效果。
  
  其它高级用法，请参考[例子](https://github.com/vuejs/vue-router/blob/dev/examples/redirect/app.js)。

##### 3.7.2 别名
- "重定向"的意思是，当用户访问 `/a` 时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`,
  那么 "别名" 又是什么呢？
  
  **`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，
  但是路由匹配则为 `/a`，就像用户访问 `/a` 一样。**

  上面对应的路由配置为：
  ```js
    const router = new VueRouter({
        routes: [
            { path: '/a', component: A, alias: '/b' }
        ]
    })
  ```
  "别名" 的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。

  更多高级用法，请查看[例子](https://github.com/vuejs/vue-router/blob/dev/examples/route-alias/app.js)。

#### 3.8 路由组件传参


#### 3.9 HTML5 History 模式


### 4. 进阶 
#### 4.1 导航守卫
#### 4.2 路由元信息
#### 4.3 过渡动效
#### 4.4 数据获取
#### 4.5 滚动行为
#### 4.6 路由懒加载



