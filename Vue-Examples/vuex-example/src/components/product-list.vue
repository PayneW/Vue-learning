<template>
    <div class="product-list">
        <ul>
            <li
                v-for="product in products"
                :key="product.id">
               <span> {{ product.title }} - {{ product.price | currency }}</span>
                <button
                    :disabled="!product.inventory"
                    :class="{'disable-btn': !product.inventory}"
                    @click="addProductToCart(product)">
                    添加到购物车
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    created() {
        // - 在当前 created 生命周期利用 dispatch 调度 products.js 中的
        //   getAllProducts actions, 在 getAllProducts 内部调用 `api/shop.js`
        //   内的 getProducts() 方法, 此方法把 shop.js 内部模拟的 `_products`
        //   数据传递给其内部利用 commit 提交的 mutations 的 payload.
        //   (说实话真心好绕啊...)
        this.$store.dispatch('products/getAllProducts');
    },
    computed: mapState({
        products: function(state) {
            // console.log('state.products.all:', state.products.all);
            return state.products.all;
        }
        // state => state.products.all
    }),


    // - 'cart' 为 namespace(命名空间)
    methods: mapActions('cart', [
        'addProductToCart'
    ])
}
</script>

<style lang="stylus">
    .product-list ul {
        list-style: none;
        padding: 0;
    }
    .product-list ul li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: .4em;
        padding: 1%
    }
    .product-list ul li span {
        flex: 1 1 auto;
    }
    .product-list ul li button {
        font-size: 13px;
        padding: .3em;
        border: 1px solid #ccc;
        border-radius: .3em;
    }
    .disable-btn {
        color: red;
        border: 1px solid red !important;
    }
</style>
