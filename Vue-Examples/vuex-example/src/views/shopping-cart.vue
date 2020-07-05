<template>
    <div class="shopping-cart">
        <ProductList/>
        <hr>
        <h2>您的购物车</h2>
        <p v-show="!products.length"><i>请添加一些产品到购物车.</i></p>
        <ul>
            <li
                v-for="product in products"
                :key="product.id">
                {{ product.title }} - {{ product.price | currency }}
                    x {{ product.quantity }}    
            </li>
        </ul>
        <p>Total: {{ total | currency }} </p>
        <p>
            <button class="checkout-btn"
                :disabled="!products.length"
                @click="checkout(products)">
                结账
            </button>
        </p>
        <p v-show="checkoutStatus">结账状态 {{ checkoutStatus }}</p>
      
    </div>
</template>

<script>
    import ProductList from '../components/product-list';

    import { mapGetters, mapState } from 'vuex';

    export default {
        name: 'ShoppingCart',
        components: {
            ProductList
        },
        computed: {
            ...mapState({
                // - 从 cart.js 获取结账状态
                checkoutStatus: state => state.cart.checkoutStatus
            }),
            // - 从 cart.js 获取 "购物车产品" 和 "购物车总价"
            ...mapGetters('cart', {
                products: 'cartProducts',
                total: 'cartTotalPrice'
            })
        },
        methods: {
            checkout(products) {
                this.$store.dispatch('cart/checkout', products)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .shopping-cart {
        width: 96% 
        margin: 10px auto
        background: #ececec
        min-height: 50vh
        overflow: hidden
        padding-bottom: 1em
    }
    .checkout-btn {
        margin-top: .6em
        padding: .1em 1em
    }
</style>
