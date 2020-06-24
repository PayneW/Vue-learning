# Vuex


## Catalog
- 01 安装
    + 1.1 Vuex 是什么?
- 02 开始
    + 2.1 核心概念
        - 2.1.1 State(状态)
        - 2.1.2 Getter(取得/得到)
        - 2.1.3 Mutation(突变)
        - 2.1.4 Action(动作)
        - 2.1.5 Module
        - 2.1.6
    + 2.2 项目结构
    + 2.3 插件
    + 2.4 严格模式
    + 2.5 表单处理
    + 2.6 测试
    + 2.7 热重载



## New Words
- **store [stɔr] --n.商店; 存储; 储藏. --vt.存储,储备; 供给. --vi.可存储**
    + a candy store. 糖果店
    + buy things at a store. 在商店购物
    + The department store(n) was thronged[θrɔŋ] with people.
      百货商店挤满了人.
    + a great store(n) of wine[waɪn]. 储存大量葡萄酒.
    + store(vt) the mind with knowledge. 以知识充实自己.
    + This food stores(vi) well. 这种食品可存储.
- **state [steɪt] --n.状态, 情形, 洲**
- **dispatch [dɪ'spætʃ] --vt.调度; 派遣; 发送. --n.派遣; 急件.**
    + dispatch action. 调度动作.
    + dispatch office. 派遣室; 调度处.
    + Which method should the server dispatch to?
      服务器应该发送哪一种方法呢? 
 - **action ['ækʃən] --n.行动; 动作; 作用; 行为.**
    + action of the mind = mental action. 心理活动.
    + a man of action. 行动家
    + Now arrives the hour of action. 现在是行动的时刻.
    + Now people had to take an action. 现在人们必须做出行动.
- **mutation [mjuː'teɪʃ(ə)n]  --n.突变**
- **mutate [mjuː'teɪt] --vi.变异, 突变. --vt.使变异, 使突变**
    + Let these alien cells grow and mutate, and see how they survive.
      让这些特殊细胞生长并突变, 观察他们如何生存. 
- **commit [kə'mɪt]  --vt.提交; 委托; 承诺**




## Pre-Content
- Vuex 的调度流程
```base  
            (触发调度)
            Dispatch                                  Commit(提交)
          ----------------> Actions (调度一个"动作") ----------------> 
          |          [这个Actions(动作)不会直接改变                    |
          |          State(状态)]                                   |
          |                                                         |
          |                                                         |                
     Vue Components                                              Mutations
     点击组件(e.g: App.vue, Home.vue)                               突变
          ^                                                         |
          |                                                         |
          |                                                         |
          |                                                         |
          ---------------- State (状态) <----------------------------
                Render(渲染)                          Mutate(变化)
```

- state -- 数据仓库
- getter -- 用来获取数据的
- mutation -- 用来修改数据的
- action -- 用来提交 mutation



## Content
### 01 安装
- 直接下载 / CDN 引用 `https://unpkg.com/vuex`
- [Unpkg.com](https://unpkg.com/) 提供了基于 NPM 的 CDN 链接. 
  以上的链接会一直指向 NPM 上发布的最新版本. 您也可以通过
  `https://unpkg.com/vuex@2.0.0` 这样的方式指定特定的版本. 
  
  在 Vue 之后引入 `vuex` 会进行自动安装: 
  ```html
    <script src="/path/to/vue.js"></script>
    <script src="/path/to/vuex.js"></script>
  ```
- NPM
  ```bash
    npm install vuex --save
  ```
- yarn
  ```bash
    yarn add vuex
  ```
  在一个模块化的打包系统中, 您必须显式地通过 `Vue.use()` 来安装 Vuex: 
  ```js
    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex)
  ```
  当使用全局 script 标签引用 Vuex 时, 不需要以上安装过程. 

- Promise
  Vuex 依赖 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises). 如果你支持的浏览器并没有实现 Promise
  (比如 IE), 那么你可以使用一个 polyfill 的库, 
  例如 [es6-promise](https://github.com/stefanpenner/es6-promise). 

  你可以通过 CDN 将其引入: 
  ```html
    <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>
  ```
  然后 `window.Promise` 会自动可用. 
  
  如果你喜欢使用诸如 npm 或 Yarn 等包管理器, 可以按照下列方式执行安装: 
  ```bash
    npm install es6-promise --save # npm
    yarn add es6-promise # Yarn
  ```
  或者更进一步, 将下列代码添加到你使用 Vuex 之前的一个地方: 
  ```js
    import 'es6-promise/auto'
  ```

- 自己构建

  如果需要使用 dev 分支下的最新版本, 您可以直接从 GitHub 上克隆代码并自己构建. 
  ```bash
    git clone https://github.com/vuejs/vuex.git node_modules/vuex
    cd node_modules/vuex
    npm install
    npm run build
  ```

#### 1.1 Vuex 是什么?
- Vuex 是一个专为 Vue.js 应用程序开发的`状态管理模式(state management pattern)`.
  它充当应用程序中所有组件的集中存储, 并以相应的规则确保 状态(`state`)
  只能以它可预测的方式发生变异. Vuex 也集成到 Vue 的官方调试工具
  [devtools extension](https://github.com/vuejs/vue-devtools)
  , 提供了诸如零配置的 time-travel(时间旅行) 调试、状态快照导入导出等高级调试功能. 
- **(1) 什么是 "状态管理模式"?**
  让我们从一个简单的 Vue 计数应用开始: 
  ```js
    new Vue({
        // state
        data () {
            return {
                count: 0
            }
        },

        // view
        template: `<div>{{ count }}</div>`,

        // actions
        methods: {
            increment () {
                this.count++
            }
        }
    })
  ```
  这个状态自管理应用包含以下几个部分: 
    + **state**, 驱动应用的数据源；
    + **view**, 以声明方式将 **state** 映射到视图；
    + **actions**, 响应在 **view** 上的用户输入导致的状态变化. 

  以下是一个表示"单向数据流"理念的简单示意: 

  <img src="./images-vuex/flow.png"
        style="margin-left: 0; border-radius: 4px; width: 66%;
            box-shadow: 1px 1px 3px 2px #e5e5e5">

  但是, 当我们的应用遇到**多个组件共享状态**时, 单向数据流的简洁性很容易被破坏: 
    + 多个视图依赖于同一状态. 
    + 来自不同视图的行为需要变更同一状态. 

  对于问题一, 传参的方法对于多层嵌套的组件将会非常繁琐, 
  并且对于兄弟组件间的状态传递无能为力. 对于问题二, 
  我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝. 
  以上的这些模式非常脆弱, 通常会导致无法维护的代码. 

  因此, 我们为什么不把组件的共享状态抽取出来, 以一个全局单例模式管理呢？
  在这种模式下, 我们的组件树构成了一个巨大的"视图", 不管在树的哪个位置, 
  任何组件都能获取状态或者触发行为！

  通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性, 
  我们的代码将会变得更结构化且易维护. 

  这就是 Vuex 背后的基本思想, 借鉴了
  [Flux](https://facebook.github.io/flux/docs/overview)、
  [Redux](http://redux.js.org/) 和 
  [The Elm Architecture](https://guide.elm-lang.org/architecture/). 
  与其他模式不同的是, Vuex 是专门为 Vue.js 设计的状态管理库, 
  以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新. 

  如果你想交互式地学习 Vuex, 可以看这个 
  [Scrimba 上的 Vuex 课程](https://scrimba.com/g/gvuex), 
  它将录屏和代码试验场混合在了一起, 你可以随时暂停并尝试. 
  
  <img src="./images-vuex/vuex.png"
        style="margin-left: 0; border-radius: 4px; width: 66%;
            box-shadow: 1px 1px 3px 2px #e5e5e5">

- **(2) 什么情况下我应该使用 Vuex？**
  
  Vuex 可以帮助我们管理共享状态, 并附带了更多的概念和框架. 
  这需要对短期和长期效益进行权衡. 

  如果您不打算开发大型单页应用, 使用 Vuex 可能是繁琐冗余的. 
  确实是如此——如果您的应用够简单, 您最好不要使用 Vuex. 一个简单的
  [store 模式](https://cn.vuejs.org/v2/guide/state-management.html#简单状态管理起步使用)
  就足够您所需了. 但是, 如果您需要构建一个中大型单页应用, 
  您很可能会考虑如何更好地在组件外部管理状态, Vuex 将会成为自然而然的选择. 
  引用 Redux 的作者 Dan Abramov 的话说就是:
  
  > Flux 架构就像眼镜: 您自会知道什么时候需要它. 

### 02 开始
#### 2.1 核心概念
- 每一个 Vuex 应用的核心就是 store（仓库）. "store" 基本上就是一个容器, 
  它包含着你的应用中大部分的**状态 (state)**. Vuex 和单纯的全局对象有以下两点不同:
    + (1) Vuex 的状态存储是响应式的. 当 Vue 组件从 store 中读取状态的时候, 
      若 store 中的状态发生变化, 那么相应的组件也会相应地得到高效更新. 
    + (2) 你不能直接改变 store 中的状态. 改变 store 中的状态的唯一途径就是显式地
      **提交 (commit) mutation**. 这样使得我们可以方便地跟踪每一个状态的变化, 
      从而让我们能够实现一些工具帮助我们更好地了解我们的应用. 

- **(1) 最简单的 Store**
  
  [安装](https://vuex.vuejs.org/zh/installation.html) Vuex 之后, 
  让我们来创建一个 store. 创建过程直截了当——仅需要提供一个初始 state 对象和一些 mutation:
  ```js
    import Vue from 'vue';
    import Vuex from 'vuex';
    Vue.use(Vuex);
    const store = new Vue.Store({
        state: {
            count: 0
        },
        mutation: {
            increment(state) {
                state.count++
            }
        }
    })
  ```
  现在, 你可以通过 `store.state` 来获取状态对象, 以及通过 `store.commit()`
  方法触发状态变更:
  ```js
    store.commit('increment');
    console.log(store.state.count); // 1
  ```
  为了在 Vue 组件中访问 `this.$store` 属性(property), 你需要为 Vue
  实例提供创建好的 store(实例). Vuex 提供了一个从根组件向所有子组件, 以 `store`
  选项的方式 "注入" 该 store 的机制: 
  ```js
    new Vue({
        el: '#app',
        // - ES6 对象属性的简写. ES5 为 store: store
        store,
    })
  ```
  现在我们可以从组件的方法提交一个变更: 
  ```js
    methods: {
        increment() {
            this.$store.commit('increment');
            console.log(this.$store.state.count);
        }
    }
  ```
  再次强调, 我们通过提交 mutation 的方式, 而非直接改变 `store.state.count`, 
  是因为我们想要更明确地追踪到状态的变化. 这个简单的约定能够让你的意图更加明显, 
  这样你在阅读代码的时候能更容易地解读应用内部的状态改变. 此外, 
  这样也让我们有机会去实现一些能记录每次状态改变, 保存状态快照的调试工具. 
  有了它, 我们甚至可以实现如时间穿梭般的调试体验. 

  由于 store 中的状态是响应式的, 在组件中调用 store 
  中的状态简单到仅需要在计算属性中返回即可. 触发变化也仅仅是在组件的 methods
  中提交 mutation. 

  这是一个[最基本的 Vuex 记数应用](https://jsfiddle.net/n9jmu5v7/1269/)示例. 

  **Added:** 下面是上一行示例的单组件写法:
  示例见: `../../../Vue-Examples/vuex-example/src/views/count.vue`
  ```vue
    <template>
    <div class="count">
        <h1>Vuex 计数应用</h1>
        <p>{{count}}</p>
        <p>
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
        </p>
    </div>
    </template>

    <script>
    export default {
        name: 'count',
        computed: {
            count() {
                return this.$store.state.count;
            }
        },
        methods: {
            increment() {
                this.$store.commit('increment')
            },
            decrement() {
                this.$store.commit('decrement');
            }
        }
    }
    </script>

    <style lang="stylus" scoped>
        p button {
            border-radius:4px;
            margin-left: 10px;
            border: none;
            padding: .3em .8em;
            background-color: #66cc99;
            cursor: pointer;
        }
    </style>
  ```
  下面是 `store/index.js` 中的配置
  ```js
    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex)

    export default new Vuex.Store({
        state: {
            count: 0
        },
        getters: {
        },
        mutations: {
            increment: state => state.count++,
            decrement: state => state.count--
        },
        actions: {
        },
        modules: {
        }
    })
  ```
  在 `main.js` 中注入 Vuex 实例
  ```js
    import Vue from 'vue'
    import App from './App.vue'
    import router from './router'
    import store from './store'

    Vue.config.productionTip = false

    new Vue({
        router,
        // - 注入 store 到 Vue 实例中. 以便在组件中通过 this.$store 访问
        store,
        render: h => h(App)
    }).$mount('#app')
  ```
  接下来, 我们将会更深入地探讨一些核心概念. 让我们先从 `State` 概念开始. 

##### 2.1.1 State(状态)
- **(1) 单一状态树**

  Vuex 使用**单一状态树**, 也就是说, 该单个对象(tip:
  `const store = new Vue.Store({})` 构造函数的实例 store 即为此对象)
  包含您所有应用程序级别的状态,
  并充当 "真理的单一来源(single source of truth)"
  ([SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth)).
  这也意味着通常每个应用程序只有一个 `store`(实例).
  单一状态树使定位特定状态变得简单了,
  并且使我们能够轻松地获取当前应用程序中状态(state)的快照以进行调试.
  
  单一状态树不会与模块化冲突 -- 在后面的章节中, 我们将讨论如何将 状态(state)
  和 突变(mutations) 拆分为子模块.
  
  存储在 Vuex 中的数据遵循和 Vue 实例中的 `data` 相同的规则, 
  例如状态对象必须是纯粹 plain(字面量) 的. 
  **参考: **[Vue#data](https://cn.vuejs.org/v2/api/#data). 

- **(2) 将 Vuex 状态(state) 纳入到 Vue 组件**
  
  那么我们如何在 Vue 组件中展示状态呢？由于 Vuex 的状态存储是响应式的, 
  从 store 实例中读取状态最简单的方法就是在
  [计算属性](https://cn.vuejs.org/guide/computed.html)中返回某个状态:
  ```js
    // - 创建一个 Counter 组件
    const Counter = {
        template: `<div>{{count}}</div>`,
        computed; {
            count(){
                return store.state.count
            }
        }
    }
  ```
  每当 `store.state.count` 变化的时候, 都会重新求取计算属性, 
  并且触发更新相关联的 DOM. 
  
  然而, 这种模式导致组件依赖全局状态单例. 在模块化的构建系统中, 在每个需要使用
  state 的组件中需要频繁地导入, 并且在测试组件时需要模拟状态. 
  
  Vuex 通过 `store` 选项, 提供了一种机制将状态从根组件 "注入"
  到每一个子组件中（需调用 `Vue.use(Vuex)`):
  ```js
    const app = new Vue({
        el: '#app',
        // - 把 store 对象提供给 "store" 属性.
        //   这会将 store 实例注入到所有的子组件.
        store,
        components: { Counter },
        template: `<div class="app"><counter></counter></div>`
    })
  ```
  通过在根实例中注册 `store` 选项, 该 `store` 实例会注入到根组件下的所有子组件中, 
  且子组件能通过 `this.$store` 访问到. 让我们更新下 Counter 组件的实现:
  ```js
    const Counter = {
        template: `<div>{{count}}</div>`,
        computed: {
            count () {
                return this.$store.state.count
            }
        }
    }
  ```

- **(3) `mapState` 辅助函数**
  
  当组件需要使用多个存储状态(state)属性和 getter 时,
  声明所有这些计算属性会变得重复和冗长. 为了解决这个问题, 我们可以使用 `mapState`
  辅助函数帮助我们生成计算属性, 让你少按几次键.
  ```js
    // - 在单独构建的版本中辅助函数为 Vuex.mapState

    import {mapState} from 'vuex';
    export default {
        // ...
        computed: mapState({
            // - 箭头函数可使代码更简练
            count: state => state.count,

            // - 传递字符串参数 'count' 等同于 `state => state.count`
            countAlias: 'count',

            // - 为了能够使用 `this` 获取局部状态, 必须使用常规函数
            countPlusLocalState(state) {
                return state.count + this.localCount;
            }
        })
    }
  ```
  当映射的计算属性的名称与 state 子节点名称相同时, 我们也可以给 `mapState`
  传一个字符串数组.
  ```js
    computed: mapState([
        // - 映射 this.count 为 store.state.count
        'count'
    ])
  ```

- **(4) 对象展开运算符**
  
  `mapState` 函数返回的是一个对象. 我们如何将它与局部计算属性混合使用呢？通常,
  我们需要使用一个工具函数将多个对象合并为一个, 以使我们可以将最终对象传给
  `computed` 属性. 但是自从有了
  [对象展开运算符](https://github.com/tc39/proposal-object-rest-spread), 
  我们可以极大地简化写法:
  ```js
    export default {
        name: 'Foo',
        data() {},
        computed: {
            localComputed() {/* ... */},
            // - 使用对象展开运算符将此对象混入到外部对象中
            ...mapState({
                // ...
            })
        }
    }
  ```
  上面的单组件示例写法为:
  ```js
    // 其他代码同上, 省略... 

    computed: {
        // count() {
        //     return this.$store.state.count;
        // },
        // - 使用 ES6 的对象展开运算符(`...`) 把 mapState 对象内的属性,
        //   合并到当前 computed 对象中.
        ...mapState(['count'])
    },
  ```

- **(5) 组件仍然保有局部状态.**
  
  使用 Vuex 并不意味着你需要将所有的状态放入 Vuex. 虽然将所有的状态放到 Vuex
  会使状态变化更显式和易调试, 但也会使代码变得冗长和不直观. 
  如果有些状态严格属于单个组件, 最好还是作为组件的局部状态. 
  你应该根据你的应用开发需要进行权衡和确定. 

##### 2.1.2 Getter(取得/得到)
- 有时候我们需要从 store 中的 `state` 中派生出一些状态, 例如对列表进行过滤并计数: 
  ```js
    computed: {
      doneTodosCount () {
        return this.$store.state.todos.filter(todo => todo.done).length
      }
    }
  ```
  如果有多个组件需要用到此属性, 我们要么复制这个函数, 
  或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想. 

  Vuex 允许我们在 store 中定义 `getter`(可以认为是 store 的计算属性(`computed`)).
  就像计算属性一样, `getter` 的返回值会根据它的依赖被缓存起来, 
  且只有当它的依赖值发生了改变才会被重新计算. 

  **Getter 接受 `state` 作为其第一个参数**: 
  ```js
    const store = new Vuex.Store({
      state: {
        todos: [
          { id: 1, text: '...', done: true },
          { id: 2, text: '...', done: false }
        ]
      },
      getters: {
        doneTodos: state => {
          return state.todos.filter(todo => todo.done)
        }
      }
    })
  ```
- **(1) 通过属性访问**

  Getter 会暴露为 `store.getters` 对象, 你可以以属性的形式访问这些值: 
  ```js
    store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
  ```
  Getter 也可以接受其他 getter 作为第二个参数: 
  ```js
    getters: {
      // ...
      doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
      }
    }
    store.getters.doneTodosCount // -> 1
  ```
  我们可以很容易地在任何组件中使用它: 
  ```js
    computed: {
        doneTodosCount () {
            return this.$store.getters.doneTodosCount
        }
    }
  ```
  注意, `getter` 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的. 

- **(2) 通过方法访问**
  
  你也可以通过让 `getter` 返回一个函数, 来实现给 `getter` 传参. 在你对 store
  里的数组进行查询时非常有用. 
  ```js
    getters: {
        // ...
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id)
        }
    }
    store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
  ```
  注意, `getter` 在通过方法访问时, 每次都会去进行调用, 而不会缓存结果. 

- **(3) `mapGetters` 辅助函数**
  
  `mapGetters` 辅助函数仅仅是将 store 中的 `getter` 映射到局部计算属性: 
  ```js
    import { mapGetters } from 'vuex'
    
    export default {
      // ...
      computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
          'doneTodosCount',
          'anotherGetter',
          // ...
        ])
      }
    }
  ```
  如果你想将一个 `getter` 属性另取一个名字, 使用对象形式: 
  ```js
    ...mapGetters({
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    })
  ```

##### 2.1.3 Mutation(突变)
- 更改 Vuex 的 store 中的状态(state)的唯一方法是提交 mutation. Vuex 中的 mutation
  非常类似于事件: 每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个
  **回调函数 (handler)**. 这个回调函数就是我们实际进行状态更改的地方, 
  并且它会接受 state 作为第一个参数: 
  ```js
    const store = new Vuex.Store({
        state: { count: 1},
        mutation: {
            increment(state) {
                // - 变更状态
                state.count++;
            }
        }
    })
  ```
  你不能直接调用一个 mutation handler. 这个选项更像是事件注册
  "当触发一个类型为 `increment` 的 mutation 时, 调用此函数". 要唤醒一个
  mutation handler, 你需要以相应的 type 调用 **store.commit** 方法: 
  ```js
    store.commit('increment')
  ```

- **(1) 提交载荷（Payload）**
  
  你可以向 `store.commit` 传入额外的参数, 它被称为 mutation 的
  **载荷（payload）**: 
  ```js
    // ...
    mutations: {
        increment (state, n) {
            state.count += n
        }
    }
    // - 在但组件文件中就是 this.$store.commit()
    store.commit('increment', 10)
  ```
  在大多数情况下, 载荷应该是一个对象, 这样可以包含多个字段并且记录的 mutation
  会更易读: 
  ```js
    // ...
    mutations: {
      increment (state, payload) {
        state.count += payload.amount
      }
    }
    store.commit('increment', {
      amount: 10
    })
  ```

- **(2) 对象风格的提交方式**

  提交(commit) mutation 的另一种方式是直接使用包含 `type` 属性的对象: 
  ```js
    store.commit({
        type: 'increment',
        amount: 10
    })
  ```
  当使用对象风格的提交方式, 整个对象都作为载荷传给 mutation 函数, 因此
  handler 保持不变: 
  ```js
    mutations: {
      increment (state, payload) {
        state.count += payload.amount
      }
    }
  ```

- **(3) Mutation 需遵守 Vue 的响应规则**
  
  既然 Vuex 的 store 中的状态是响应式的, 那么当我们变更状态时, 监视状态的
  Vue 组件也会自动更新. 这也意味着 Vuex 中的 mutation 也需要与使用 Vue
  一样遵守一些注意事项: 
    + (a) 最好提前在你的 store 中初始化好所有所需属性. 
    + (b) 当需要在对象上添加新属性时, 你应该使用
      ```js
        Vue.set(obj, 'newProp', 123)
      ```
      或者
      
      以新对象替换老对象. 例如, 利用[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread)我们可以这样写: 
      ```js
        state.obj = { ...state.obj, newProp: 123 }
      ```

- **(4) 使用常量替代 Mutation 事件类型**
  
  使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式. 
  这样可以使 linter 之类的工具发挥作用, 
  同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的
  mutation 一目了然: 
  ```js
    // mutation-types.js
    export const SOME_MUTATION = 'SOME_MUTATION'
    // store.js
    import Vuex from 'vuex'
    import { SOME_MUTATION } from './mutation-types'
    
    const store = new Vuex.Store({
        state: { ... },
        mutations: {
            // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
            [SOME_MUTATION] (state) {
            // mutate state
            }
        }
    })
  ```
  用不用常量取决于你——在需要多人协作的大型项目中, 这会很有帮助. 但如果你不喜欢, 
  你完全可以不这样做. 

- **(5) Mutation 必须是同步函数**

  一条重要的原则就是要记住 **mutation 必须是同步函数**. 为什么？请参考下面的例子: 
  ```js
    mutations: {
      someMutation (state) {
        api.callAsyncMethod(() => {
          state.count++
        })
      }
    }
  ```
  现在想象, 我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志. 
  每一条 mutation 被记录, devtools 都需要捕捉到前一状态和后一状态的快照. 然而, 
  在上面的例子中 mutation 中的异步函数中的回调让这不可能完成: 
  因为当 mutation 触发的时候, 回调函数还没有被调用, 
  devtools 不知道什么时候回调函数实际上被调用 --
  实质上任何在回调函数中进行的状态的改变都是不可追踪的. 

- **(6) 在组件中提交 Mutation**
  你可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation, 
  或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit`
  调用（需要在根节点注入 `store`）. 
  ```js
    import { mapMutations } from 'vuex'
    
    export default {
      // ...
      methods: {
        ...mapMutations([
            // - 将 `this.increment()` 映射为
            //   `this.$store.commit('increment')`
            'increment', 
    
            // `mapMutations` 也支持载荷:
            //  将 `this.incrementBy(amount)` 映射为
            //  `this.$store.commit('incrementBy', amount)`
            'incrementBy' 
        ]),
        ...mapMutations({
            // - 将 `this.add()` 映射为 `this.$store.commit('increment')`
            // - 类似于给 this.$store.commit('increment') 设置了一个别名.
            add: 'increment' 
        })
      }
    }
  ```
  示例 `../../../Vue-Examples/vuex-example/src/views/count.vue`
  使用 mapMutations 后的代码如下:
  ```vue
    <template>
    <div class="count">
        <h1>Vuex 计数应用</h1>
        <p>{{count}}</p>
        <p>
            <button @click="add">+</button>
            <button @click="subtract">-</button>
        </p>
    </div>
    </template>

    <script>
    import { mapMutations } from 'vuex';
    export default {
        name: 'count',
        computed: {
            count() {
                return this.$store.state.count;
            }
        },
        methods: {
            // - (1) 正常调用 vuex 中 mutation 的方式: this.$store.commit() 
            // increment() {
            //     this.$store.commit('increment')
            // },
            // decrement() {
            //     this.$store.commit('decrement');
            // }

            // - (2) 我们还可以使用 Vuex 提供的 mapMutations 辅助函数, 把上面 2
            //   个方法简写为:
            // - Tip: `...mapMutations` 是使用了 ES6 的展开运算符(`...`),
            //   它可以去除数组的中括号或对象的大括号, 这样 store/index.js 中
            //   mutations 对象内的属性便可以和当前 methods 中的对象合并了.
            // - Hint: mapMutations 参数为一个数组, 数组的 2 项对应上面 (1)
            //   中的 2 个方法.
            // ...mapMutations(
            //     ['increment', 'decrement']
            // ),
    
            // - Hint: mapMutations 参数也接收一个对象, 例如下面这样:
            // - 注意: 此时上面的 html 应该是这样的: 
            //   <button @click="add">+</button>
            //   <button @click="subtract">-</button>
            ...mapMutations({
                add: 'increment',
                subtract: 'decrement'
            })
            // - 提示: 在我们日常开发中, 下面这种形式用的更多, 原因是, 我们在 Vuex
            //   官网可以看到, 建议使用常量替代 mutations 事件类型, 如果这样
            //   'increment' 就会写成 'INCREMENT' 全大写形式, 它显然不如小写明了.

            // - 最后提示, 为什么我们直接写 `['increment', 'decrement']
            //   或 {add: 'increment', subtract: 'decrement'} 这种形式就可以
            //  自执行代码, 答案肯定都可以猜到, 那就是使用 Function.prototype.call()
            //  或 Function.prototype.apply() 方法来让数组或对象执行. 在 Vuex
            //  的源码文件 `src/helper.js` 中也可以看到.
            //  如果对 call()/apply() 不理解, 可以看这篇笔记:
            // `JS-book-learning/《Javascript设计模式与开发实践》/
            // 第1部分--基础知识/chapter02-this_call_apply.md`
        }
    }
    </script>
    
    <style lang="stylus" scoped>
        p button {
            border-radius:4px;
            margin-left: 10px;
            border: none;
            padding: .3em .8em;
            background-color: #66cc99;
            cursor: pointer;
        }
    </style>
  ```
  


- **(7) 下一步: Action**
  在 mutation 中混合异步调用会导致你的程序很难调试. 例如, 
  当你调用了两个包含异步回调的 mutation 来改变状态, 
  你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念. 
  在 Vuex 中, **mutation 都是同步事务**: 
  ```js
    store.commit('increment')
    // 任何由 "increment" 导致的状态变更都应该在此刻完成. 
  ```
  为了处理异步操作, 让我们来看一看 [Action](https://vuex.vuejs.org/zh/guide/actions.html). 

##### 2.1.4 Action(动作)
- Action 类似于 mutation, 不同在于: 
    + (1) Action 提交的是 mutation, 而不是直接变更状态. 
    + (2) Action 可以包含任意异步操作. 

  让我们来注册一个简单的 action: 
  ```js
    const store = new Vue.Store({
        state: { count: 0},
        mutations: {
            increment(state) {
                state.count++
            }
        },
        actions: {
            increment(context) {
                context.commit('increment')
            }
        }
    })
  ```
  **Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象**,
  因此你可以调用 `context.commit` 提交一个 mutation, 或者通过
  `context.state` 和 `context.getters` 来获取 state 和 getters. 
  当我们在之后介绍到
  [Modules](https://vuex.vuejs.org/zh/guide/modules.html) 时, 
  你就知道 context 对象为什么不是 store 实例本身了. 

  实践中, 我们会经常用到 ES2015 的
  [参数解构](https://github.com/lukehoban/es6features#destructuring)
  来简化代码（特别是我们需要调用 `commit` 很多次的时候):
  ```js
    actions: {
        // - Hint: 此处的 { commit } 是利用了 ES6 的对象解构语法,
        //   只取了 context 对象中的 commit 属性.(从调用来看, 这个 commit 
        //   属性对应的值应该是一个函数.) 
        // - Vuex 中关于当前 context 的代码见: `src/store.js` 中的
        //   makeLocalContext() 方法.
        // - ES6 解构语法详见:《深入理解ES6》/chapter05_解构/chapter05-解构.md
        increment ({ commit }) {
            commit('increment')
        }
    }
  ```

- **(1) 分发 Action**

  Action 通过 `store.dispatch` 方法触发: 
  ```js
    // - dispatch 见源码 `src/store.js` 中的 makeLocalContext() 方法.
    store.dispatch('increment')
  ```
  乍一眼看上去感觉多此一举, 我们直接分发 mutation 岂不更方便? 实际上并非如此, 
  还记得 **mutation 必须同步执行** 这个限制么? Action 就不受约束!
  我们可以在 action 内部执行**异步**操作: 
  ```js
    actions: {
        incrementAsync ({ commit }) {
            setTimeout(() => {
                commit('increment')
            }, 1000)
        }
    }
  ```
  Actions 支持同样的载荷方式和对象方式进行分发: 
  ```js
    // 以载荷形式分发
    store.dispatch('incrementAsync', {
        amount: 10
    })
    
    // 以对象形式分发
    store.dispatch({
        type: 'incrementAsync',
        amount: 10
    })
  ```
  来看一个更加实际的购物车示例, 涉及到**调用异步 API** 和**分发多重 mutation**:
  ```js
    actions: {
        checkout({commit, state}, products) {
            // - 把当前购物车鹅物品备份起来.
            const savedCartItems = [...state.cart.added];
            // - 发出结账请求, 然后乐观的清空购物车
            commit(types.CHECKOUT_REQUEST);
            // - 购物 API 接受一个成功回调和一个失败回调
            shop.buyProducts(
                products,
                // - 成功操作
                () => commit(types.CHECKOUT_SUCCESS),
                // - 失败操作
                () => commit(types.CHECKOUT_FAILURE, savedCartItems)
            )
        }
    }
  ```
  注意我们正在进行一系列的异步操作, 并且通过提交 mutation 来记录 action 产生的副作用（即状态变更）. 

- **(2) 在组件中分发 Action**
  你在组件中使用 `this.$store.dispatch('xxx')` 分发 action, 或者使用
  `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch`
  调用（需要先在根节点注入 `store`）: 
  ```js
    import { mapActions } from 'vuex'
    
    export default {
      // ...
      methods: {
        ...mapActions([
            // - 将 `this.increment()` 映射为
            //   `this.$store.dispatch('increment')`
            'increment', 
    
            // `mapActions` 也支持载荷:
            // - 将 `this.incrementBy(amount)` 映射为
            //   `this.$store.dispatch('incrementBy', amount)`
            'incrementBy'
        ]),
        ...mapActions({
            // - 将 `this.add()` 映射为 
            //   `this.$store.dispatch('increment')`
            add: 'increment'
        })
      }
    }
  ```

- **(3) 组合 Action**

  Action 通常是异步的, 那么如何知道 action 什么时候结束呢? 更重要的是, 
  我们如何才能组合多个 action, 以处理更加复杂的异步流程?

  首先, 你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的
  Promise, 并且 `store.dispatch` 仍旧返回 Promise: 
  ```js
    actions: {
        actionA ({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('someMutation')
                    resolve()
                }, 1000)
            })
        }
    }
  ```
  现在你可以: 
  ```js
    store.dispatch('actionA').then(() => {
      // ...
    })
  ```
  在另外一个 action 中也可以: 
  ```js
    actions: {
        // ...
        actionB ({ dispatch, commit }) {
            return dispatch('actionA').then(() => {
                commit('someOtherMutation')
            })
        }
    }
  ```
  最后, 如果我们利用
  [async/await](https://tc39.github.io/ecmascript-asyncawait/), 
  我们可以如下组合 action: 
  ```js
    // 假设 getData() 和 getOtherData() 返回的是 Promise
    actions: {
        async actionA ({ commit }) {
            commit('gotData', await getData())
        },
        async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // 等待 actionA 完成
        commit('gotOtherData', await getOtherData())
        }
    }
  ```
  > 一个 `store.dispatch` 在不同模块中可以触发多个 action 函数. 在这种情况下, 
  只有当所有触发函数完成后, 返回的 Promise 才会执行. 

##### 2.1.5 Module
##### 2.1.6

#### 2.2 项目结构

#### 2.3 插件

#### 2.4 严格模式

#### 2.5 表单处理

#### 2.6 测试

#### 2.7 热重载
