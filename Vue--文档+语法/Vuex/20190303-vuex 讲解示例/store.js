import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex);

export default new Vuex.Store({
    // state 放公共数据
    state: {
        city: defaultCity,
    },

    // getters 类似于 computed 方法，进行数据的计算
    getters: {},

    // Actions (调度一个"动作") [这个Actions(动作)不会直接改变tate(状态)]
    // 异步操作 或 对 mutation 做封装(批量处理同步操作) (简单情况可以跳过 action 直接到 mutations)
    // 两个参数: 上下文环境，参数 -- 使用 context.commit(xx, xx) 方法调用 mutations 里面的方法名。
    actions: {
        changeCity(context, city) {
            context.commit("changeCity", city)
        }
    },

    // mutations 放置用来改变数据的方法，更改 Vuex 的 store 中的状态的唯一方法时提交 mutation.
    // Vuex 中的 mutation 非常类似于事件: 每个 mutation 都是一个字符串的 "事件类型(type)" 和
    // 一个 "回调函数(handler)"。参数时 state
    mutations: {
        changeCity(state, city) {
            state.city = city;
            try {
                localStorage.city = city;
            } catch (e) {}
        }
    },

})

// modules 用来 Vuex 允许我们将 store 分割成"模块" (module)。每个模块拥有自己的 state, getters, mutations,
// actions 甚至是嵌套子模块 -- 从上至下进行同样方式的分割，然后组合到一起:
const moduleA = {
    state: {},
    getters: {},
    actions: {},
    mutations: {},
};
const moduleB = {
    state: {},
    getters: {},
    actions: {},
    mutations: {},
};
/*
 * const store = new Vuex.Store({
 *      modules: {
 *          a: moduleA,
 *          b: moduleB
 *      }
 * })
 * store.state.a    // moduleA 的状态
 * store.state.b    // moduleB 的状态
 *
 */