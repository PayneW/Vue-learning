// - cart 手推车/购物车

import shop from "../../api/shop"

export default {
    namespaced: true,
    state() {
        return {
            items: [],
            checkoutStatus: null
        }
    },
    getters: {
        // - 购物车产品
        cartProducts: (state, getters, rootState) => {
            // - 注意: items. 中的 {id: xx, quantity: xx} 为下面 mutations
            //   内的 pushProductToCart() 调用推入的.
            return state.items.map(({ id, quantity }) => {
                // - `[].find()` 返回数组中满足方法内部函数的第一个元素的值.
                //   否则返回 `undefined`.
                // - rootState.products.all: 意思为, 先找到根节点的 state,
                //   然后到子模块 products 的 all 状态(state), 因为 all
                //   状态保存的为一个数组, 所以可以调用数组的 find() 方法.
                const product = rootState.products.all.find(product => product.id === id);
                return {
                    title: product.title,
                    price: product.price,
                    quantity
                }
            })
        },
        // - 购物车总价格
        cartTotalPrice: (state, getters) => {
            return getters.cartProducts.reduce((total, product) => {
                return total + product.price * product.quantity
            }, 0)
        }
    },
    mutations: {
        // - 把产品放入购物车
        pushProductToCart(state, { id }) {
            state.items.push({
                id,
                quantity: 1
            })
        },
        // - 增加商品数量
        // - tip: { id } 为解构的下面 actions 中传入的 items 数组的子项,
        //   每一个子项都是一个对象, 这里使用解构赋值, 只取 id 属性的值.
        incrementItemQuantity(state, { id }) {
            console.log('id: ', id);
            const cartItem = state.items.find(item => item.id === id);
            cartItem.quantity++;
        },

        // - 设置购物车项目
        setCartItems(state, { items }) {
            state.items = items;
        },

        // - 设置结账状态
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        }
    },
    actions: {
        // - 结账
        checkout({ commit, state }, products) {
            const savedCartItems = [...state.items];
            commit('setCheckoutStatus', null);
            // - empty cart 清空购物车
            commit('setCartItems', { items: [] });
            shop.buyProducts(
                products,
                () => commit('setCheckoutStatus', 'successful'),
                () => {
                    commit('setCheckoutStatus', 'failed'),
                    // rollback to the cart saved before sending the request
                    // 回滚到发送请求之前保存的购物车
                    commit('setCartItems', { items: savedCartItems })
                }
            )
        },
        // - 添加商品到购物车
        addProductToCart({ state, commit }, product) {
            // - 首先设置结账状态
            commit('setCheckoutStatus', null);
            // - 如果当前产品的库存(inventory) 大于 0
            if (product.inventory > 0) {
                // - 找到当前点击要添加的项
                const cartItem = state.items.find(function(item) {
                    return item.id === product.id
                });
                // - 如果当前购物车没有此商品, 就把此商品推入到购物车中
                if (!cartItem) {
                    commit('pushProductToCart', { id: product.id })
                } else {
                    // - 如果当前商品已经存在了, 那就增加商品数量
                    commit('incrementItemQuantity', cartItem)
                }
                // - remove 1 item from stock. 从库存中删除一项
                commit('products/decrementProductInventory',
                    { id: product.id}, {root: true})
            }
        }
    }
}
