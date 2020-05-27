# Vuex


## Catalog




## New Words
- **state [steɪt] --n.状态, 情形, 洲**
- **dispatch [dɪ'spætʃ] --vt.调度; 派遣; 发送. --n.派遣; 急件.**
    + dispatch action. 调度动作.
    + dispatch office. 派遣室; 调度处.
    + Which method should the server dispatch to?
      服务器应该发送哪一种方法呢? 
- **action ['ækʃ(ə)n]  --n.动作; 行动**
- **mutation [mjuː'teɪʃ(ə)n]  --n.突变**
- **mutate [mjuː'teɪt] --vt&vi.变化; 转变**
- **commit [kə'mɪt]  --vt.提交; 委托; 承诺**




## Content


### Vuex: 集中管理数据
- [官方文档](https://vuex.vuejs.org/zh/guide/)
- ```base  
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
            
### Vuex 提供了2个非常棒的方法: 
- mapGetters (获取数据): 获取 this.$store.下的...
- mapActions (管理所有事件<行为>): 打包所有的
  `export default { methods: {} }` 的 methods 对象中的所有方法的一个方法。
   