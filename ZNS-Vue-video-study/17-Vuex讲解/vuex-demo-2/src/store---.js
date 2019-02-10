import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 10,
    },

    getters: {
        countNum(state) {
            return state.count;
        },
        oddOrEven(state) {
            return state.count % 2 === 0 ? "偶数" : "奇数";
        }
    },

    /*
     *   Mutation 必须是同步函数。
     *   你不能直接调用一个 mutation handler。这个选项更像是事件注册: "当触发一个类型为 increment
     * 的 mutation 时，调用此函数。" 要唤醒一个 mutation handler, 你需要以响应的 type 调用
     * store.commit 方法:.0
     * ``` store.commit("increment") ```  --[Vuex 官网文档]
     */
    mutations: {
        increment(state) {
            // 处理状态(数据)变化
            state.count++;
        },
        decrement(state) {
            state.count--;
        },
    },

    // (1.) Action 提交的是 mutation, 而不是直接变更状态。
    // (2.) Action 可以包含任意异步操作。 --[Vuex 官网文档]
    actions: {
        // 处理你要干什么，异步请求，判断，流程控制...
        increment: ({commit}) => {
            /*
             * Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit
             * 提交一个 mutation, 或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在
             * 之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。--[Vuex 官网文档]
             */
            commit("increment")
        },

        decrement: ({commit}) => {
            commit("decrement")
        },

        oddIncrement: ({commit, state}) => {
            console.log(state);
            if (state.count % 2 === 1) {
                commit("increment")
            }
        },

        evenIncrement: ({commit, state}) => {
            if (state.count % 2 === 0) {
                commit("increment")
            }
        },

        asyncIncrement: ({commit}) => {
            new Promise((resolve) => {
                setTimeout(function () {
                    commit("increment")
                }, 1000)
            })
        }
    },


})
