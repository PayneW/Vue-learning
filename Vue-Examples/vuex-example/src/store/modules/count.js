// - 计数 store

export default {
    state() {
        return{
            count: 0
        }
    },
    getters: {},
    mutations: {
        // - 计数组件方法
        increment(state) {
            state.count++
        },
        decrement(state) {
            state.count--
        }
    },
    actions: {},
}