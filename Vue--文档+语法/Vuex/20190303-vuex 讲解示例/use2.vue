<template>
    <div class="header">
        <!-- Vuex 高级使用技巧 -->
        <!-- 从 vuex 的 state 共享传递的数据 -->
        {{this.city}}
        <span class="iconfont icon">$#xe668;</span>
    </div>
</template>

<script>
    import {mapState, mapMutations} from "vuex"
    export default {
        // 高级使用: ...mapState,  ...mapMutations, ...mapGetters
        // 扩展运算符 ...mapState, 意思是把 vuex 的 state 数码映射到计算属性里面，
        // 映射后的名字位 city, 所以上面直接用 this.city, 就不用写 this.$store.state.city 了
        computed: {
            ...mapState(["city"])
        },
        methods: {
            // 对比 use.vue 查看不同
            handleCityClick(city){
                this.changeCity(city);
            },
            ...mapMutations(["changeCity"])
        }
    }
</script>

<style>

</style>