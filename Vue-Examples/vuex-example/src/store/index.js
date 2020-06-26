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
