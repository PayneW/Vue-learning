import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'


Vue.use(Vuex);


/**
 * + 全局变量: store
 * + 共享数据: state
 * + 取数据的API即是获取数据: getters
 * + 存数据就是对数据库的修改: mutations (变化，突变)
 * + 数据存入到数据库中时一般情况下要处理成需要的形式，这个处理就是: actions (行动，活动)
 * */
import * as types from './mutation-types';
// 调试工具可以帮助我们检测对 state 的修改是不是通过 mutations 操作的
const debug = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
    // 开启严格模式，检测对 state 的修改是不是通过 mutations 操作的
    strict: debug,
    plugins: debug ? [createLogger()]: [],
    // 状态
    state: {
        singer: {},
    },

    // 取数据的API即是获取数据: getters
    getters: {
        singer: (state) => {
            return state.singer;
        }
    },

    // Actions (调度一个"动作") [这个Actions(动作)不会直接改变tate(状态)]
    // 异步操作，或 对 mutation 做封装
    actions: {},

    // 存数据就是对数据库的修改: mutations (变化，突变)
    // 同步的修改
    mutations: {
        // SET_SINGER(state, singer) {}
        [types.SET_SINGER](state, singer) {
            state.singer = singer;
        }
    },
})
