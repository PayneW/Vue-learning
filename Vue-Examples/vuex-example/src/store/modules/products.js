import shop from '../../api/shop'

export default {
    namespaced: true,
    state() {
        return {
            all: []
        }
    },
    getters: {},
    mutations: {
        // - 设置产品
        setProducts(state, products) {
            state.all = products;
        },

        // - decrement product inventory 减少库存
        // - tip: { id } 为解构对象语法.
        decrementProductInventory(state, { id }) {
            const product = state.all.find((product) => product.id === id);
            product.inventory--;
        }
    },
    actions: {
        // - Hint: 此方法在 ProductList.vue 组件加载时,
        //   在 `created()` 声明周期中被调用
        getAllProducts({ commit }) {
            shop.getProducts(products => {
                commit('setProducts', products)
            })
        }
    }
}