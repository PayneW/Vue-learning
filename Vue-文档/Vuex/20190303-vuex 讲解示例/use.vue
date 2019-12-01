<template>
    <div class="header">
        {{this.$store.state.city}}
        <span class="iconfont icon">$#xe668;</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },

        methods: {
            // handleCityClick(city) {
            //     // 组件派发 action
            //     this.$store.dispatch("changeCity", city);
            // }

            /*handlerCityClick(city){
                // 跳过 Actions 这步，直接 commit 给 mutations
                this.$store.commit("changeCity", city)
            }*/
        }
    }
</script>

<style>

</style>