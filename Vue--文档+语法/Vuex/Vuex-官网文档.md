[官方文档](https://vuex.vuejs.org/zh/guide/)


# Vuex
  - 安装
    + npm 安装 ``` npm install vuex --save ```
    + 使用: 
    ```base 
        import Vue from "vue"
        import Vuex from "vuex"
        
        Vue.use(Vuex)
    ```
    + Promise: Vuex 依赖 Promise 但是IE并没有实现 Promise, 那么可以使用一个 polyfill 的库，例如 es6-promise.
        - 通过 CDN 将其引入: 
        ``` 
            <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>
           然后 window.Promise 会自动可用。  
        ```
        - 也可以通过 npm 安装: 
        ``` npm install es6-promise --save ```
        - 或者更进一步，将下列代码添加到你使用 Vuex 之前的一个地方:
        ``` import "es6-promise/auto" ```
    
  - Vuex 是什么？
    + Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证
    状态以一种可预测的方式发生改变。Vuex也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel
    调试，状态快照导入导出等高级调试功能。
  
  - 开始
    1. 每一个 Vuex 应用的核心就是 store (仓库)。 'store' 基本上就是一个容器，它包含着你的应用中大部分的状态 (state). Vuex和
    单纯的全局对象有以下2点不同:
       1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会
       相应地得到高效更新。
       2. 你不能直接更改 store 中的状态。 改变 store 中的状态的唯一途径就是显式地 **提交 (commit) mutation**。这样使得
       我们可以方便地跟踪每一个状态的变化。从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
    
    ```base
        1. mutation     n. 突变; 变化
        2. mutate       vt & vi. 变化; 转变
        3. action       n. 动作; 行动
        4. commit       vt. 提交; 委托; 承诺
    ``` 
          
    + 核心概念 
        - State
        
        - Getter (getters 从数据库里取数据的 API, 不能更改数据库)
           1. 有时我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数:
            ```javascript
               computed: {
                   doneTodoCount() {
                       // filter() ：对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
                       return this.$store.state.todos.filter(function(item){
                           return item.done
                       }).length
                   }
               }
           ```
           2. Getter 接受 state 作为第一个参数: 
           ```javascript
               const store = new Vuex.store({
                   state: {
                       todos: [
                           { id: 1, text: "...", done: true },
                           { id: 2, text: "...", done: false }
                       ]
                   },
                   getters: {
                       doneTodos: (state) => {
                           return state.todos.fileter(
                                function(todo) {
                                    return todo.done
                                }
                           )
                       }
                   }
               })
           ```
           3. **通过属性访问:** Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值:
               ```javascript
                    store.getters.doneTodos  // -> [{ id: 1, text: "...", done: true }]
               ```
               + Getter 也可以接受其他 getter 作为第二个参数
               ```javascript
                    getters: {
                        // ...
                        doneTodosCount: (state, getters) => {
                            return getters.doneTodos.length;
                        }
                    }
                    
                    store.getters.doneTodosCount   // -> 1
               ```
               + 我们可以很容易地再任何组件中使用它:
               ```javascript
                    computed: {
                        doneTodosCount() {
                            return this.$store.getters.doneTodosCount
                        }
                    }
               ```
               + 注意, getter 在通过属性访问时时作为 Vue 的响应式系统的一部分缓存其中的。
               
           4. **通过方法访问:** 你也可以通过让 getter 返回一个函数，来实现给 getter 传参。 在你对 store
            里的数组进行查询时非常有用。
            ```javascript
                getters: {
                    // ...
                    getTodoById: (state) => {
                        return function(id) {
                            return state.todos.find(function(todo) {
                                return todo.id === id;
                            })
                        }
                    }
                }
                
                store.getters.getTodoById(2)    // -> { id:2, text: "...", done: false }
                注意， getter 在通过方法访问时，每次都会进行调用，而不会缓存结果。
            ```  
            5. mapGetters 辅助函数
                + mapGetters 辅助函数仅仅时将 store 中的 getter 映射到局部计算属性: 
                ```javascript
                    import { mapGetters } from "vuex"
                    export defult {
                        // ...
                        computed: {
                            // 使用对象展开运算符将 getter 混入 computed 对象中
                            ...mapGetters([
                                "doneTodosCount",
                                "anotherGetter",
                            ])
                        }
                    }
                    
                    // 如果你想将一个 getter 属性另取一个名字，使用对象形式:
                    mapGetters({
                        // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
                        doneCount: "doneTodosCount"
                    })
                    
                ```
               
        - Mutation (Mutations 就是我们把数据存入数据库的 API 用来修改 state 的)
            1. 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation. Vuex 中的 mutation 非常类似于事件: 每个 mutation
            都有一个字符串的 **事件类型(type)** 和一个 **回调函数(handler)**。这个回调函数就是我们实际进行状态更改的地方，
            并且它会接受 state 作为第一个参数:
            ```javascript
                const store = new Vuex.Store({
                    state: {
                        count: 1
                    },
                    mutations: {
                        increment(state) {
                            // 变更状态
                            state.count++
                        }
                    }
                })
            ```
            你不能直接调用一个 mutation handler。这个选项更像是事件注册: "当触发一个类型为 increment 的 mutation 时，调用
            此函数。" 要唤醒一个 mutation handler, 你需要以响应的 type 调用 store.commit 方法:
            ``` store.commit("increment") ```
            2. **提交负载 (Payload)**: 你可以向 store.commit 传入额外的参数，即 mutation 的 载荷 (payload).
            ```javascript
                // ...
                mutations: {
                    increment (state, n) {
                        state.count += n;
                    }
                }
                
                store.commit("increment", 10)
                
                // 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并记录的 mutation 会更易读。
                // ...
                mutations: {
                    increment (state, payload) {
                        state.count += payload.amount
                    }
                }
                
                store.commit("increment", {
                    amount: 10
                })
            ```
            3. **对象风格的提交方式**: 提交 mutation 的另一种方式是直接使用包含 type 属性的对象:
            ```javascript
                store.commit({
                    type: "increment",
                    amount: 10
                })
                当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数， 因此 handler 保持不变:
                mutations: {
                    increment (state, payload) {
                        state.count += payload.amount
                    }
                }
            ```
            4. **Mutation 需遵顼 Vue 的响应规则**
            5. **使用常量替代 Mutation 事件类型**
            ```javascript
                // mutation-types.js
                export const SOME_MUTATION = "SOME_MUTATION";
                
                // store.js
                import { SOME_MUTATION } from "./mutation-types"
                const store = new Vuex.Store({
                    state: { ... },
                    mutations: {
                        // 使用"计算属性命名"功能来使用一个常量作为函数名
                        [SOME_MUTATION]: function(state){
                            // mutate state
                        }
                    }
                })
            ```
            6. **Mutation 必须是同步函数**
                + 一条重要的原则就是记住 mutation 必须是同步调用，为什么？ 
                ```javascript
                    mutations: {
                        someMutation (state) {
                            api.callAsyncMethod(() => {
                                state.count++
                            })
                        } 
                    }
                ```
                +  现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。 每一条 mutation
                被记录， devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的
                异步函数中的回调让这不可能完成: 因为当 mutation 触发的时候，回调函数还没有被调用， devtools
                不知道什么时候回调函数实际上被调用 —— 实质上任何在回调函数中进行的状态的改变都是不可追踪的。
                
            7. **在组建中提交 Mutation**: 
                + 你可以在组件中使用 `this.$store.commit("xxx")` 提交 mutation, 或者使用 mapMutations
                辅助函数将组件中的 methods 映射到 store.commit 调用 (需要在根节点注入 store)
                ```javascript
                    import { mapMutations } from "vuex"
                    export default {
                        // ...
                        methods: {
                            ...mapMutations([
                                // 将 `this.increment()` 映射为 `this.$store.commit("increment")`
                                "incrment",
                                // `mapMutations` 也支持载荷:
                                // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit("incrementBy", amount)`
                                "incrementBy"
                            ]),
                            ...mapMutations({
                                // 将 `this.add()` 映射为 `this.$store.commit("increment")`
                                add: "increment"
                            })
                        }
                    }
                ```
            8. 下一步 Action 
                + 在 mutation 中混合异步调用会导致你的程序很难试调。例如，当你调用了2个含异步回调的 mutation 来改变装填，
                你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。在 Vuex 中， **mutation 都是同步
                事务**
            
        - Action
            1. Action 类似于 mutation, 不同在于: 
                + Action 提交的是 mutation, 而不是直接变更状态。
                + Action 可以包含任意异步操作。
                    ```javascript
                        // 让我们来注册一个简单的 action:
                        const store = new Vuex.store({
                            state: {
                                count: 0
                            },
                            mutations: {
                                increment (state) {
                                    state.count++
                                }
                            },
                            actions: {
                                increment (context) {
                                    context.commit("increment")
                                }
                            }
                        })
                    ```
                    - Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit
                    提交一个 mutation, 或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在
                    之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。
                    
        - Module
    + 项目结构
    + 插件
    + 严格模式
    + 表单处理
    + 测试
    + 热重载    
