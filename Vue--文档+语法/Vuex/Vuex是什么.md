## Vuex 是什么？ 
 - 答: 详细讲解教程见同级目录的 "Vuex从入门到入门.pdf" 
 - 答: 官网解说 --> Vuex 是一个专门为 Vue.js 应用程序开发的 "状态管理模式"。 它采用集中式存储管理应用的所有组件的状态，
       并以相应的规则保证状态以一种可预测的方式发生变化。 
       

```base
    state  /steɪt/            n. 状态; 情形; 州
```      
       
### Vuex 就是前端的数据库 (完整的文章见: https://zhuanlan.zhihu.com/p/24357762)
  + 全局变量: store
  + 共享数据: state
  + 取数据的API即是获取数据: getter
  + 存数据就是对数据库的修改: mutation (变化，突变)
  + 数据存入到数据库中时一般情况下要处理成需要的形式，这个处理就是: actions (行动，活动)
  + ```~~~~~~~~~~~~~~~~```
  + 到此 Vuex 就已经成型了: 
    - State 就是数据库， Mutations 就是我们把数据存入数据库的 API 用来修改 state 的。 
    - getters 是从数据库里取数据的 API, 既然是取就不能更改数据库，所以 getters 就是一个 "纯函数"，
      不会对原数据造成影响的函数。
    - 后端从前端拿到数据总要做个处理吧，处理完在存到数据库(此时就是存到 state )中。其实这就是 action 的过程。 
      当然你也可以不做处理，直接丢到数据库，所以 Vuex 也可以在 action 中直接存，就是直接 mutation.

#### 回归到 API 对应为:
  1. getters
  2. mutations
  3. store 与 state
  4. action

dispatch /disˈpætʃ/ n.调度 派遣



```base
    1. dispatch /disˈpætʃ/       vt.调度; 派遣
    2. action /'ækʃ(ə)n/         n. 动作; 行动
    3. mutation /mjuː'teɪʃ(ə)n/  n. 突变
    4. mutate /mjuː'teɪt/        vt & vi. 变化; 转变 
    5. commit /kə'mɪt/           vt. 提交; 委托; 承诺
    6. state  /steɪt/            n. 状态; 情形; 州
    
```


## Vuex: 集中管理数据
  [官方文档](https://vuex.vuejs.org/zh/guide/)
  
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
            
            
1. Vuex 提供了2个非常棒的方法: 
    + mapGetters (获取数据): 获取 this.$store.下的...
    + mapActions (管理所有事件<行为>): 打包所有的 `export default { methods: {} }` 的 methods 对象中的所有方法的一个方法。
   