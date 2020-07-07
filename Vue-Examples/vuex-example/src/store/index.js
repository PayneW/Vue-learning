import Vue from 'vue'
import Vuex from 'vuex'

// - 计数 store
import count from './modules/count'

// - 购物车 store
import cart from './modules/cart'
import products from './modules/products'

// - todos
import todos from './modules/todosapp/todos'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        // - 计数组件
        count,

        // - 购物车组件
        cart,
        products,

        // - todos
        todos,
    },
})
